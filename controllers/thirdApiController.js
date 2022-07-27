const config = require("../config/config");
const { hitCekTarif, hitCekAsuransi, hitThirdApi, timeCall} = require("../helper/api_helper");
// const { cekTarifRequest, responseData } = require("../helper/response");
const { create_UUID, stringGenerator } = require("../helper/string_generator");
const Box = require("../models/Box");
const BoxType = require("../models/BoxType");
const Locker = require("../models/Locker");
const Package = require("../models/Package");

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
    const time = new Date()
    
    const url = "http://127.0.0.1:8000/api/send/pickup-request"
    const dataPackage = req.body
    dataPackage.id = create_UUID()
    dataPackage.store_user_id = create_UUID()
    dataPackage.customer_store_number = create_UUID()
    const currentTime = new Date()

    if(time > 12){
        const pickUpRequestTime = timeCall(time, config.timeAbove12)
        dataPackage.pickup_request_date = time.getTime()
    }else{
        const pickUpRequestTime = timeCall(time, config.timeUnder12)
        dataPackage.pickup_request_date = time.getTime()
    }

    console.log("ini data tanggal", dataPackage.pickup_request_date)
    const boxTypeId = await BoxType.findOne({where : {
        name : dataPackage.dimensi
      }})
    console.log("ini data asdasdbox", boxTypeId)

    const selectFreeBox = await Box.findOne({where : {
      status : "FREE",
      box_type_id: boxTypeId.id
    }})
    console.log("ini data box", selectFreeBox)

    const lockers = await Locker.findOne()

    if(selectFreeBox == null){

    }else{
        const package = {
            id : dataPackage.id,
            e_commerces_id : null, //
            logistics_id : dataPackage.logistics_id, //
            customer_store_number : null,
            package_number : null,
            pickup_request_date : dataPackage.pickup_request_date,
            package_type : "STORED",
            overdue_time : dataPackage.overdue_time,
            lockers_id : lockers.id,
            boxes_id : selectFreeBox.id,
            status : "CUSTOMER_STORE",
            sync_flag : 0,
            weight : dataPackage.weight,
            take_time : null,
            store_time : currentTime.getTime(), 
            take_user_id : null,
            store_user_id : stringGenerator(12),
            store_user_name : dataPackage.store_user_name,
            staff_taken_user : null,
            recipient_name : dataPackage.recipient_name,
            recipient_user_phone_number : dataPackage.recipient_user_phone_number,
            recipient_address : dataPackage.recipient_address,
            recipient_district : dataPackage.recipient_district,
            recipient_sub_district : config.subdistrict,
            recipient_city : dataPackage.recipient_city,
            recipient_province : dataPackage.recipient_province,
            shipper_disrict : config.shipper_disrict,
            shipper_disrict : config.shipper_disrict,
            shipper_city : config.shipper_city,
            shipper_province : config.shipper_province,
            shipper_zipcode : config.shipper_zipcode,
            courier_id : dataPackage.courier_id,
            destination_code : dataPackage.destination_code,
            tarif : dataPackage.tarif,
            origin_code : config.origin_code,
            start_address : config.start_address,
            end_address : dataPackage.end_address,
            validate_code : stringGenerator(6),
            insurance : dataPackage.insurance,
            notes : dataPackage.notes,
            delivery_type : dataPackage.delivery_type,
            parcel_category : "Paket",
            parcel_content : dataPackage.parcel_content,
            parcel_value : dataPackage.parcel_value,
            pickup_merchant_code : config.merchant.code,
            pickup_merchant_name : config.merchant.name,
            pickup_merchant_phone : config.merchant.phone,
            pickup_merchant_email : config.merchant.email
        }
        console.log("ini paket",package)
        const response = hitThirdApi(url, package)
        response.then(async (result) =>{
            res.send(result)
        })

        // await Package.create(package).then(result => {
        //     console.log("BERHASIL")
        // })
    }
}

const listKelurahan = async(req,res)=>{
    const url = "http://127.0.0.1:8000/api/list-sub-district"
    const data = req.body
    var response = hitThirdApi(url, data)
    response.then(async (result) =>{
        console.log(result)
        res.send({
            response : result.response,
            data : result.data
        })
    })
}

const getDestinationCode = async(req,res)=>{


}

module.exports = {
    cekTarif,
    cekAsuransi,
    listKelurahan,
    pickUpRequest
}