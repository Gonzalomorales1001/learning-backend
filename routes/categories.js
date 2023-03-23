const { Router }=require('express')

const {check}=require('express-validator')
const {validate}=require('../middlewares/validate')

const {idUserNotFound}=require('../helpers/DBvalidators')
const { validateJWT } = require('../middlewares/validateJWT')
const { isAdminRole } = require('../middlewares/validateRole')

const {getCategories,getCategoryByID,newCategory,updateCategory,deleteCategory}=require('../controllers/categories')

const router=Router()

router.get('/',[
    validateJWT
],getCategories)

router.get('/:id',[
    validateJWT,
    check("id","Invalid ID").isMongoId(),
    // check id category
    validate
],getCategoryByID)

router.post('/',[
    validateJWT,
    isAdminRole,
    check("category","Name is required").notEmpty(),
    validate,
],newCategory)

router.put('/:id',[
    validateJWT,
    isAdminRole,
    check("id","Invalid ID").isMongoId(),
    //check id category
    check("category","Name is required").notEmpty(),
    validate
],updateCategory)

router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check("id","Invalid ID").isMongoId(),
    //check id category
    validate
],deleteCategory)
module.exports=router