const express = require('express')
const RendezVous = require('../Models/RendezVous')
const { isAuth } = require('../Middlewares/isAuth')
const { createRendezVous, getRendezVous, getOneRendezVOus, updateRendezVous, updateRendezVousStatus, deleteRendezVous, getAdherentRendezVous, getCoachRendezVous } = require('../Controllers/RendezVous')

const rendezVousRouter = express.Router()

rendezVousRouter.post('/createRendezVous', createRendezVous)

rendezVousRouter.get('/getRendezVous', getRendezVous)

rendezVousRouter.get('/getOneRendezVOus/:id', getOneRendezVOus)

rendezVousRouter.put('/updateRendezVous/:id', updateRendezVous)

rendezVousRouter.put('/updateRendezVousStatus/:id', updateRendezVousStatus)

rendezVousRouter.delete('/deleteRendezVous/:id', deleteRendezVous)

rendezVousRouter.get('/getAdherentRendezVous',isAuth, getAdherentRendezVous)

rendezVousRouter.get('/getCoachRendezVous', isAuth , getCoachRendezVous)




module.exports = rendezVousRouter

