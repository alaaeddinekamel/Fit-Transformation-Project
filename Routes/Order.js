const express = require('express')
const { createOrder, getOrders, getOneOrder, updateOrder, deleteOrder, getMyOrders, updateOrderStatus, deleteOrderByUser } = require('../Controllers/Order')
const { isAuth } = require('../Middlewares/isAuth')

const orderRouter = express.Router()

orderRouter.post('/createOrder', isAuth ,createOrder)

orderRouter.get('/getOrders', getOrders)

orderRouter.get('/getOneOrder/:id', getOneOrder)

orderRouter.put('/updateOrder/:id', updateOrder)

orderRouter.put('/updateOrderStatus/:id', updateOrderStatus) 

orderRouter.delete('/deleteOrder/:id', deleteOrder)



orderRouter.get('/getMyOrders', isAuth,getMyOrders)

module.exports = orderRouter