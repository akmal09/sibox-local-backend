const axios = require("axios");
const response = require("../helper/response");
const responseData = require("../helper/response")

const courierLogin =async(req,res)=>{
    const loginAtrribute = req.body

    axios("http://127.0.0.1:8000/locker/operator/login",{
        method:"POST",
        headers:{
            "Content-Type" : "application/json",
            "x_terminal_id" : "212312",
            "x_token" : "se12jsnpo"
        },
        data:{
            "username":loginAtrribute.username,
            "password":loginAtrribute.password
        }
    }).then(responseApi => {
        console.log(responseApi.data.data.token)
        responseData.responseData.code = responseApi.data.response.code
        responseData.responseData.latency = responseApi.data.response.latency
        responseData.responseData.message = responseApi.data.response.message

        if(responseData.responseData.code == 200 && responseApi.data.data.token != undefined){
            res.send({
                response : responseData.responseData,
                data : responseApi.data.data.token
            })
        }else {
            res.send({
                response : responseData.responseData,
                data : responseApi.data.data.token
            })
        }
    }).catch(error => console.log(error))
};

module.exports = {
    courierLogin
}