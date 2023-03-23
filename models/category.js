const {Schema,model, SchemaTypes}=require('mongoose')

const CategorySchema=Schema({
    category:{
        type:String,
        required:[true,"Please send a name for category"],
        unique:true,
    },
    status:{
        type:Boolean,
        required:true,
        default:true,
    },
    user:{
        type:SchemaTypes.ObjectId,
        ref:"User",
        required:true,
    }
})

module.exports=model('Category',CategorySchema)