const { hitCekTarif, hitCekAsuransi} = require("../helper/api_helper");
const { cekTarifRequest } = require("../helper/response")

const cekTarif = async(req,res)=>{
    const url = "http://127.0.0.1:8000/api/cek-tarif"
    const data = req.body

    cekTarifRequest.province = data.province
    cekTarifRequest.city = data.city
    cekTarifRequest.district = data.district

    var response = hitCekTarif(url, cekTarifRequest)
    response.then(async (result) =>{
        console.log("OUTPUT DATA ",result)
        if(result.response.code == 200){
            res.send(result)
        }else{
            console.log("ALERT, ERROR HOST",result)
        }
    })
}

const cekAsuransi = async(req,res)=>{
    const url = "http://127.0.0.1:8000/api/cek-asuransi"
    const data = req.body
    var response = hitCekAsuransi(url, data)
    response.then(async (result) =>{
        console.log("OUTPUT DATA ",result)
        if(result.response.code == 200){
            res.send(result)
        }else{
            console.log("ALERT, ERROR HOST",result)
        }
    })
}

module.exports = {
    cekTarif,
    cekAsuransi
}