const mongoose = require ('mongoose')

const orderSchema = new mongoose.Schema({
    product: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    image : {
      type : String,
      required : true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    owner :{
        type : mongoose.Types.ObjectId,
        ref : "user"
    },
    
    
    status :{
        type : String,
         default :'In progress'
    }
  })

module.exports = mongoose.model('order', orderSchema)