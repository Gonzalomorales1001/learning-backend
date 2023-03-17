//modelo de datos de usuario:


//name
//lastname
//avatar
//rol (user||admin)
//status


const {Schema,model}=require('mongoose')

const UserSchema=Schema({
    name:{
        type: String,
        required: [true,"Invalid Name"],
    },
    email:{
        type: String,
        required: [true,"Mail is required"],
        unique: true,
    },
    password:{
        type: String,
        required: [true, "Password is required"],
    },
    img:{
        type: String,
    },
    rol:{
        type: String,
        required: [true],
        // enum:["USER","ADMIN"],
        default:"USER"
    },
    status:{
        type: Boolean,
        default: true,
    }
})

module.exports=model('User',UserSchema) //creamos el modelo de usuario para despues crear una instancia en la peticion POST