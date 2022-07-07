const Package = require("../models/Package");
const axios = require("axios");
const fetch = require('node-fetch');
const responseData = require("../helper/response")
// import axios, * as others from 'axios';
// const { response } = require("express");


const getPackageNumber = async (req, res) => {
    const packagesNumber = req.body;
    // console.log(packagesNumber.package_id)
    if(packagesNumber.package_id == undefined || packagesNumber.package_id == null ||packagesNumber.package_id ==""){
        res.send({response : "null"})
    }else{
        axios("http://127.0.0.1:8000/locker/check/order",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json",
                "x_terminal_id" : "212312",
                "x_token" : "se12jsnpo"
            },
            data:{
                "package_number":packagesNumber.package_id
            }
        }).then(responseApi => {
            // console.log(packagesNumber.body.package_id)
            responseData.responseData.code = responseApi.data.response.code
            responseData.responseData.latency=responseApi.data.response.latency
            responseData.responseData.message = responseApi.data.response.message
            // console.log(responseApi.data)
            res.send({
                response : responseData.responseData,
                data : responseApi.data.data
            })
        })
        .catch(error =>console.log(error))
    }

};

const saveDropPackage = async(req, res)=>{
    const dataPackage = req.body;
    console.log(dataPackage)
    // buat mekanisme insert ke database
};

module.exports ={
    getPackageNumber
}