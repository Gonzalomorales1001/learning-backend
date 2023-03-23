const {request,response}=require('express')
const category = require('../models/category')
const Category=require('../models/category')

const getCategories=async(req=request,res=response)=>{
    const {since=0,limit=5}=req.query
    const statusTrue={status:true}

    const [categories,total]=await Promise.all([
        Category.find(statusTrue).skip(since).limit(limit).populate('user','name email'),
        Category.countDocuments(statusTrue)
    ])

    res.json({
        categories,
        "total":total
    })
}

const getCategoryByID=async(req=request,res=response)=>{
    const {id}=req.params

    const categoryFound=await Category.findById(id).populate('user',"name")

    res.json({
        categoryFound
    })
}

const newCategory=async(req=request,res=response)=>{
    const categoryName=req.body.category.toUpperCase()

    const categoryExist=await Category.findOne({category:categoryName})

    if(categoryExist){
        return res.status(400).json({
            "msg":`${categoryName} already exists!`
        })
    }

    
    const data={
        category:categoryName,
        user: req.user._id,
    }

    // res.json({
    //     data
    // })

    const categoryInstance=new Category(data)

    await categoryInstance.save()

    res.status(201).json({
        "msg":`Category: ${categoryName} has been created successfully!`
    })

    //
    //
    //
    //
    //
    //
    //converting singular estructure ERROR
}

const updateCategory=async(req=request,res=response)=>{
    const {id}=req.params
    const categoryName=req.body.category.toUpperCase()
    const user=req.user._id

    const data={
        categoryName,
        user
    }

    const category=await Category.findByIdAndUpdate(id,data,{new:true})

    res.status(201).json({
        "msg":`${categoryName} has been successfully updated!`
    })
}

const deleteCategory=async(req=request,res=response)=>{
    const {id}=req.params
    const user=req.user._id

    const categoryAlreadyInactive=await Category.findOne({status:false})
    if(categoryAlreadyInactive){
        return res.status(400).json({
            "msg":"This category is already inactive"
        })
    }

    const categoryDeleted=await Category.findByIdAndUpdate(id,{status:false},{new:true})

    res.json({
        "msg":"category status:false",
        categoryDeleted
    })
}

module.exports={
    getCategories,
    getCategoryByID,
    newCategory,
    updateCategory,
    deleteCategory
}