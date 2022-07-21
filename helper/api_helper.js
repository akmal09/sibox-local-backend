const response = require("./response")
const axios = require("axios");

const hitApi = async (url, datapackage,isBroke) => {
    try{
        var response = await axios(url,{
            method :  "POST",
            headers:{
                "Content-Type" : "application/json",
                "x_terminal_id" : "212312",
                "x_token" : "se12jsnpo"
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
                "param":5
            }
        })

        return response
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
    try{
        const response = await axios(url,{
            method :  "POST",
            headers:{
                "Content-Type" : "application/json",
                "x_terminal_id" : "212312",
                "x_token" : "se12jsnpo"
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
    try{
        const response = await axios(url,{
            method :  "POST",
            headers:{
                "Content-Type" : "application/json",
                "x_terminal_id" : "212312",
                "x_token" : "se12jsnpo"
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

module.exports = {
    hitApi : hitApi,
    hitLocker : hitLocker,
    isBrokeResponse : isBroke,
    hitCekTarif : hitCekTarif,
    hitCekAsuransi : hitCekAsuransi
}