const { Router }=require('express')

const {check}=require('express-validator')
const {validate}=require('../middlewares/validate')

const { validateJWT } = require('../middlewares/validateJWT')
const { isAdminRole } = require('../middlewares/validateRole')
const {idCategoryNotFound}=require('../helpers/DBvalidators')

const {getCategories,getCategoryByID,newCategory,updateCategory,deleteCategory}=require('../controllers/categories')

const router=Router()

router.get('/',[
    validateJWT
],getCategories)

router.get('/:id',[
    validateJWT,
    check("id","Invalid ID").isMongoId(),
    check("id").custom(idCategoryNotFound),
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
    check("id").custom(idCategoryNotFound),
    check("category","Name is required").notEmpty(),
    validate
],updateCategory)

router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check("id","Invalid ID").isMongoId(),
    check("id").custom(idCategoryNotFound),
    validate
],deleteCategory)
module.exports=router