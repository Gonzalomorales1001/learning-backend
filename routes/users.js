const { Router }=require('express')

//validaciones
const {check}=require('express-validator')
const {validate}=require('../middlewares/validate')
//validacion de rol existente
const {validRol}=require('../helpers/DBvalidators')
//validacion de email en uso
const {userEmailAlreadyInUse}=require('../helpers/DBvalidators')


const {GETusers,POSTusers,PUTusers,DELETEusers}=require('../controllers/users')

const router=Router()

router.get('/', GETusers)

  router.post('/',[
    check("name","Name is required").notEmpty(),
    check("email","Invalid Email").isEmail(),
    check("email").custom(userEmailAlreadyInUse),
    check("password","Password must be at least 6 characters").isLength({min:6}),
    check("rol").custom(validRol),
    // check("rol","Invalid Rol").isIn(["USER","ADMIN"]),
    validate
  ],POSTusers)

  router.put('/:id', PUTusers)

  router.delete('/:id', DELETEusers)


module.exports=router