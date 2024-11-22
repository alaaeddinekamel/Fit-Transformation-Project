const express = require ('express')
const connectDB = require('./Config/ConnectDB')
const userRouter = require('./Routes/User')
const produitRouter = require('./Routes/Produit')
const orderRouter = require('./Routes/Order')
const rendezVousRouter = require('./Routes/RendezVous')


const app = express()

require('dotenv').config()

connectDB()

app.use(express.json())

app.use('/api/auth',userRouter)
app.use('/api/Products', produitRouter)
app.use('/api/Order', orderRouter)
app.use('/api/RendezVous', rendezVousRouter)



app.listen(process.env.port, console.log(`server is running on port ${process.env.port}`))