const {Schema,model, SchemaTypes}=require('mongoose')

const CourseSchema=Schema({
    course:{
        type:String,
        required:[true,"you have not sent the name of the course"],
        unique:true
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
    },
    category:{
        type:SchemaTypes.ObjectId,
        ref:"Category",
        required:true
    },
    price:{
        type:Number,
        default:0
    },
    description:{type:String},
    img:{type:String},
    featured:{
        type:Boolean,
        default:false,
    }
})

module.exports=model('Course',CourseSchema)