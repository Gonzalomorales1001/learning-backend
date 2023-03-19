const {response,request}=require('express')
const User=require('../models/user')
const bcrypt=require('bcryptjs')
const {generateJWT}=require('../helpers/generateJWT')

const login=async(req=request,res=response)=>{

    const {email,password}=req.body

    try {
        //verificamos si el correo existe
        const user=await User.findOne({email})
        if(!user){return res.status(400).json({"msg":"Email or password are incorrect (a)"})}
        //el usuario esta activo
        if(!user.status){return res.status(400).json({"msg":"Email or password are incorrect (b)"})}
        //verificar que este bien la contraseña
        const validPassword=bcrypt.compareSync(password,user.password)
        if(!validPassword){return res.status(400).json({"msg":"Email or password are incorrect (c)"})}
        //generamos el token (autenticando la sesion)
        const token=await generateJWT(user.id)


        res.json(
            {
                "msg":"LOGIN OK",
                user,
                token,
            }
        )
    } catch (err) {
        res.status(500).json({
                "msg":"Please check your problem with admin"
        })
    }


}

module.exports={
    login,
}