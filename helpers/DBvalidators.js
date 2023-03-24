const Rol=require('../models/rol')
const User=require('../models/user')
const Category=require('../models/category')
const Course=require('../models/course')

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

const courseAlreadyExistsDB=async(course)=>{
    const courseAlreadyExists=await Course.findOne({course})
    if (courseAlreadyExists){
        throw new Error(`This Course Already Exists`)
    }
}

const idUserNotFound=async(idReq)=>{
    const userFoundByID=await User.findById(idReq)
    if(!userFoundByID){
        throw new Error(`The user doesn't exist`)
    }
}

const idCategoryNotFound=async(idReq)=>{
    const categoryFoundByID=await Category.findById(idReq)
    if(!categoryFoundByID){
        throw new Error(`The category doesn't exist`)
    }
}

module.exports={
    validRol,
    userEmailAlreadyInUse,
    idUserNotFound,
    idCategoryNotFound,
    courseAlreadyExistsDB
}