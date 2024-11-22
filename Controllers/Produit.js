const Produit = require("../Models/Produit")

exports.addProduct = async(req,res)=>{
    try {
        const found = await Produit.findOne({title : req.body.title})
        if(found){
            return res.status(400).send('product name already used')
        }
        const productToSave = new Produit(req.body)
        await productToSave.save()
        res.status(200).send({msg:'product added',productToSave})
    } catch (error) {
        res.status(500).send('could not add product')
    }
}

exports.getProducts = async(req,res)=>{
    try {
        const produits = await  Produit.find()
        res.status(200).send({msg :'products list',produits})
    } catch (error) {
        res.status(500).send('products not found')
    }
}

exports.getOneProduct = async(req,res)=>{
    try {
        const {id}=req.params
      const found =  await Produit.findById(id)
      res.status(200).send({msg : 'product found',found})
    } catch (error) {
        res.status(500).send('product not found')
    }
}

exports.updateProduct = async(req,res)=>{
    try {
        const {id} = req.params
        await Produit.findByIdAndUpdate(id,{$set : req.body})
        const found =  await Produit.findById(id)
        res.status(200).send({msg : 'product updated', found})
    } catch (error) {
        res.status(500).send('product not updated')
    }
}

exports.deleteProduct = async(req,res)=>{
    try {
        const {id}= req.params
        await Produit.findByIdAndDelete(id)
        res.status(200).send('product deleted')
    } catch (error) {
        res.status(500).send('could not delete product')
    }
}