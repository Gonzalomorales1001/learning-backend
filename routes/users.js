const { Router }=require('express')

const {GETusers,POSTusers,PUTusers,DELETEusers}=require('../controllers/users')

const router=Router()

router.get('/', GETusers)

  router.post('/', POSTusers)

  router.put('/:id', PUTusers)

  router.delete('/:id', DELETEusers)


module.exports=router