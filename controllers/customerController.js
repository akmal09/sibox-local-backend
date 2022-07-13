const axios = require("axios");
const responseData = require("../helper/response");
const Package = require("../models/Package");

const takenPackage = async(req, res)=>{
    const findPackage = await Package.findOne({where:{validate_code : req.body.validate_code}})
    console.log(findPackage)
    const current = new Date()

    if(findPackage == null){
        res.send({response:401})
    }else{
        // update package
        await Package.findOne({where:{validate_code : req.body.validate_code}}).then((item) => {
            item.update({
                  take_time : current.toString(),
                  status : "Collected",                  
            })
        })

        responseData.responseData.code = 200
        responseData.responseData.latency = 0
        responseData.responseData.message = "Package Available"
        res.send({
            response: responseData.responseData,
            data:await Package.findOne({where:{validate_code : req.body.validate_code}})
        })
    }    
};

const saveTakenPackage = async(req, res)=>{
    const packageTaken = req.body
    const package = {
        id:packageTaken.id,
        e_commerces_id:packageTaken.e_commerces_id,
        logistics_id:packageTaken.logistics_id,
        customer_store_number:packageTaken.customer_store_number,
        package_number:packageTaken.package_number,
        package_type:packageTaken.package_type,
        overdue_time:packageTaken.overdue_time,
        lockers_id:packageTaken.lockers_id,
        boxes_id:packageTaken.boxes_id,
        status:packageTaken.status,
        sync_flag:packageTaken.sync_flag,
        weight:packageTaken.weight,
        take_time:packageTaken.take_time,
        store_time:packageTaken.store_time,
        take_user_id:packageTaken.take_user_id,
        store_user_id:packageTaken.store_user_id,
        take_user_name:packageTaken.take_user_name,
        store_user_name:packageTaken.store_user_name,
        staff_taken_user:packageTaken.staff_taken_user,
        recipient_name:packageTaken.recipient_name,
        recipient_user_phone_number:packageTaken.recipient_user_phone_number,
        courier_id:packageTaken.courier_id,
        start_address:packageTaken.start_address,
        end_address:packageTaken.end_address,
        validate_code:packageTaken.validate_code,
        import_time:packageTaken.import_time
    };

    await Package.create(package).then(()=>{
        res.send({status:201})
    })
};

module.exports={
    takenPackage,
    saveTakenPackage
}