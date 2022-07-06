const Package = require("../models/Package");
// const api_helper = require("../helper/api_helper");
const { request } = require("express");
const https = require("https");
const axios = require("axios");
const fetch = require('node-fetch');
// import axios, * as others from 'axios';
// const { response } = require("express");


const getPackageNumber = async (req, res) => {
    const packagesNumber = req.body;
    // request({
    //     method:"POST",
    //     url : "https://api.github.com/users/crymlll"
    // }, function(error, response, body){
    //     console.log(body)
    // })
    axios("http://127.0.0.1:8000/locker/check/order",{
        method:"POST",
        headers:{
            "Content-Type" : "application/json",
            "x_terminal_id" : "212312",
            "x_token" : "se12jsnpo"
        }
    }).then(res => {
        console.log(res.data)
    })
    .catch(error =>console.log(error))

    // fetch("http://127.0.0.1:8000/check/order",{
    //     method : 'GET',
    //     headers:{
    //         'x_terminal_id':'212312',
    //         'x_token':'se12jsnpo'
    //     }
    // }).then((res)=>
    //     console.log(res.json())
    // )
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