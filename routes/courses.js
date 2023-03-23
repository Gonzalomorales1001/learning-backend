const { Router }=require('express')
const {getCourses}=require('../controllers/courses')

const router=Router()

router.get('/',getCourses)

module.exports=router