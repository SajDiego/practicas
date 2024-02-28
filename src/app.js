const express = require ('express');
const ProductManager = require ("./managers/main");

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.send("Servidor básico");
});

 const products = new ProductManager("./src/data/productos.json");
 
app.get('/products/:pid', async (req, res) => {
     const productos = parseInt(req.params.pid);
    try {
        const product = await products.getProductById(productos);
        if (product) {
            res.json(product);
       }
        else {             
            res.status(404).json({ error: 'Producto no encontrado' });
        }
   } catch (error) {
        console.error("Error al obtener producto:", error);
         res.status(500).json({ error: 'Error en la busqueda de productos' });
     }
 });

 app.get("/products", async (req, res) => {
     try {
        let limite = req.query.limite;
        let respuesta = await products.getProduct(); 
         if (limite && limite > 0) {
            result = respuesta.slice(0, limite);
         }
        res.json(respuesta);
    } catch (error) {
        res.status(500).json({ error: "Error. Productos no encontrados" });
     }
 });

 app.get("*", (req, res) => {
     res.send("Error 404 - Not Found");
 });

const server= app.listen(PORT, () => {
    console.log(`Server OK en puerto ${PORT}`);
});