const express = require('express');

const { Prediction } = require('../models/prediction');
const {Product} = require('../models/product');
const { getDateString } = require('../utility/utility');

const router = express.Router();

router.post("/api/predict", async (req, res) => {
    let product = await Product.findById(req.body.productId);
    if(!product) {
        res.status(400).send({
            errors: {producId: "Invalid product to make prediction for"},
            success: false,
            statusMsg: "failed"
        });
        return;
    }
    if(product.lastPredicted === getDateString()){
        res.status(400).send({success: false, result: null, statusMsg: "This product has been predicted already"});
        return;
    }
    let newPrediction = new Prediction({product: req.body.productId, predicted: req.body.qunatity});
    newPrediction.save().then(async prediction => {
        await Product.updateOne({_id: req.body.productId}, {$set:{lastPredicted: getDateString()}});
        res.send({success: true, result: prediction, statusMsg: "Prediction made successfully"});
    }).catch(err => {
        res.status(400).send({success: false, result: null, errors: err, statusMsg: "failed"});
    });
    
});

router.get("/api/prediction-report", async (req, res) => {
    const report = await Prediction.aggregate([
        {$match: {predictedDate: getDateString()}},
        {
            $lookup: {
                from: "products",
                localField: "product",
                foreignField: "_id",
                as: "product"
            }
        },
        {
            $unwind: "$product"
        },
        {$project: {
            dishName: "$product.name",
            produced: "$created",
            predicted: "$predicted",
        }}
    ]);
    res.send({success: true, result: report, statusMsg: "ok"});
});

module.exports = router;