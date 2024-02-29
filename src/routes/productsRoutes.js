const express = require('express');
const router = express.Router();
const ProductManager = require('../classes/main');

const productManager = new ProductManager('productos.json');

router.get('/', (req, res) => {
    const products = productManager.getProduct();
    res.json(products);
});


router.get('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductById(productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

router.post('/', (req, res) => {
    const productManager = new ProductManager('./src/data/productos.json');
    const  { title, description, price, thumbnails,  code, stock }= req.body;

   newProduct =  req.body;
    productManager.addProduct(newProduct);

    res.status(201).json({ message: 'Producto agregado correctamente' });
});
/*
router.post('/', (req, res) => {
    const productManager = new ProductManager('productos.json');
    const { title, description, price, thumbnails, code, stock,} = req.body;

     if (!title || !description || !price|| !Array.isArray(thumbnails) || !code   || !stock ) {
         return res.status(400).json({ error: 'debes completar todos los campos.' });
    };

    const newProduct = {title, description, code, stock, thumbnails};

    productManager.addProduct(newProduct);

    res.status(201).json({ message: 'Producto agregado correctamente', newProduct });
});*/

router.put('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const { title, description,price, thumbnails, code, stock } = req.body;

    if (!title || !description || !price|| !Array.isArray(thumbnails) || !code   || !stock ) {
        return res.status(400).json({ error: 'Uno de los campos no fue completado.' });
    }

    const updatedFields = { title, description, price, thumbnails, code, stock };
    
    const result = productManager.updateProduct(productId, updatedFields);

    if (result) {
        res.json({ message: 'Producto actualizado correctamente', updatedFields });
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});


router.delete('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const result = productManager.deleteProduct(productId);

    if (result) {
        res.json({ message: 'Producto eliminado'});
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});


    
module.exports = router;