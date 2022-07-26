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
            package_number:{
                type: DataTypes.STRING,
                allowNull:true
            },
            pickup_request_date:{
                type: DataTypes.DATE,
                allowNull:false
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
            }, //stiing->format(time)
            store_time:{
                type: DataTypes.INTEGER,
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
            recipient_address:{
                type: DataTypes.STRING,
                allowNull:false
            },
            recipient_district:{
                type: DataTypes.STRING,
                allowNull:false
            },
            recipient_sub_district:{
                type: DataTypes.STRING,
                allowNull:false
            },
            recipient_city:{
                type: DataTypes.STRING,
                allowNull:false
            },
            recipient_province:{
                type: DataTypes.STRING,
                allowNull:false
            },
            shipper_disrict:{
                type: DataTypes.STRING,
                allowNull:false
            },
            shipper_city:{
                type: DataTypes.STRING,
                allowNull:false
            },
            shipper_province:{
                type: DataTypes.STRING,
                allowNull:false
            },
            shipper_zipcode:{
                type: DataTypes.STRING,
                allowNull:false
            },
            courier_id:{
                type: DataTypes.STRING,
                allowNull:true
            },
            destination_code:{
                type: DataTypes.STRING,
                allowNull:false
            },
            tarif:{
                type: DataTypes.STRING,
                allowNull:false
            },
            origin_code:{
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
                type: DataTypes.CHAR(6),
                allowNull:false
            },
            insurance:{
                type: DataTypes.STRING,
                allowNull:false
            },
            notes:{
                type: DataTypes.STRING,
                allowNull:false
            },
            delivery_type:{
                type: DataTypes.STRING,
                allowNull:false
            },
            parcel_category:{
                type: DataTypes.STRING,
                allowNull:false
            },
            parcel_content:{
                type: DataTypes.STRING,
                allowNull:false
            },
            parcel_value:{
                type: DataTypes.STRING,
                allowNull:false
            },
            pickup_merchant_code:{
                type: DataTypes.STRING,
                allowNull:true
            },
            pickup_merchant_name:{
                type: DataTypes.STRING,
                allowNull:true
            },
            pickup_merchant_phone:{
                type: DataTypes.STRING,
                allowNull:true
            },
            pickup_merchant_email:{
                type: DataTypes.STRING,
                allowNull:true
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
