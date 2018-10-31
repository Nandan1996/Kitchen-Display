const { Order, orderEvent } = require('../models/order');
const { predictionEvent } = require('../models/prediction');

var openConnections = 0;
var orderData = null;

async function fetchFreshDataAndEmit(nsp) {
    let data = await Order.getOrdersForToday();
    if (data) {
        orderData = data;
        openConnections > 0 && nsp.emit("displayupdate", data);
    }
}

function init(io) {
    var nsp = io.of("/api/order");
    nsp.on('connection', async socket => {
        openConnections += 1;
        try {
            if (orderData) {
                socket.emit("displayupdate", orderData);
            } else {
                await fetchFreshDataAndEmit(nsp);
            }
        } catch (error) {
            console.log(error);
        }
        socket.on('disconnect', () => {
            console.log('disconnected');
            openConnections -= 1;
        });
    });

    orderEvent.on('save', async function (doc) {
        if (doc.done) {
            console.log(doc);
            return;
        }
        await fetchFreshDataAndEmit(nsp);
    });

    predictionEvent.on('update', async function (doc) {
        await fetchFreshDataAndEmit(nsp);
    });
}

module.exports = { init };