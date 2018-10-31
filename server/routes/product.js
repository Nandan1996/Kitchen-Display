const express = require('express');

const { Product } = require('../models/product');
const { getDateString } = require('../utility/utility');

const router = express.Router();

router.get("/api/products", async (req, res) => {
    try {
        const products = await Product.aggregate([
            {$match: {active: true}},
            {
                "$project": {
                    name: 1,
                    predicted: {$eq: ["$lastPredicted", getDateString()]}
                }
            }
        ]);
        res.send({result: products, statusMsg: ""});
    } catch (error) {
        res.status(400).send({errors: error, statusMsg: "couldn't retrieve products"});
    }
})

router.post("/api/products", async (req, res) => {
    let product = await Product.findOne({name: req.body.name});
    if(!product) {
        product = await new Product({name: req.body.name}).save();
        res.send({success: true, result: product, statusMsg: "Product added successfully"})
    } else {
        res.status(400).send({
            errors: {name: "A product with the same name already exist"},
            success: false,
            statusMsg: "failed"
        });
    }    
})

module.exports = router;