const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema(
    {
        name : String,
        email : {type : String, required : true, unique : true},
        role: {
            type: String,
            enum: ['coach', 'adherent', 'admin'], // L'utilisateur peut choisir entre ces deux valeurs
            required: true
        },
        password : {type : String, required : true},
        picture : String
    }
)

module.exports = mongoose.model('user', userSchema)