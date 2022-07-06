const { Model, DataTypes } = require("sequelize");
// const { FOREIGNKEYS } = require("sequelize/types/query-types");
const sequelize = require("../database/dbconfig");

class Package extends Model {}

Package.init(
    {
            id:{
                type : DataTypes.STRING,
                primaryKey : true
            },
            e_commerces_id:{
                type : DataTypes.STRING,
                allowNull:true
            },
            logistics_id:{
                type: DataTypes.STRING
            },
            customer_store_number:{
                type: DataTypes.STRING
            },
            package_number:{
                type: DataTypes.STRING
            },
            package_type:{
                type: DataTypes.STRING
            },
            overdue_time:{
                type: DataTypes.STRING
            },
            lockers_id:{
                type: DataTypes.STRING
            },
            boxes_id:{
                type: DataTypes.STRING,
                unique: true
            },
            status:{
                type: DataTypes.STRING
            },
            sync_flag:{
                type: DataTypes.INTEGER
            },
            weight:{
                type: DataTypes.BIGINT
            },
            take_time:{
                type: DataTypes.BIGINT
            }, //stiing->format(time)
            store_time:{
                type: DataTypes.BIGINT
            }, //stiing->format(time)
            take_user_id:{
                type: DataTypes.STRING
            },
            store_user_id:{
                type: DataTypes.STRING
            },
            take_user_name:{
                type: DataTypes.STRING
            },
            store_user_name:{
                type: DataTypes.STRING
            },
            staff_taken_user:{
                type: DataTypes.STRING
            },
            recipient_name:{
                type: DataTypes.STRING
            },
            recipient_user_phone_number:{
                type: DataTypes.STRING
            },
            courier_id:{
                type: DataTypes.STRING
            },
            start_address:{
                type: DataTypes.STRING
            },
            end_address:{
                type: DataTypes.STRING
            },
            validate_code:{
                type: DataTypes.CHAR(6)
            }
    },
    {
        sequelize,
        modelName: "packages",
        timestamps : true
    }
);

module.exports = Package;