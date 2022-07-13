const { BIGINT } = require("sequelize");
const { Model, DataTypes, Sequelize} = require("sequelize");

const sequelize = require("../database/dbconfig");

class TransactionRecord extends Model {}

TransactionRecord.init(
    {
        id:{
            type : DataTypes.STRING,
            primaryKey : true,
            unique: true
        },
        amount:{
            type:DataTypes.BIGINT
        },
        payment_type:{
            type:DataTypes.STRING
        },
        transaction_type:{
            type:DataTypes.STRING
        },
        package_id:{
            type:DataTypes.STRING
        },
        box_id:{
            type:DataTypes.STRING
        },    
    },
    {
        sequelize,
        modelName: "transaction_records",
        timestamps : true
    }
);

module.exports = TransactionRecord;