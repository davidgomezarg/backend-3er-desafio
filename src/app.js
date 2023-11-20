import express from "express";

import ProductManager from "./ProductManager.js";
const manager = new ProductManager('./files/Productos.json');

const PORT = 8080;
const app = express();
app.use(express.urlencoded({extended:true}))

app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto: ${PORT}`);
})



app.get('/products', async (req,res)=>{
    
    const limit = req.query.limit;

    let allProducts = await manager.getProducts();

    if(!limit){
        return res.json({products:allProducts})
    }

    const result = allProducts.filter((p,index) => index<limit);
    res.json({result})
})

app.get('/products/:pid', async (req,res)=>{
    const pid = req.params.pid;

    const allProducts = await manager.getProducts();
    
    const product = allProducts.find(p => p.id == pid)
    if(!product){
        return res.send({
            error: 'Producto no encontrado.'
        })
    }
    res.json({product})
}) 