const {response,request}=require('express')


const getCourses=async(res=response,req=request)=>{
    res.json({
        "msg":"get OK"
    })
}
module.exports={
    getCourses,
}