const {Router}=require('express')

const router=Router()

router.get('/:collection/:term', search)

module.exports=router