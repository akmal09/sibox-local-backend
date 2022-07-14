const response = require("./response")
const axios = require("axios");

const hitApi = async (url, datapackage) => {
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
                "status":datapackage.status
            }},
            {
                timeout:5000
            }
        )
        return response.data
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

const hitTraceLocker = async()=>{
    
}

module.exports = {
    hitApi : hitApi,
    hitLocker : hitLocker
}