const { Router }=require('express')
//validaciones
const {check}=require('express-validator')
const {validate}=require('../middlewares/validate')
//importando validaciones customizadas
const {validRol,userEmailAlreadyInUse,idUserNotFound}=require('../helpers/DBvalidators')
//importamdo validaciones del token
const { validateJWT } = require('../middlewares/validateJWT')
//importando validacion de admin
const { isAdminRole } = require('../middlewares/validateRole')
//importando las funciones de controlador
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

  router.put('/:id',[
    validateJWT,
    check("id","Invalid MongoDB ID").isMongoId(),
    check("id").custom(idUserNotFound),
    // check("rol").custom(validRol),
    validate
  ], PUTusers)

  router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check("id","Invalid MongoDB ID").isMongoId(),
    check("id").custom(idUserNotFound),
    validate
  ], DELETEusers)


module.exports=router