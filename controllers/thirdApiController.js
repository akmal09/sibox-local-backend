const { hitCekTarif, hitCekAsuransi} = require("../helper/api_helper");
const { cekTarifRequest, responseData } = require("../helper/response")

const cekTarif = async(req,res)=>{
    const start = new Date()
    const url = "http://127.0.0.1:8000/api/cek-tarif"
    const data = req.body

    cekTarifRequest.province = data.province
    cekTarifRequest.city = data.city
    cekTarifRequest.district = data.district
    cekTarifRequest.cityDestination = data.city_destination

    var response = hitCekTarif(url, cekTarifRequest)
    response.then(async (result) =>{
        console.log("OUTPUT DATA ",result)
        if(result == undefined){
            responseData.code = 500
            responseData.latency = new Date() - start
            responseData.message = "Internal Server Error"
            res.send({
                response : responseData,
                data : result
            })
        }else{
            if(result.response.code == 200){
                res.send(result)
            }else{
                console.log("ALERT, ERROR HOST",result)
            }
        }
        
    })
}

const cekAsuransi = async(req,res)=>{
    const url = "http://127.0.0.1:8000/api/cek-asuransi"
    const data = req.body
    var response = hitCekAsuransi(url, data)
    response.then(async (result) =>{
        console.log("OUTPUT DATA ",result)
        if(result == undefined){
            responseData.code = 500
            responseData.latency = new Date() - start
            responseData.message = "Internal Server Error"
            res.send({
                response : responseData,
                data : result
            })
        }else{
            if(result.response.code == 200){
                res.send(result)
            }else{
                console.log("ALERT, ERROR HOST",result)
            }
        }
    })
}

const pickUpRequest = async(req,res)=>{
    
}

module.exports = {
    cekTarif,
    cekAsuransi
}