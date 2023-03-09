const {request,response}=require('express')


const GETusers=(req=request,res=response)=>{

    const {apiKey,test}=req.query
    
    res.json([
        {
            "name":"Pablo",
            "lastname":"Marino",
            test,
        },{
            "name":"Gonzalo",
            "lastname":"Morales",
            apiKey
        }
    ])
}

const POSTusers=(req=request,res=response)=>{
    const {name,surname}=req.body
    res.json({
        msg:"POST post",
        name,
        surname
    })
}

const PUTusers=(req=request,res=response)=>{
    res.json({
        msg:"put PUT"
    })
}

const DELETEusers=(req=request,res=response)=>{
    res.json({
        msg:"delete DELETING"
    })
}

module.exports={
    GETusers,
    POSTusers,
    PUTusers,
    DELETEusers,
}