const { default: axios } = require("axios")
const { hitApi } = require("../helper/api_helper")
const responseData = require("../helper/response")
const Package = require("../models/Package")

const url = "http://127.0.0.1:8000/locker/sync/transaction"

var syncProcess = 0
var responFinalValue = ""
var isBroke = false
const syncPackage = async(req,res)=>{
    const syncFlagZeros = await Package.findAll({where:{
        sync_flag:0
    }})

    // console.log(syncFlagZeros.length)
    if(syncFlagZeros.length == 0){
        responFinalValue =`All Data has synced`
    }else{
        for(var i = 0; i<syncFlagZeros.length; i++){
            // console.log(`data ke ${[i]}`, syncFlagZeros[i].last_modified_time)
            var res = hitApi(url, syncFlagZeros[i])
            res.then(function(result){
                console.log(result)
                if(result.response.code != 200){
                    isBroke = true
                }
            })
    
            if(isBroke == true){
                responFinalValue =`There is Error Data, please re-sync again`
                break;
            }else{
                await Package.findOne({where : { package_number : syncFlagZeros[i].package_number }}).then((item) => {
                    item.update({
                        sync_flag : 1
                    })
                })
                syncProcess = syncProcess + 1
            }
        }
        responFinalValue = `${syncProcess} data has been sync`
    }
    console.log(responFinalValue)
}

module.exports = {
    syncPackage
}