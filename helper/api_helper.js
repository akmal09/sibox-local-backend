const response = require("./response")
const axios = require("axios");
const config = require("../config/config");
const Locker = require("../models/Locker");

const terminaIdentifier = async ()=>{
    const lockers = await Locker.findOne()
    console.log("ini loker", lockers.id)

    if(lockers == null){
        return null
    }else{
        return lockers.id
    }
}

const hitApi = async (url, datapackage) => {
    const lockers = await Locker.findOne()
    try{
        var response = await axios(url,{
            method :  "POST",
            headers:{
                "Content-Type" : "application/json",
                "x_terminal_id" : lockers.id,
                "x_token" : config.merchant.token
            },
            data:{
                "package_number":datapackage.package_number,
                "take_time":datapackage.take_time,
                "package_type":datapackage.package_type,
                "overdue_time":datapackage.overdue_time,
                "lockers_id":datapackage.lockers_id,
                "boxes_id":datapackage.boxes_id,
                "status":datapackage.status,
                "last_modified_time":datapackage.last_modified_time,
                "status":datapackage.status,
                "validate_code":datapackage.validate_code
            }},
            {
                timeout:5000
            }
        )
        return response.data;
    }catch(error){
        console.log(error)
    }
}

const hitLocker = async(url, box_number)=>{
    try{
        const response = await axios(url, {
            method: "POST",
            data: {
                "cmd":"open",
                "param":box_number
            }
        })

        return response
    }catch(error){
        console.log(error)
    }
}

const hitGetLockersData = async(url, datapackage)=>{
    try{
        var response = await axios(url,{
            method :  "POST",
            headers:{
                "Content-Type" : "application/json",
                "x_terminal_id" : datapackage.lockers_id,
                "x_token" : config.merchant.token
            },
            data:{
                "lockers_id":datapackage.lockers_id,
            }},
            {
                timeout:5000
            }
        )
        return response.data;
    }catch(error){
        console.log(error)
    }
}

const isBroke = {
    variable:false,
    set setBroke(param){
        this.variable = param
    },
    get getBroke(){
        return this.variable
    }
}

const hitCekTarif = async(url, dataPackage)=>{
    const lockers = await Locker.findOne()
    try{
        const response = await axios(url,{
            method :  "POST",
            headers:{
                "Content-Type" : "application/json",
                "x_terminal_id" : lockers.id,
                "x_token" : config.merchant.token
            },
            data:{
                "province" : dataPackage.province,
                "city" : dataPackage.city,
                "district" : dataPackage.district,
                "city_destination" : dataPackage.cityDestination
            }},
            {
                timeout:5000
            }
        )
        return response.data;
    }catch(error){
        console.log(error)
    }
}

const hitCekAsuransi= async(url, dataPackage)=>{
    const lockers = await Locker.findOne()
    try{
        const response = await axios(url,{
            method :  "POST",
            headers:{
                "Content-Type" : "application/json",
                "x_terminal_id" : lockers.id,
                "x_token" : config.merchant.token
            },
            data:{
                "parcel_value" : dataPackage.parcel_value
            }},
            {
                timeout:5000
            }
        )
        return response.data;
    }catch(error){
        console.log(error)
    }
}

const hitThirdApi = async(url, dataPackage)=>{
    const lockers = await Locker.findOne()
    try{
        const response = await axios(url,{
            method :  "POST",
            headers:{
                "Content-Type" : "application/json",
                "x_terminal_id" : lockers.id,
                "x_token" : config.merchant.token
            },
            data:{dataPackage}
        },
            {
                timeout:5000
            }
        )
        return response.data;
    }catch(error){
        console.log(error)
    }
}

const hitGetQr = async(url, dataPackage)=>{    
    try{
        const response = await axios(url,{
            method :  "POST",
            headers:{
                "Content-Type" : "application/json",
                "X-Merchant-Id" : config.merchant.id
            },
            data:{
                "token":dataPackage.token,
                "tid":dataPackage.tid,
                "mid":dataPackage.mid,
                "provider":dataPackage.provider,
                "method":dataPackage.method,
                "amount":dataPackage.amount,
                "reff_no":dataPackage.reff_no,
                "partner_callback_url":dataPackage.partner_callback_url
            }},
            {
                timeout:5000
            }
        )
        return response.data;
    }catch(error){
        console.log(error)
    }
}

const hitCheckPaymentStatus = async(url, dataPackage)=>{
    try{
        const response = await axios(url,{
            method :  "POST",
            headers:{
                "Content-Type" : "application/json",
                "X-Merchant-Id" : config.merchant.id
            },
            data:{
                "token":dataPackage.token,  
                "tid" :dataPackage.tid,
                "mid" :dataPackage.mid,
                "provider":config.merchant.provider,
                "amount":dataPackage.amount,
                "trx_id":dataPackage.trx_id           
            }},
            {
                timeout:5000
            }
        )
        return response.data;
    }catch(error){
        console.log(error)
    }
}

const timeCall = (time, h)=>{
    console.log("sebelum ",time)
    time.setTime(time.getTime() + (h *60 * 60 * 1000))
    console.log("sesudah ",time)
    return time
}

const test = async ()=>{
    // console.log("coba test", terminaIdentifier());
    const terminal = await terminaIdentifier()
    console.log("terminal", terminal)
}

module.exports = {
    hitApi : hitApi,
    hitGetLockersData : hitGetLockersData,
    hitLocker : hitLocker,
    isBrokeResponse : isBroke,
    hitCekTarif : hitCekTarif,
    hitCekAsuransi : hitCekAsuransi,
    hitThirdApi : hitThirdApi,
    timeCall : timeCall,
    hitgetQr : hitGetQr,
    hitCheckPaymentStatus : hitCheckPaymentStatus,
    test : test
}