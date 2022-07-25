const Package = require("../models/Package");
const axios = require("axios");
const responseData = require("../helper/response");
const { stringGenerator } = require("../helper/string_generator");
const Box = require("../models/Box");
const { hitLocker } = require("../helper/api_helper");
const BoxType = require("../models/BoxType");

const getPackageNumber = async (req, res) => {
  const packagesNumber = req.body;
  if (
    packagesNumber.package_id == undefined ||
    packagesNumber.package_id == null ||
    packagesNumber.package_id == ""
  ) {
    res.send({ response: "null" });
  } else {
    axios("http://127.0.0.1:8000/locker/check/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        x_terminal_id: "212312",
        x_token: "se12jsnpo",
      },
      data: {
        package_number: packagesNumber.package_id,
      },
    })
      .then((responseApi) => {
        // console.log(packagesNumber.body.package_id)
        responseData.responseData.code = responseApi.data.response.code;
        responseData.responseData.latency = responseApi.data.response.latency;
        responseData.responseData.message = responseApi.data.response.message;
        // console.log(responseApi.data)
        res.send({
          response: responseData.responseData,
          data: responseApi.data.data,
        });
      })
      .catch((error) => console.log(error));
  }
};

const saveDropPackage = async (req, res) => {
  const url = "http://127.0.0.1:5000/sibox"
  const timeStart = new Date()
  const dataPackage = req.body;
  const currentTime = Math.floor(new Date() / 1000)
  console.log(currentTime)

  console.log("ukuran",dataPackage.boxes_id)

  const boxTypeId = await BoxType.findOne({where : {
    name : dataPackage.boxes_id
  }})

  const selectFreeBox = await Box.findOne({where : {
    status : "FREE",
    box_type_id: boxTypeId.id
  }})

  if(selectFreeBox == null){
    const timeEnd = new Date()
    res.send({
      response : {
        code : 400,
        latnecy : timeEnd - timeStart,
        message : "Box Penuh",
      },
      data : {}
    });
  }else{
    // HIT API JIKA SUDAH SIAP
    const responseLocker = hitLocker(url,selectReadyBox.number)
    responseLocker.then(async (response) =>{
      if(response.data.message == "Success"){
      const package = {
        id:dataPackage.id,
        e_commerces_id:dataPackage.e_commerces_id,
        logistics_id:dataPackage.logistics_id,
        customer_store_number:dataPackage.customer_store_number,
        package_number:dataPackage.package_number,
        package_type:"COURIER_STORE",
        overdue_time:dataPackage.overdue_time,
        lockers_id:dataPackage.lockers_id,
        boxes_id:selectReadyBox.id,
        status:"STORED",
        sync_flag:0,
        weight:dataPackage.weight,
        take_time:dataPackage.take_time,
        store_time:dataPackage.store_time,
        take_user_id:dataPackage.take_user_id,
        store_user_id:dataPackage.store_user_id,
        take_user_name:dataPackage.take_user_name,
        store_user_name:dataPackage.store_user_name,
        staff_taken_user:dataPackage.staff_taken_user,
        recipient_name:dataPackage.recipient_name,
        recipient_user_phone_number:dataPackage.recipient_user_phone_number,
        courier_id:dataPackage.courier_id,
        start_address:dataPackage.start_address,
        end_address:dataPackage.end_address,
        validate_code:stringGenerator(6),
        last_modified_time:currentTime.toString(),
        import_time:dataPackage.import_time
      };
    
      await Package.create(package).then(() =>{
        const timeEnd = new Date()
          res.send({
            response : {
              code : 200,
              latnecy : timeEnd - timeStart,
              message : "Paket Telah di drop",
            },
            data : {}
          });
      })

      await Box.findOne({where : {id: selectReadyBox.id}}).then((item)=>{
        item.update({
          status : "USED"
        })
      })

    }else{
      const timeEnd = new Date()
      res.send({
        response : {
          code : 500,
          latnecy : timeEnd - timeStart,
          message : "Internal Error",
        },
        data : {}
      });
    }

    })
  }
};

const courierLogin = async (req, res) => {
  const loginAtrribute = req.body;

  axios("http://127.0.0.1:8000/locker/operator/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      x_terminal_id: "212312",
      x_token: "se12jsnpo",
    },
    data: {
      username: loginAtrribute.username,
      password: loginAtrribute.password,
    },
  })
    .then((responseApi) => {
      responseData.responseData.code = responseApi.data.response.code;
      responseData.responseData.latency = responseApi.data.response.latency;
      responseData.responseData.message = responseApi.data.response.message;

      if (responseData.responseData.code == 200 && responseApi.data.data.token != undefined) {
        res.send({
          response: responseData.responseData,
          data: responseApi.data.data.token,
        });
      } else {
        res.send({
          response: responseData.responseData,
          data: responseApi.data.data.token,
        });
      }
    })
    .catch((error) => console.log(error));
};

module.exports = {
  getPackageNumber,
  saveDropPackage,
  courierLogin,
};
