const { hitApi } = require("../helper/api_helper")
const Box = require("../models/Box")
const Locker = require("../models/Locker")

const initLocker = async(req,res)=>{
    const url = "http://127.0.0.1:8000/locker/init/config"
    dataLocker = {}
    dataLocker.lockers_id = req.body.lockers_id

    // console.log(dataLocker)

    const lockersData = hitApi(url, dataLocker)
    lockersData.then(async(result)=>{
        if(result.response.code == 200){
            const lockers = {
                id : result.data.id,
                currency_unit : result.data.currency_unit,
                delete_flag : result.data.delete_flag,
                name : result.data.name,
                locker_code : result.data.locker_code,
                sync_flag : result.data.sync_flag,
                validate_type : result.data.validate_type,
                free_days : result.data.free_days,
                free_hours : result.data.free_hours ,
                overdue_type : result.data.overdue_type,
                receipt_no : result.data.receipt_no
            }
            // console.log(result)
            await Locker.create(lockers).then(()=>{
                res.redirect(307,`init-box/${result.data.id}`)
            })
        }else{
            res.send({status:401})
        }
    })
}

const initBox = async(req,res)=>{
    const url = "http://127.0.0.1:8000/locker/init/box"
    // hitApi(url, dataBox)
    const dataLocker = {lockers_id : req.params.id_lockers}
    console.log("inibox",req.params.id_lockers)
    const getBox = hitApi(url, dataLocker)
    var totalBox = 1

    getBox.then((results)=>{
        console.log(results)
        results.data.map(async(result) => {
            console.log(result)
            const boxes = {
                id: result.id,
                delete_flag: 0,
                number: result.number,
                number_in_cabinet: result.number_in_cabinet,
                overdue_price: result.overdue_price,
                status: result.status,
                sync_flag: 0,
                use_price: result.use_price,
                modules_id: result.modules_id,
                box_types_id: result.box_types_id,
                open_order: result.open_order
            }
            await Box.create(boxes).then(()=>{
                totalBox += 1
            })
        })
    })

    // const dataBox = setTimeOut(async()=>{
    //     await Box.findAll()
    // }, 7000)
    const dataBox = await Box.findAll()
    await res.send({
        response : `${totalBox} box inserted`,
        data : dataBox
    })
}

module.exports = {
    initBox,
    initLocker
}