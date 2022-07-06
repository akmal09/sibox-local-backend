const { Model, DataTypes } = require("sequelize");
const sequelize = require("./../database/dbconfig");

class Locker extends Model {}

Locker.init(
    {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        currency_unit : {
            type : DataTypes.STRING
        },
        delete_flag : {
            type : DataTypes.INTEGER
        },
        name : {
            type : DataTypes.STRING
        },
        locker_code : {
            type : DataTypes.STRING
        },
        sync_flag : {
            type : DataTypes.STRING
        },
        validate_type : {
            type : DataTypes.STRING
        },
        free_days : {
            type : DataTypes.INTEGER
        },
        free_hours : {
            type : DataTypes.INTEGER
        },
        overdue_type : {
            type : DataTypes.STRING
        },
        receipt_no : {
            type : DataTypes.BIGINT
        }
    },
    {
        sequelize,
        modelName: "lockers",
        timestamps: true
    }
);

module.exports = Locker;