const { Model, DataTypes, Sequelize } = require("sequelize");
// const { FOREIGNKEYS } = require("sequelize/types/query-types");
const sequelize = require("../database/dbconfig");

class Package extends Model {}

Package.init(
    {
            id:{
                type : DataTypes.STRING,
                primaryKey : true,
                unique: true
            },
            e_commerces_id:{
                type : DataTypes.STRING,
                allowNull:true
            },
            logistics_id:{
                type: DataTypes.STRING,
                allowNull:true
            },
            customer_store_number:{
                type: DataTypes.STRING,
                allowNull:true
            },
            trx_id:{
                type: DataTypes.STRING,
                allowNull:true
            },
            package_number:{
                type: DataTypes.STRING,
                allowNull:true
            },
            
            package_type:{
                type: DataTypes.STRING,
                allowNull:false
            },
            overdue_time:{
                type: DataTypes.STRING,
                allowNull:true
            },
            lockers_id:{
                type: DataTypes.STRING,
                allowNull:false
            },
            boxes_id:{
                type: DataTypes.STRING,
                allowNull:false
            },
            status:{
                type: DataTypes.STRING,
                allowNull:false
            },
            sync_flag:{
                type: DataTypes.INTEGER,
                allowNull:false
            },
            weight:{
                type: DataTypes.INTEGER,
                allowNull:false
            },
            take_time:{
                type: DataTypes.INTEGER,
                allowNull:true
            }, 
            store_time:{
                type: DataTypes.INTEGER,
                allowNull:false
            }, 
            take_user_id:{
                type: DataTypes.STRING,
                allowNull:true
            },
            store_user_id:{
                type: DataTypes.STRING,
                allowNull:false
            },
            take_user_name:{
                type: DataTypes.STRING,
                allowNull:true
            },
            store_user_name:{
                type: DataTypes.STRING,
                allowNull:false
            },
            store_user_phone:{
                type: DataTypes.STRING,
                allowNull:false
            },
            staff_taken_user:{
                type: DataTypes.STRING,
                allowNull:true
            },
            recipient_name:{
                type: DataTypes.STRING,
                allowNull:false
            },
            recipient_phone_number:{
                type: DataTypes.STRING,
                allowNull:false
            },
            
            courier_id:{
                type: DataTypes.STRING,
                allowNull:true
            },
            
            start_address:{
                type: DataTypes.STRING,
                allowNull:false
            },
            end_address:{
                type: DataTypes.STRING,
                allowNull:false
            },
            validate_code:{
                type: DataTypes.CHAR(6),
                allowNull:false
                },
            import_time:{
                type :"TIMESTAMP",
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                allowNull:true
            },
            last_modified_time:{
                type: DataTypes.STRING,
                allowNull:true
            }
        },
    {
        sequelize,
        modelName: "packages",
        timestamps : true
    }
);

module.exports = Package;
