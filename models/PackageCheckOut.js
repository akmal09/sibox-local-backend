const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/dbconfig");

class PackageCheckOut extends Model {}

PackageCheckOut.init(
    {
        id : {
            type : DataTypes.STRING,
            primaryKey : true
        },
        packages_id : {
            type : DataTypes.STRING,
            allowNull : false
        },
        airway_bill : {
            type : DataTypes.STRING,
            allowNull : false
        },
        ref_id : {
            type : DataTypes.STRING,
            allowNull : false
        },
        pickup_request_date:{
            type: DataTypes.DATE,
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
        }
    },
    {
        sequelize,
        modelName: "package_checkouts",
        timestamps: true
    }
);

module.exports = PackageCheckOut;