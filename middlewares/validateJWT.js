const {response,request}=require('express')
const JWT=require('jsonwebtoken')
const User=require('../models/user')

const validateJWT=async(req=request,res=response,next)=>{
    const token=req.header('x-token')
    //validamos que el token haya sido enviado
    if(!token){
        return res.status(401).json({
            "msg": "Can't find token in request"
        })
    }

    try {
        //verificamos el token y obtenemos el uid
        const {uid}= JWT.verify(token,process.env.SECRETORPRIVATEKEY)
        //verificar los datos del usuario
        const user=await User.findById(uid)
        //verificamos que el usuario exista
        if(!user){
            return res.status(401).json({
                "msg":"User not found (Invalid Token)"
            })
        }
        //verficamos que el usuario este activo
        if(!user.status){
            return res.status(401).json({
                "msg":"Inactive User"
            })
        }
        //guardo en la req los datos del usuario
        req.user=user

        next()
    } catch (err) {
        console.log(err)
        res.status(401).json({
            "msg": "Invalid token"
        })
    }
}

module.exports={
    validateJWT
}