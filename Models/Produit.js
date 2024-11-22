const mongoose = require ('mongoose')

const produitSchema = new mongoose.Schema(
    {
        title : String,
        description : String,
        imageURL : String,
        price : Number,
        category : String
    }
)

module.exports = mongoose.model('produit', produitSchema)