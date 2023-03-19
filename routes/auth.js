const { Router }=require('express')
const {check}=require('express-validator')
const {validate}=require('../middlewares/validate')

const {login}=require('../controllers/auth')

const router=Router()

router.post('/login',[
    check("email","Invalid Email").isEmail(),
    check("password","Password can't be empty").notEmpty(),
    validate
], login)

module.exports=router