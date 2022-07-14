const axios = require("axios");
const responseData = require("../helper/response");
const Package = require("../models/Package");

const takenPackage = async(req, res)=>{
  const url = "http://127.0.0.1:5000/sibox"
  const findPackage = await Package.findOne({where:{validate_code : req.body.validate_code}})
  const box = await Box.findOne({where:{id : findPackage.boxes_id}})

  hitLocker(url, box.number)

  const current = new Date()

  if(findPackage == null){
      res.send({response:401})
  }else{
     //update package
    await Package.findOne({where:{validate_code : req.body.validate_code}}).then((item) => {
        item.update({
              take_time : current.toString(),
              status : "Collected",                  
        })
    })

    responseData.responseData.code = 200;
    responseData.responseData.latency = 0;
    responseData.responseData.message = "Package Available";
    res.send({
      response: responseData.responseData,
      data: await Package.findOne({
        where: { validate_code: req.body.validate_code }
      })
    })
  }
};

module.exports = {
  takenPackage,
};
