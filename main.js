const fs = require('fs');

class ProductManager {
    constructor(direccion) {
        this.path = direccion;
    }

    async getProduct() {
        if (fs.existsSync(this.path)) {
            return JSON.parse(await fs.promises.readFile(this.path, { encoding: "utf-8" }));
        } else {
            return [];
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        let productos = await this.getProduct();

        let id = 0;
        if (productos.length > 0) {
            id = productos[productos.length - 1].id;
        }
        const newId = id + 1;

        // Nuevo objeto de producto con el nuevo ID
        const newProduct = {id, title, description, price, thumbnail, code, stock}
         
        productos.push(newProduct);

        // actualizacion del archivo json
        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2), { encoding: "utf-8" });
    }

    async getProductById(id) {
        const productos = await this.getProduct();
        const product = productos.find(product => product.id === id);
        return product || null;
    }
}

let ProductoManager = new ProductManager("./productos.json");

const respuesta = async () => {
    let productos = await ProductoManager.getProduct();
    console.log(productos);
};

(async () => {
    await ProductoManager.addProduct("monitor gamer", "demasiado caros", 350, "thumbnail.jpg", "2584", 10);// agregar el producto nuevo que desee
    respuesta();
    
    // Obtener producto by id
    const productoById = await ProductoManager.getProductById(1); // colocar el id que desee buscar
    console.log("Producto encontrado:", productoById);
})();
