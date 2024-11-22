const {body, validationResult}= require('express-validator')

exports.validationRegister = [
    body('email','Bad email format').isEmail(),
    body('password','password must contain 6 char').isLength({min : 6}),
    body('password',"Your password must contain Alpha").isAlphanumeric()
]


exports.validationUpdate = [
    body('email','Bad email format').isEmail(),
]

exports.Validation=(req,res,next)=>{
    const errors=validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).send(errors)
    }

    next()
}