const RendezVous = require("../Models/RendezVous")

exports.createRendezVous = async(req,res)=>{
    try {
        
        const newRendezVous = new RendezVous(req.body)
        await newRendezVous.save()
        res.status(200).send({msg:'rendez vous created',newRendezVous})
    } catch (error) {
        res.status(500).send('could not create rendez vous')
    }
}

exports.getRendezVous = async(req,res)=>{
    try {
        const rendezVous = await  RendezVous.find()
        res.status(200).send({msg :'rendez Vous list',rendezVous})
    } catch (error) {
        res.status(500).send('rendez Vous not found')
    }
}

exports.getOneRendezVOus = async(req,res)=>{
    try {
        const {id}=req.params
      const found =  await RendezVous.findById(id).populate('adherent').populate('coach')
      res.status(200).send({msg : 'rendez Vous found',found})
    } catch (error) {
        res.status(500).send('rendez Vous not found')
    }
}

exports.updateRendezVous = async(req,res)=>{
    try {
        const {id} = req.params
        await RendezVous.findByIdAndUpdate(id,{$set : req.body})
        const found =  await RendezVous.findById(id)
        res.status(200).send({msg : 'rendez vous updated', found})
    } catch (error) {
        res.status(500).send('rendez vous not updated')
    }
}

exports.deleteRendezVous = async(req,res)=>{
    try {
        const {id}= req.params
        await RendezVous.deleteMany({coach : id})
        await RendezVous.findByIdAndDelete(id)
        res.status(200).send('rendez vous deleted')
    } catch (error) {
        res.status(500).send('could not delete rendez vous')
    }
}

exports.getAdherentRendezVous = async(req,res)=>{
    try {
        const rendezVous = await  RendezVous.find({adherent : req.user._id}).populate('coach')
        res.status(200).send({msg :'rendez Vous list',rendezVous})
    } catch (error) {
        res.status(500).send('rendez Vous not found')
    }
}

exports.getCoachRendezVous = async(req,res)=>{
    try {
        const rendezVous = await  RendezVous.find({coach : req.user._id}).populate('adherent')
        res.status(200).send({msg :'rendez Vous list',rendezVous})
    } catch (error) {
        res.status(500).send('rendez Vous not found')
    }
}

exports.updateRendezVousStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // On suppose que le nouveau statut est envoyé dans le corps de la requête

        // Vérifie si le statut est fourni
        if (!status) {
            return res.status(400).send('Status is required');
        }

        await RendezVous.findByIdAndUpdate(id, { $set: { status } });
        const found = await RendezVous.findById(id);
        res.status(200).send({ msg: 'Rendez Vous status updated', found });
    } catch (error) {
        res.status(500).send('Rendez Vous not updated');
    }
}