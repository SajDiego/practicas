const express = require('express');
const productRoutes = require('../src/routes/productsRoutes');
const cartRoutes = require('../src/routes/cartRouter');

const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.json());

app.use('/api/products', productRoutes);

app.use('/carts', cartRoutes);

app.use('/api/carts', cartRoutes);




app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});