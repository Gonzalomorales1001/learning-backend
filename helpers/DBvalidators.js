const Rol=require('../models/rol')
const User=require('../models/user')

const validRol=async(userRol)=>{
    console.log(`requested rol: ${userRol}`)
    const rolExist=await Rol.findOne({rol:userRol})
    if(!rolExist){
        throw new Error(`${userRol} doesn't exist in database`)
    }
}

const userEmailAlreadyInUse=async(emailReq)=>{
    console.log(`requested email: ${emailReq}`)
    const emailInUse=await User.findOne({email:emailReq})
    if (emailInUse){
        throw new Error(`This email is already in use`)
    }
}

module.exports={
    validRol,
    userEmailAlreadyInUse
}