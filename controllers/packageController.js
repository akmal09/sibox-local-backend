const { default: axios } = require("axios")
const { useCLS } = require("sequelize")
const { hitApi, isBrokeResponse } = require("../helper/api_helper")
const responseData = require("../helper/response")
const Package = require("../models/Package")

const url = "http://127.0.0.1:8000/locker/sync/transaction"

var responFinalValue = ""
const syncPackage = async(req,res)=>{
    const syncFlagZeros = await Package.findAll({where:{
        sync_flag:0
    }})

    console.log(syncFlagZeros.length)
    if(syncFlagZeros.length == 0){
        responFinalValue =`All Data has synced`
    }else{
        syncFlagZeros.map((syncFlagZero)=>{
            var res = hitApi(url, syncFlagZero)
            console.log(syncFlagZero)
            res.then(async (result) =>{
                if(result.response.code == 200){
                    console.log(syncFlagZero.package_number)
                    await Package.findOne({where : { package_number : syncFlagZero.package_number }}).then((item) => {
                        item.update({
                            sync_flag : 1
                        })
                    })
                }else{
                    console.log("ALERT, ERROR HOST",result)
                }
            })
        })
    }
}

module.exports = {
    syncPackage
}