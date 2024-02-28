const fs = require('fs');

class ProductManager {
    constructor(direccion) {
        this.path = direccion;
    }

    async getProduct() {
        try {
            if (fs.existsSync(this.path)) {
                return JSON.parse(await fs.promises.readFile(this.path, { encoding: "utf-8" }));
            } else {
                return [];
            }
        } catch (error) {
            console.error("Error al leer el archivo:", error);
            return [];
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            let productos = await this.getProduct();

            let id = 0;
            if (productos.length > 0) {
                id = productos[productos.length - 1].id;
            }
            const newId = id + 1;

            // Nuevo objeto de producto con el nuevo ID
            const newProduct = { id: newId, title, description, price, thumbnail, code, stock }
            
            productos.push(newProduct);

            // actualizacion del archivo json
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2), { encoding: "utf-8" });
        } catch (error) {
            console.error("Error al agregar el producto:", error);
        }
    }
// obtenr el producto por id
    async getProductById(id) {
        try {
            const productos = await this.getProduct();
            const product = productos.find(product => product.id === id);
            return product || null;
        } catch (error) {
            console.error("Error al obtener el producto por ID:", error);
            return null;
        }
    }
// actualizar productos por id y agregando el dato a modificar
    async updateProduct(id, updatedFields) {
        try {
            let productos = await this.getProduct();
            const index = productos.findIndex(product => product.id === id);
            if (index !== -1) {
                productos[index] = { ...productos[index], ...updatedFields };
                await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2), { encoding: "utf-8" });
                return true;
            }
            return false;
        } catch (error) {
            console.error("verifique los datos antes de intentar actualizar el producto:", error);
            return false;
        }
    }
// borrar producto por id
    async deleteProduct(id) {
        try {
            let productos = await this.getProduct();
            const index = productos.findIndex(product => product.id === id);
            if (index !== -1) {
                productos.splice(index, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2), { encoding: "utf-8" });
                return true;
            }
            return false;
        } catch (error) {
            console.error("no se puede eliminar el producto:", error);
            return false;
        }
    }
}

module.exports = ProductManager;