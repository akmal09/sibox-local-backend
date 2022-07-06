const {Model, DataTypes} = require("sequelize");
const sequelize = require("../database/dbconfig");

class Box extends Model {}

Box.init(
    {
        id:{
            type : DataTypes.STRING,
            primaryKey : true
        },
        delete_flag:{
            type : DataTypes.INTEGER
        },
        number :{
            type : DataTypes.INTEGER
        },
        number_in_cabinet:{
            type : DataTypes.INTEGER
        },
        overdue_price:{
            type : DataTypes.BIGINT
        },
        status:{
            type : DataTypes.STRING
        },
        sync_flag:{
            type : DataTypes.INTEGER
        },
        use_price:{
            type : DataTypes.BIGINT
        },
        modules_id:{
            type : DataTypes.STRING
        },
        box_type_id:{
            type : DataTypes.STRING
        },
        open_order:{
            type : DataTypes.INTEGER
        }        
    },
    {
        sequelize,
        modelName: "boxes",
        timestamps : true
    }
);

module.exports = Box;