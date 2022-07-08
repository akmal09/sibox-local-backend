const { default: axios } = require("axios")
const response = require("../helper/response")
const Package = require("../models/Package")

function pushPackage(){
    axios("http://127.0.0.1:8000/locker/sync/transaction",{
        method:"POST",
        headers:{
            "Content-Type" : "application/json",
            "x_terminal_id" : "212312",
            "x_token" : "se12jsnpo"
        },
        data:{

        }
    }).then(response => {
        
    })
    .catch(error => console.log(error))
}

const syncPackage = async(req,res)=>{
    const syncFlagOnes = await Package.findAll({where:{
        sync_flag:0
    }})


    syncFlagOnes.map(syncFlagOne => {
        pushPackage()
    })
}

module.exports = {
    syncPackage
}