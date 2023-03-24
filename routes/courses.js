const { Router }=require('express')
const {GetAllCourses,getCourse,newCourse,updateCourse,deleteCourse}=require('../controllers/courses')

const { check } = require("express-validator");
const { validate } = require("../middlewares/validate");
const { validateJWT } = require("../middlewares/validateJWT");
const { isAdminRole } = require("../middlewares/validateRole");

const {courseAlreadyExistsDB} = require("../helpers/DBvalidators");

const router=Router()

router.get("/", GetAllCourses);
router.get(
  "/:id",
  [
    check("id", "Invalid MongoID").isMongoId(),
    //validar si el curso existe🤔
    check("id").custom(courseAlreadyExistsDB),
    validate,
  ],
  getCourse
);

router.post(
  "/",
  [
    validateJWT,
    isAdminRole,
    check("course", "course name is required").notEmpty(),
    validate,
  ],
  newCourse
);

router.put(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "Invalid MongoID").isMongoId(),
    //validar si el curso existe🤔
    check("id").custom(courseAlreadyExistsDB),
    validate,
  ],
  updateCourse
);

router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "Invalid MongoID").isMongoId(),
    //validar si el curso existe
    check("id").custom(courseAlreadyExistsDB),
    validate,
  ],
  deleteCourse
);

module.exports=router