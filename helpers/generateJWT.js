const JWT=require('jsonwebtoken')

const generateJWT=(userID)=>{

    return new Promise((resolve, reject) => {
        //generar payload
        const payload={uid:userID}
        //generar jwt
        JWT.sign(payload,process.env.SECRETORPRIVATEKEY,{expiresIn:'4h'},(err,token)=>{
            if(err){
                console.log(err)
                reject('Cant generate token')
            }else{
                resolve(token)
            }
        })
    })

}

module.exports={
    generateJWT,
}