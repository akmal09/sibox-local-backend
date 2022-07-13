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
                allowNull:false
            },
            customer_store_number:{
                type: DataTypes.STRING,
                allowNull:false
            },
            package_number:{
                type: DataTypes.STRING,
                allowNull:false
            },
            package_type:{
                type: DataTypes.STRING,
                allowNull:false
            },
            overdue_time:{
                type: DataTypes.STRING,
                allowNull:false
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
                type: DataTypes.TIME,
                allowNull:true
            }, //stiing->format(time)
            store_time:{
                type: DataTypes.TIME,
                allowNull:false
            }, //stiing->format(time)
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
            staff_taken_user:{
                type: DataTypes.STRING,
                allowNull:true
            },
            recipient_name:{
                type: DataTypes.STRING,
                allowNull:false
            },
            recipient_user_phone_number:{
                type: DataTypes.STRING,
                allowNull:false
            },
            courier_id:{
                type: DataTypes.STRING,
                allowNull:false
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
                type: DataTypes.CHAR(8),
                allowNull:false
            },
            last_modified_time:{
                type: DataTypes.STRING,
                allowNull:true
            },
            import_time:{
                type :"TIMESTAMP",
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
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
