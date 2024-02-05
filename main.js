class ProductManager{
    constructor(){
        this.producto=[]
    }

    addProducto(title, descripton, price, thumbnail, code, stock){

        let codigo=this.producto.find(p=>p.code===code)
        if(codigo){
            console.log(`Ya existe un producto con el codigo ${code}`)
            return
        } 

        let id=1
        if(this.producto.length>0){
            id=this.producto[this.producto.length-1].id+1
        }

        let nuevoProducto={id, title, descripton, price, thumbnail, code, stock}
        this.producto.push(nuevoProducto)
        }
        
        getProduct(){
            return this.producto
        } 
        
        getProductById(id){
            let product=this.producto.find(p=>p.id===id)
            if(!product){
                console.log(`Producto con id ${id} no encontrado`)
                return
            }
            return product
    } 
        
}

let np=new ProductManager() //np nuevo producto
np.addProducto("Rayzen","Poderosa para cualquier actividad","210","/carpeta/img.jpg","00031","10")
np.addProducto("Rayzen 7 ","mas poderosa que la primera","310","/carpeta/img2.jpg","00038","1")
np.addProducto("Rayzen 9","uf esa si","410","/carpeta/img2.jpg","000387","1")
np.addProducto("intel i5","muy buena, pero no tanto","350","/carpeta/img5.jpg","0003777","7")
np.addProducto("Gabinetes ACME","fallan siempre","250","/carpeta/img9.jpg","000377","10")
console.log(np.getProduct())
console.log (np.getProductById()) // colocar el id que desee buscar