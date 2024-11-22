const Order = require("../Models/Order")

exports.createOrder = async(req,res)=>{
    try {
        const items = req.body.items.map((el,i,t)=>({...el,owner:req.user._id,product: el.product})); 

        const newOrders = await Order.insertMany(items);

        res.status(200).send({msg:'order added',newOrders})
    } catch (error) {
        res.status(500).send('could not add order')
    }
}

exports.getOrders = async(req,res)=>{
    try {
        const orders = await  Order.find().populate('owner').populate('product')
        res.status(200).send({msg :'orders list', orders})
    } catch (error) {
        res.status(500).send('orders not found')
    }
}

exports.getOneOrder = async(req,res)=>{
    try {
        const {id}=req.params
      const found =  await Order.findById(id)
      res.status(200).send({msg : 'order found',found})
    } catch (error) {
        res.status(500).send('order not found')
    }
}

exports.updateOrder = async(req,res)=>{
    try {
        const {id} = req.params
        await Order.findByIdAndUpdate(id,{$set : req.body})
        const found =  await Order.findById(id)
        res.status(200).send({msg : 'order updated', found})
    } catch (error) {
        res.status(500).send('order not updated')
    }
}

exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // On suppose que le nouveau statut est envoyé dans le corps de la requête

        // Vérifie si le statut est fourni
        if (!status) {
            return res.status(400).send('Status is required');
        }

        await Order.findByIdAndUpdate(id, { $set: { status } });
        const found = await Order.findById(id);
        res.status(200).send({ msg: 'order status updated', found });
    } catch (error) {
        res.status(500).send('order not updated');
    }
};

exports.deleteOrder = async(req,res)=>{
    try {
        const {id}= req.params
        await Order.findByIdAndDelete(id)
        res.status(200).send('order deleted')
    } catch (error) {
        res.status(500).send('could not delete order')
    }
}



exports.getMyOrders = async(req,res)=>{
    try {
        const orders = await  Order.find({owner : req.user._id}).populate('owner').populate('product')
        res.status(200).send({msg :'orders list', orders})
    } catch (error) {
        res.status(500).send('orders not found')
    }
}