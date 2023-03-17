const {Schema,model}=require('mongoose')

const rolSchema=Schema({
    rol:{
        type:String,
    }
})

module.exports=model('Rol',rolSchema)