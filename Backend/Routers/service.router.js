const {Router}=require('express')
const { Service, ServiceUpload, Allservic } = require('../Controllers/service.controller')

const service=Router()

service.get("/AllSerices",Allservic)
service.post("/serivce",ServiceUpload,Service)

module.exports=service