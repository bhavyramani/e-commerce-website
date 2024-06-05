const express = require('express');
const server = express();
const mongoose = require('mongoose');
const productRouter = require('./routes/Product');
const categoriesRouter = require('./routes/Category');
const brandRouter = require('./routes/Brand');
const cors = require('cors');

server.use(cors({
    exposedHeaders:['X-Total-Count']
}));
server.use(express.json());
server.use('/products', productRouter.router);
server.use('/categories', categoriesRouter.router);
server.use('/brands', brandRouter.router);

async function main() {
    try {
        await mongoose.connect('mongodb://localhost:27017/e-commerce');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
    }
}
main();

server.get('/', (req, res) => {
    res.send('Hello World');
});

server.listen(8080, () => {
    console.log("Server Started at http://localhost:8080");
});