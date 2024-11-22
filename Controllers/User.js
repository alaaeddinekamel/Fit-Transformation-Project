const User = require("../Models/User")
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
const Order = require("../Models/Order")
const RendezVous = require("../Models/RendezVous")



exports.signUp = async(req,res)=>{
    try {
        const {name,email,password}= req.body
        const found = await User.findOne({email})
        if(found){
            return res.status(400).send({errors : [{msg : 'email alearedy exists'}]})
        }
        const newAccount = new User(req.body)

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        newAccount.password = hashedPassword

        newAccount.save()

        const payload = {id : newAccount._id}
        var token =jwt.sign(payload, process.env.privateKey, {expiresIn : '7d'})

        res.status(200).send({msg : 'account created', newAccount, token})

    } catch (error) {
        res.status(500).send({errors : [{msg : 'could not create account'}]})
    }
}

exports.signIn = async(req,res)=>{
    try {
        const {email,password} = req.body
        const foundEmail = await User.findOne({email})
        if(!foundEmail){
            return res.status(400).send({errors : [{msg : 'email does not exist'}]})
        }

        const matchPass = bcrypt.compareSync(password, foundEmail.password)
        if(!matchPass){
            return res.status(400).send({errors : [{msg : 'wrong password'}]})
        }

        const payload = {id : foundEmail._id}
        const token = jwt.sign(payload, process.env.privateKey, {expiresIn : '7d'})

        res.status(200).send({msg : 'welcome to your account', foundEmail, token})
    } catch (error) {
        res.status(500).send({errors : [{msg : 'could not log in'}]})
    }
}

exports.getUsers = async(req,res)=>{
    try {
        const contacts = await  User.find()
        res.status(200).send({msg :'users list',contacts})
    } catch (error) {
        res.status(500).send('users not found')
    }
}

exports.getOneUser = async(req,res)=>{
    try {
        const {id}=req.params
      const found =  await User.findById(id)
      res.status(200).send({msg : 'user found',found})
    } catch (error) {
        res.status(500).send('users not found')
    }
}

exports.deleteUser = async(req,res)=>{
    try {
        
        const {id}= req.params
        await Order.deleteMany({owner : id})
        await RendezVous.deleteMany({adherent : id})
        await RendezVous.deleteMany({coach : id})
        await User.findByIdAndDelete(id)
        res.status(200).send('user deleted')
    } catch (error) {
        res.status(500).send('could not delete user')
    }
}

exports.upUser = async(req,res)=>{
    try {
        const {id} = req.params
        await User.findByIdAndUpdate(id,{$set : req.body})
        const found =  await User.findById(id)
        res.status(200).send({msg : 'user updated', found})
    } catch (error) {
        res.status(500).send('user not modified')
    }
}




exports.uploadProfilePicture = async (req, res) => {
    const { userId } = req.params;
    const { picture } = req.body;  // Utiliser 'picture' pour correspondre au modèle

    try {
        // Met à jour l'utilisateur avec la nouvelle URL de l'image
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { picture },
            { new: true } // Renvoie l'utilisateur mis à jour
        );
        
        res.status(200).json(updatedUser); // Renvoie l'utilisateur mis à jour pour le store Redux
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la photo de profil :", error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la photo de profil' });
    }
}