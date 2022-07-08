const Package = require("../models/Package");
const axios = require("axios");
const responseData = require("../helper/response");

const getPackageNumber = async (req, res) => {
  const packagesNumber = req.body;
  // console.log(packagesNumber.package_id)
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
  const dataPackage = req.body;
  //   console.log(dataPackage);
  const current = new Date();

  const package = {
    id: dataPackage.id,
    e_commerces_id: dataPackage.e_commerces_id,
    logistics_id: dataPackage.logistics_id,
    customer_store_number: dataPackage.customer_store_number,
    package_number: dataPackage.package_number,
    package_type: "courier_store",
    overdue_time: dataPackage.overdue_time,
    lockers_id: dataPackage.lockers_id,
    boxes_id: dataPackage.boxes_id,
    status: "stored",
    sync_flag: 0,
    weight: dataPackage.weight,
    store_time: dataPackage.store_time,
    store_user_id: dataPackage.store_user_id,
    take_user_name: dataPackage.take_user_name,
    store_user_name: dataPackage.store_user_name,
    recipient_name: dataPackage.recipient_name,
    recipient_user_phone_number: dataPackage.recipient_user_phone_number,
    courier_id: dataPackage.courier_id,
    start_address: dataPackage.start_address,
    end_address: dataPackage.end_address,
    validate_code: dataPackage.validate_code,
    last_modified_time: current.toString(),
  };

  await Package.create(package).then(() => {
    res.send({ status: 201 });
  });
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
      //   console.log(responseApi.data.data.token);
      responseData.responseData.code = responseApi.data.response.code;
      responseData.responseData.latency = responseApi.data.response.latency;
      responseData.responseData.message = responseApi.data.response.message;

      if (
        responseData.responseData.code == 200 &&
        responseApi.data.data.token != undefined
      ) {
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
