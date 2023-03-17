const {request,response}=require('express')
const {validationResult}=require('express-validator')
//importamos libreria para encriptar contraseña
const bcrypt=require('bcryptjs')
//importamos el modelo de usuario
const User=require('../models/user')

const GETusers=async(req=request,res=response)=>{
    const{since=0,until=50,admins=false}=req.query //defino parametros

    const statusTrue={status:true} //selecciono los documentos con la propiedad 'status' en true
    const adminsTrue={rol:"ADMIN"}

    if(admins){
        const admins=await User.find(adminsTrue)

        return res.json({
            admins
        })
    }

    const [showUsers,total,showAdmins]=await Promise.all([
        User.find(statusTrue).skip(since).limit(until), //solo mostrará los usuarios con esta propiedad
        User.countDocuments(statusTrue) //solo contará los usuarios con esta propiedad
    ])

    res.json({
        total, 
        showUsers,
    }) //muestro lo que solicite
}

const POSTusers=async(req=request,res=response)=>{
    const {name,email,password,rol,img}=req.body //recibimos los datos de la peticion post
    const user=new User({name,email,password,rol,img}) //creamos la instancia del modelo de usuario con los datos que requerimos
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

const PUTusers=async(req=request,res=response)=>{
    const {id}=req.params //recibo el id enviado por el usuario

    const {password,...userdata}=req.body//recibo la peticion del usuario
    console.log(userdata)

    //encripto la contraseña
    if(password){ //verifico que se haya enviado una contraseña en la peticion
        const salt=bcrypt.genSaltSync(10)
        userdata.password=bcrypt.hashSync(password,salt) //encripto el valor de la propiedad 'password' de la request (lo que envio el front)
    }

    //buscar el usuario para actualizarlo
    const user=await User.findByIdAndUpdate(id,userdata,{new:true}) //actualizo el usuario encontrado por la id con los nuevos datos que envió el front 


    res.json({
        id,
        user
    })
}

const DELETEusers=async(req=request,res=response)=>{
    const {id}=req.params //recibo el id enviado por el usuario

    //para desactivar usuarios

    const userFound=await User.findById(id)

    if(!userFound.status){
        return res.json({
            msg:"This user is already inactive"
        })
    }

    const AFKuser=await User.findByIdAndUpdate(id,{status:false},{new:true})

    res.json({
        "msg":"User status switched to: inactive (false)",
        AFKuser,
    })


    // //para borrar usuarios
    // const deletedUser=await User.findByIdAndDelete(id)

    // res.json({
    //     "msg":"User deleted successfully",
    //     "Deleted User":deletedUser
    // })
}

module.exports={
    GETusers,
    POSTusers,
    PUTusers,
    DELETEusers,
}