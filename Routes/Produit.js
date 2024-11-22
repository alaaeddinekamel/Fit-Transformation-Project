const express = require('express')
const Produit = require('../Models/Produit')
const { addProduct, getProducts, getOneProduct, updateProduct, deleteProduct } = require('../Controllers/Produit')

const produitRouter = express.Router()


produitRouter.post('/addProduct', addProduct)

produitRouter.get('/getProducts', getProducts) 

produitRouter.get('/getOneProduct/:id', getOneProduct)

produitRouter.put('/updateProduct/:id', updateProduct)

produitRouter.delete('/deleteProduct/:id', deleteProduct)



module.exports = produitRouter