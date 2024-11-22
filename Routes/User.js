const express = require('express')
const { signUp, signIn, getUsers, getOneUser, deleteUser, upUser, uploadProfilePicture } = require('../Controllers/User')
const { validationRegister, Validation, validationUpdate } = require('../Middlewares/Validator')
const { isAuth } = require('../Middlewares/isAuth')



const userRouter = express.Router()

userRouter.post('/signUp', validationRegister, Validation, signUp)

userRouter.post('/signIn', signIn)

userRouter.get('/currentUser',isAuth ,(req,res)=> {res.send(req.user)})

userRouter.get('/getUsers', getUsers)

userRouter.get('/getOneUser/:id', getOneUser)

userRouter.delete('/deleteUser/:id', deleteUser)

userRouter.put('/updateUser/:id',validationUpdate, Validation, upUser)

// Route pour mettre à jour l'URL de la photo de profil de l'utilisateur
userRouter.put('/:userId/updateProfilePicture', uploadProfilePicture);



module.exports = userRouter