const express = require('express');
const router = express.Router();
const CartManager = require('../classes/cartManagers.js');
const ProductManager = require('../classes/main.js'); 

const cartManager = new CartManager('./src/data/carrito.json'); 
const productManager = new ProductManager('./src/data/productos.json');

router.post('/', (req, res) => {
    const newCartId = cartManager.generateUniqueId();
    const newCart = {
        id: newCartId,
        products: []
    };

    cartManager.createCart(newCart);

    res.status(201).json({ message: 'Carrito creado correctamente', cart: newCart });
});

router.get('/:cid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cart = cartManager.getCartById(cartId);
    if (cart) {
        const products = cart.products.map(productId => productManager.getProductById(productId));
        res.json({ products: products });
    } else {
        res.status(404).json({ error: 'Carrito no encontrado' });
    }
});

router.post('/:cid/product/:pid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    const product = productManager.getProductById(productId);

    if (product) {
        const cart = cartManager.getCartById(cartId);

        if (cart) {
            cartManager.saveToFile(productId, cartId); 

            res.status(200).json({ message: 'Producto agregado al carrito ', cart: cart });
        } else {
            res.status(404).json({ error: 'nose pudo agregar producto al carrito' });
        }
    } else {
        res.status(404).json({ error: 'El producto sin stock' });
    }
});



module.exports = router;