const fs = require('fs');

class CartManager {
    constructor(path) {
        this.path = path;
    }

    async createCart() {
        try {
            let getCart = await this.getCarts();

            const newCart = {
                id: getCart.length + 1,
                products: []
            };

            getCart.push(newCart);

            await fs.promises.writeFile(this.path, JSON.stringify(getCart, null, 2));

            return newCart;
        } catch (error) {
            throw error;
        }
    }

    async getCartById(id) {
        try {
            let getCart = await this.getCarts();

            const cart = getCart.find(gc => gc.id === id);

            return cart;
        } catch (error) {
            throw error;
        }
    }

    async addProductToCart(cartId, productId, quantity) {
        try {
            let carts = await this.getCarts();

            const cart = carts.find(c => c.id === cartId);

            if (!cart) {
                return { error: 'Carrito inexistente' };
            }

            const existProduct = cart.products.find(p => p.product === productId);

            if (existProduct) {
                existProduct.quantity += quantity;
            } else {
                cart.products.push({
                    product: productId,
                    quantity
                });
            }

            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));

            return { cart };
        } catch (error) {
            throw error;
        }
    }

    async getCarts() {
        if (fs.existsSync(this.path)) {
            return JSON.parse(await fs.promises.readFile(this.path, { encoding: 'utf-8' }));
        } else {
            return [];
        }
    }
}

module.exports = CartManager;