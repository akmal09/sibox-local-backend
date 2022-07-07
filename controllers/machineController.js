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
            console.log(packagesNumber.body.package_id)
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
    const package = {
        id:dataPackage.id,
        e_commerces_id:dataPackage.e_commerces_id,
        logistics_id:dataPackage.logistics_id,
        customer_store_number:dataPackage.customer_store_number,
        package_number:dataPackage.package_number,
        package_type:dataPackage.package_type,
        overdue_time:dataPackage.overdue_time,
        lockers_id:dataPackage.lockers_id,
        boxes_id:dataPackage.boxes_id,
        status:dataPackage.status,
        sync_flag:dataPackage.sync_flag,
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
        validate_code:dataPackage.validate_code,
        import_time:dataPackage.import_time
    };

    await Package.create(package).then(() =>{
        res.sendStatus(201);
    }).catch(error => console.log(error))
};

module.exports ={
    getPackageNumber,
    saveDropPackage
}