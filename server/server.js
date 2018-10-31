// add environment variables
require('./config/config');

const express = require('express');
const socketIO = require('socket.io');
const bp = require('body-parser');
const http = require('http');

const { resolve } = require('path');

//sub routes
const productRoutes = require('./routes/product');
const predictionRoutes = require('./routes/prediction');
const orderRoutes = require('./routes/order');
const orderStream = require('./streams/order');

// setup db connection
const { mongoose } = require('./db/mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;

// serve angular build
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(resolve(__dirname, "../dist/KitchenDisplay")));
}

app.use(bp.json());
app.use(bp.urlencoded({extended: true}));

// register route handlers
app.use(productRoutes);
app.use(predictionRoutes);
app.use(orderRoutes);

if(process.env.NODE_ENV === 'production') {
    app.get("/*", function (req, res) {
        res.sendfile(resolve(__dirname, "../dist/KitchenDisplay/index.html"));
    });
}

server.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

orderStream.init(io);