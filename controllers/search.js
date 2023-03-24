const {response,request}=require('express')

//importando modelos
const Rol=require('../models/rol')
const User=require('../models/user')
const Category=require('../models/category')
const Course=require('../models/course')

//definimos las colecciones permitidas
const availableCollections=['users','categories','courses']

//buscar usuarios (cuando la coleccion sea users)
const searchUsers=async(term,res=response)=>{
    const regex=new RegExp(term,'i')

    const users=await User.find({
        $or:[{name:regex},{email:regex}],
        $and:[{status:true}]
    })

    res.json({
        "results":users
    })
}

//buscar categorias (cuando la coleccion sea categories)
const searchCategories=async(term,res=response)=>{
    const regex=new RegExp(term,'i')

    const categories=await Category.find({
        category:regex,
        status:true
    })

    res.json({
        "results":categories
    })
}

//buscar cursos (cuando la coleccion sea courses)
const searchCourses=async(term,res=response)=>{
    const regex=new RegExp(term,'i')

    const courses=await User.find({
        $or:[{course:regex},{description:regex}],
        $and:[{status:true}]
    })

    res.json({
        "results":courses
    })
    //no encuentra ninguna categoría (a revisar)
}

//controlador
const search=(req=request,res=response)=>{
    const {collection,term}=req.params

    if(!availableCollections.includes(collection)){
        return res.status(400).json({
            "msg":`Available collections: ${availableCollections}`
        })
    }

    switch (collection){
        case 'users':
            searchUsers(term,res)
        break
        case 'categories':
            searchCategories(term,res)
        break
        case 'courses':
            searchCourses(term,res)
        break
        default:
            res.status(500).json({
                "msg":"error when doing the search"
            })
    }
}

module.exports={
    search
}