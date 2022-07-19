const axios = require("axios");
const { hitLocker } = require("../helper/api_helper");
const responseData = require("../helper/response");
const Box = require("../models/Box");
const Package = require("../models/Package");

const takenPackage = async(req, res)=>{

  const currentTime = new Date()
  const url = "http://127.0.0.1:5000/sibox"
  const findPackage = await Package.findOne({where:{validate_code : req.body.validate_code}})
  if(findPackage == null){
    responseData.responseData.code = 400;
    responseData.responseData.latency = 0;
    responseData.responseData.message = "Package Tidak Tersedia";
    res.send({
      response: responseData.responseData,
      data: await Package.findOne({
        where: { validate_code: req.body.validate_code }
      })
    })
  }else {
    if(findPackage.status == "STORED"){
      const box = await Box.findOne({where:{id : findPackage.boxes_id}})
      console.log(findPackage)
  
      const current = new Date()
      hitLocker(url, box.number)
  
      if(findPackage == null){
          res.send({response:401})
      }else{
         //update package
        await Package.findOne({where:{validate_code : req.body.validate_code}}).then((item) => {
            item.update({
                  take_time : current.toString(),
                  status : "COLLECTED",     
                  sync_flag : 0             
            })
        })
        await Box.findOne({where:{id : findPackage.boxes_id}}).then((item) =>{
          item.update({
            status : "FREE"
          })
        })
        const endTime = new Date()
        responseData.responseData.code = 200;
        responseData.responseData.latency = endTime - currentTime;
        responseData.responseData.message = "Package Available";
        res.send({
          response: responseData.responseData,
          data: await Package.findOne({
            where: { validate_code: req.body.validate_code }
          })
        })
      }
    }else {
      const endTime = new Date()
      responseData.responseData.code = 404;
      responseData.responseData.latency = endTime - currentTime;
      responseData.responseData.message = "Paket sudah diambil";
      res.send({
        response: responseData.responseData,
        data: await Package.findOne({
          where: { validate_code: req.body.validate_code }
        })
      })
    }
  }
};

module.exports = {
  takenPackage,
};
