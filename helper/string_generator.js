const stringGenerator = (length)=>{
    var val_code = ""
    // var char = 'abcdefghjklmnopqrstuvwxyz23456789'
    var char = '23456789'

    var charLength = char.length
    for(var i =0; i<length; i++){
        val_code += char.charAt(Math.floor(Math.random() * charLength))
    }

    return val_code
}

module.exports = {
    stringGenerator
}