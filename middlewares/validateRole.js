const {request,response}=require('express')

const isAdminRole=(req=request,res=response,next)=>{
    if(!req.user){
        return res.status(500).json({
            "msg":"Admin role validation requires token validation"
        })
    }
    const {rol,name}=req.user
    if(rol != "ADMIN"){
        return res.status(401).json({
            "msg":`${name} doesn't have administrator permissions`
        })
    }
    next()
}

module.exports={
    isAdminRole,
}