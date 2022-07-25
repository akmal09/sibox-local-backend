const stringGenerator = (length)=>{
    var val_code = ""
    var char = 'ABCDEFGHJKMNOPQRSTUVWXYZ23456789'
    var charLength = char.length
    for(var i =0; i<length; i++){
        val_code += char.charAt(Math.floor(Math.random() * charLength))
    }

    return val_code
}

const create_UUID = ()=>{
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

module.exports = {
    stringGenerator,
    create_UUID
}