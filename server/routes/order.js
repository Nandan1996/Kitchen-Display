const express = require('express');

const { Order } = require('../models/order');
const {Product} = require('../models/product');
const {Prediction} = require('../models/prediction');
const { getDateString, to } = require('../utility/utility');

const router = express.Router();
router.post("/api/order", async (req, res) => {
    let product = await Product.findById(req.body.productId);
    if(!product) {
        res.status(400).send({
            errors: {producId: "Product does not exist."},
            success: false,
            statusMsg: "failed"
        });
        return;
    }
    if(product.lastPredicted !== getDateString()){
        res.status(400).send({success: false, result: null, statusMsg: "Prediction is not set yet."});
        return;
    }
    let newOrder = new Order({product: req.body.productId, quantity: req.body.quantity});
    newOrder.save().then(order => {
        return Order.populate(order, {path: "product"});
    }).then(order => {
        res.send({success: true, result: order, statusMsg: "Order placed successfully"});
    }).catch(err => {
        res.status(400).send({success: false, result: null, errors: err, statusMsg: "failed"});
    });
    
});

router.get('/api/order', async (req, res) => {
    var temp = await Order.getOrdersForToday();
    res.send(temp);
});

router.put('/api/order/complete/:orderId', async (req, res) => {
    let err, order, prediction;
    [err, order] = await to(Order.findOneAndUpdate({
        _id: req.params.orderId,
        done: false,
        orderDate: getDateString()
    }, {done: true}));
    if(err) {
        res.status(400).send({success: false, errors: err, statusMsg: "failed"})
    } else if(!order) {
        res.status(400).send({success: false, statusMsg: "Couldn't find any order or the order is already completed"});
    } else {
        [err, prediction] = await to(Prediction.findOneAndUpdate(
            {
                product: order.product, 
                predictedDate: getDateString()
            }, {$inc: {created: order.quantity}}));
        res.send({success: true, result: order, statusMsg: "order status updated"});
    }

})
module.exports = router;