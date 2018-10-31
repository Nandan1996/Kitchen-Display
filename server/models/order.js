const mongoose = require('mongoose');
const {EventEmitter} = require('events');
const { getDateString } = require('../utility/utility');

const orderEvent = new EventEmitter();

var orderSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    done: {
        type: Boolean,
        default: false
    },
    orderDate: {
        type: String,
        default: getDateString
    },
    quantity: {
        type: Number,
        min: 1,
        required: true
    }
});

orderSchema.post('save', function(doc) {
    orderEvent.emit('save', doc);
});

orderSchema.statics.getOrdersForToday = async function (orderStatus) {
    var Order = this;

    var result = await Order.aggregate([
        { $match: { done: !!orderStatus, orderDate: getDateString() } },
        {
            $lookup: {
                from: "predictions",
                let: { pid: "$product", order: "$orderDate" },
                pipeline: [{
                        $match:{
                            $expr:{
                                $and:[
                                    { $eq: ["$predictedDate", "$$order"] },
                                    { $eq: ["$product", "$$pid"] }
                                ]
                            }
                        }
                    },
                    { $project: { created: 1, predicted: 1, _id: 0 } }
                ],
                as: "prediction"
            }
        },
        { $unwind: "$prediction" },
        {
            $project: {
                product: "$product",
                orderQuantity: "$quantity",
                created: "$prediction.created",
                predicted: "$prediction.predicted"
            }
        }
    ]);

    return Order.populate(result, {path: "product", select: 'name'});
}

var Order = mongoose.model('Order', orderSchema);

module.exports = { Order, orderEvent };