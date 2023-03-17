const Rol=require('../models/rol')
const User=require('../models/user')

const validRol=async(userRol)=>{
    const rolExist=await Rol.findOne({rol:userRol})
    if(!rolExist){
        throw new Error(`${userRol} doesn't exist in database`)
    }
}

const userEmailAlreadyInUse=async(emailReq)=>{
    const emailInUse=await User.findOne({email:emailReq})
    if (emailInUse){
        throw new Error(`This email is already in use`)
    }
}

const idUserNotFound=async(idReq)=>{
    const userFoundByID=await User.findById(idReq)
    if(!userFoundByID){
        throw new Error(`The user doesn't exist`)
    }
}

module.exports={
    validRol,
    userEmailAlreadyInUse,
    idUserNotFound,
}