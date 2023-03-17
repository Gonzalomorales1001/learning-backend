const {request,response}=require('express')
const {validationResult}=require('express-validator')

//importamos libreria para encriptar contraseña
const bcrypt=require('bcryptjs')

const User=require('../models/user') //importamos el modelo de usuario

const GETusers=(req=request,res=response)=>{
    const {apiKey,test,username}=req.query
    res.json([
        {apiKey,test},
        {msg:'Hola'}
    ])
}

const POSTusers=async(req=request,res=response)=>{
    //validar los errores (check result)

    const {name,email,password,rol}=req.body //recibimos los datos de la peticion post
    const user=new User({name,email,password,rol}) //creamos la instancia del modelo de usuario con los datos que requerimos

    //verificando el correo (unique) (deprecated: the validation now is a middleware)
    // const emailAlreadyExist=await User.findOne({email}) //este es un método de la instancia creada a partir el modelo que creamos (la funcion model) con ayuda de la librería
    // if(emailAlreadyExist){
    //     return res.status(400).json({msg: "This email already exists"})
    // }
    //encriptar contraseña
    const salt=bcrypt.genSaltSync(10)
    const hash=bcrypt.hashSync(password,salt)

    user.password=hash

    //guardar en database
    await user.save()

    res.json({
        user,
        msg:"User registered successfully!",
    })
}

const PUTusers=(req=request,res=response)=>{
    res.json({
        msg:"put PUT"
    })
}

const DELETEusers=async(req=request,res=response)=>{

    res.json({
        msg:"delete DELETING",
    })
}

module.exports={
    GETusers,
    POSTusers,
    PUTusers,
    DELETEusers,
}