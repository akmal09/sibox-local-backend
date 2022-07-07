const Package = require("../models/Package");
// const api_helper = require("../helper/api_helper");
const { request } = require("express");
const https = require("https");
const axios = require("axios");
const fetch = require('node-fetch');
// import axios, * as others from 'axios';
// const { response } = require("express");
const responseData = {
    code:"",
    latency:"",
    message:""
}

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
            body:{
                "package_number":packagesNumber.package_id
            }
        }).then(responseApi => {
            // console.log(packagesNumber.body.package_id)
            responseData.code = 200
            responseData.latency=13132
            responseData.message = "OK"
            res.send({
                response:responseData,
                data : {
                    code : responseApi.data.response.code,
                    message : responseApi.data.response.message,
                    data : responseApi.data.data
                }
            })
        })
        .catch(error =>console.log(error))
    }
    

    
    // await Package.findOne({where: { pahttp://127.0.0.1:8000/check/orderckage_number : packagesNumber} }).then((data) => {
    //     // console.log(data)
    // })
    // res.send({
    //     packages : packages
    // })
};

module.exports ={
    getPackageNumber
}