const mongoose = require ('mongoose')

const rendezVousSchema = new mongoose.Schema(
    {
        adherent : {type : mongoose.Types.ObjectId, ref : 'user'},
        coach : {type : mongoose.Types.ObjectId, ref : 'user'},
        message : String,
        date : {
            type : Date,
            default : Date.now()

        },
        status : {
            type : String,
            default : "In progress"
        }
    }
)

module.exports = mongoose.model('rendezVous', rendezVousSchema)