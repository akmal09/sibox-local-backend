const { default: axios } = require("axios")
const { hitApi } = require("../helper/api_helper")
const responseData = require("../helper/response")
const Package = require("../models/Package")

const url = "http://127.0.0.1:8000/locker/sync/transaction"

var syncProcess = 1
var responFinalValue = ""
var isBroke = false
const syncPackage = async(req,res)=>{
    const syncFlagOnes = await Package.findAll({where:{
        sync_flag:0
    }})
    
    for(var i = 0; i<syncFlagOnes.length; i++){
        var res = hitApi(url, syncFlagOnes[i])
        res.then(function(result){
            if(result.response.code != 200){
                isBroke = true
            }
        })

        if(isBroke == true){
            break;
            responFinalValue =`There is Error Data, please re-sync again`
        }else{
            await Package.findOne({where : { package_number : syncFlagOnes[i].package_number }}).then((item) => {
                item.update({
                    sync_flag : 1
                })
            })
            syncProcess = syncProcess + 1
            responFinalValue = `${syncProcess} data has been sync`
        }
    }

    if(isBroke == true){
    }else{
    }
    
    console.log(responFinalValue)
}

module.exports = {
    syncPackage
}