const { merchant } = require("../config/config");
const config = require("../config/config");
const { hitCekTarif, hitCekAsuransi, hitThirdApi, timeCall, hitgetQr, hitCheckPaymentStatus} = require("../helper/api_helper");
// const { cekTarifRequest, responseData } = require("../helper/response");
const { create_UUID, stringGenerator } = require("../helper/string_generator");
const Box = require("../models/Box");
const BoxType = require("../models/BoxType");
const Locker = require("../models/Locker");
const Package = require("../models/Package");
const PackageCheckOut = require("../models/PackageCheckOut");

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
    
    const boxTypeId = await BoxType.findOne({where : {
        name : dataPackage.dimensi
    }})

    const selectFreeBox = await Box.findOne({where : {
      status : "FREE",
      box_type_id: boxTypeId.id
    }})
    // console.log("ini data box", selectFreeBox)

    const tarif_insurance = (dataPackage.tarif+dataPackage.insurance)
    // console.log("nilai",tarif_insurance)
    const lockers = await Locker.findOne()
    const storeNumber = stringGenerator(13)
    const validateCode = stringGenerator(6)

    if(selectFreeBox == null){

    }else{
        const package = {
            id : dataPackage.id,
            e_commerces_id : null, //
            logistics_id : dataPackage.logistics_id, //
            customer_store_number : storeNumber,
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
            recipient_phone : dataPackage.recipient_phone,
            end_address : dataPackage.end_address,
            recipient_district : dataPackage.recipient_district,
            recipient_subdistrict : dataPackage.recipient_subdistrict,
            recipient_city : dataPackage.recipient_city,
            recipient_province : dataPackage.recipient_province,
            shipper_address : config.start_address,
            shipper_district : config.shipper_disrict,
            shipper_subdistrict : config.shipper_disrict,
            shipper_city : config.shipper_city,
            shipper_province : config.shipper_province,
            shipper_zipcode : config.shipper_zipcode,
            shipper_phone : dataPackage.shipper_phone,
            courier_id : null,
            destination_code : dataPackage.destination_code,
            tarif : dataPackage.tarif,
            tarif_insurance : tarif_insurance.toString(),
            origin_code : config.origin_code,
            start_address : config.start_address,
            validate_code : stringGenerator(6),
            insurance : dataPackage.insurance,
            notes : dataPackage.notes,
            delivery_type : dataPackage.delivery_type,
            parcel_category : "Paket",
            parcel_content : dataPackage.parcel_content,
            parcel_value : dataPackage.parcel_value,
            origin_code : config.origin_code,
            pickup_merchant_code : config.merchant.code,
            pickup_merchant_name : config.merchant.name,
            pickup_merchant_phone : config.merchant.phone,
            pickup_merchant_email : config.merchant.email
        }
        // console.log("ini paket",package)
        const response = hitThirdApi(url, package)
        response.then(async (result) =>{
            if(result == undefined){
                console.log("ALERT, ERROR HOST",result)
            }else{
                console.log(result)
                if(result.response.code == 200){
                    // Create Package
                     await Package.create({
                        id : package.id,
                        e_commerces_id : package.e_commerces_id,
                        logistics_id : package.logistics_id,
                        customer_store_number : package.customer_store_number,
                        trx_id : dataPackage.trx_id,
                        package_number : null,
                        package_type : package.delivery_type,
                        overdue_time : package.overdue_time,
                        lockers_id : lockers.id,
                        boxes_id : selectFreeBox.id,
                        status : package.status,
                        sync_flag : package.sync_flag,
                        weight : package.weight,
                        take_time : null,
                        store_time : package.store_time,
                        take_user_id : null,
                        store_user_id : package.store_user_id,
                        take_user_name : null,
                        store_user_name : package.store_user_name,
                        store_user_phone : package.shipper_phone,
                        staff_taken_user : null,
                        recipient_name : package.recipient_name,
                        recipient_phone_number : package.recipient_phone,
                        courier_id : null,
                        start_address : package.start_address,
                        end_address : package.end_address,
                        validate_code : validateCode,
                        import_time : null,
                        last_modified_time : null
                     })

                     await PackageCheckOut.create({
                        id : create_UUID(),
                        packages_id : package.id,
                        airway_bill : result.data.data.awb,
                        ref_id : result.data.data.refid,
                        pickup_request_date : dataPackage.pickup_request_date,
                        recipient_user_phone_number : package.recipient_phone,
                        recipient_address : package.end_address,
                        recipient_district : package.recipient_district,
                        recipient_sub_district : package.recipient_subdistrict,
                        recipient_city : package.recipient_city,
                        recipient_province : package.recipient_province,
                        shipper_disrict : package.shipper_district,
                        shipper_city : package.shipper_city,
                        shipper_province : package.shipper_province,
                        shipper_zipcode : package.shipper_zipcode,
                        destination_code : package.destination_code,
                        tarif : package.tarif,
                        origin_code : package.origin_code,
                        insurance : package.insurance,
                        notes : package.notes,
                        delivery_type : package.delivery_type,
                        parcel_category : package.parcel_category,
                        parcel_content : package.parcel_content,
                        parcel_value : package.parcel_value,
                        pickup_merchant_code : package.pickup_merchant_code,
                        pickup_merchant_name : package.pickup_merchant_name,
                        pickup_merchant_phone : package.pickup_merchant_phone,
                        pickup_merchant_email : package.pickup_merchant_email
                    })
                    await Box.findOne({where : {id:selectFreeBox.id}}).then((item)=>{
                        item.update({
                            status : "USED"
                        })
                    })
                    res.send(result)
                }else{
                    console.log("ALERT, ERROR HOST",result)
                    res.send(result)
                }
            }}    
        )
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

const payGetQr = async(req,res)=>{
    const url = "https://api-portal.multidaya.id/payment-gateway/v1/general-payment/order"
    const lockers = await Locker.findOne()
    const storeNumber = stringGenerator(13)
    const data = {
        "token":config.merchant.token,
        "tid":lockers.id,
        "mid":config.merchant.id,
        "provider":config.merchant.provider,
        "method":"get-qr",
        "amount":req.body.amount,
        "reff_no":storeNumber,
        "partner_callback_url":"http//niaagustin.co.id/callback"
    }
    console.log(data.partner_callback_url)
    const getQr = hitgetQr(url, data)
    getQr.then(async (result) =>{
        console.log(result)
        if(result == undefined){

        }else{
            if(result.response.code == 200){
                result.data.token = config.merchant.token
                res.send({
                    "response" : result.response,
                    "data" : result.data
                })
            }else{
                console.log("ALERT, ERROR HOST",result)
                res.send({
                        "response" : result.response,
                        "data" : result.data
                })
            }
        }
    })
}

const checkQrStatus = async(req,res)=>{
    const url = "https://api-portal.multidaya.id/payment-gateway/v1/general-payment/status"
    const data = req.body
    const checkQrStatus = hitCheckPaymentStatus(url, data)
    checkQrStatus.then(async (result) =>{
        console.log(result)
        if(result.response.code == 200 && result.data.status == "PAID"){
            res.send({
                "response" : result.response,
                "data" : {
                    "status" : result.data.status,
                    "trx_id" : result.data.trx_id,
                    "trx_type" : result.data.trx_type
                }
            })
        }else{
            res.send({
                "response" : result.response,
                "data" : result.data
            })
        }
    })
}

module.exports = {
    cekTarif,
    cekAsuransi,
    listKelurahan,
    pickUpRequest,
    payGetQr,
    checkQrStatus
}