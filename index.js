const express = require('express');
const app = express();

app.use(require('body-parser').json());
app.use(require('cors')());

const itemController = require('./routes/items');
const sessionController = require('./routes/cart');

app.get('/api/v1/products', itemController.getAll);
app.get('/api/v1/products/:id', itemController.getOne);
app.post('/api/v1/products', itemController.add);

app.post('/api/v1/cart', sessionController.new);
app.get('/api/v1/cart/:id', sessionController.get)
app.post('/api/v1/cart/:id', sessionController.modify);

app.listen(3000, () => {
    console.log('listening');
});