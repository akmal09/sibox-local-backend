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
        packages_status : {
            type : DataTypes.STRING,
            allowNull : false
        }
    },
    {
        sequelize,
        modelName: "package_checkouts",
        timestamps: true
    }
);

module.exports = PackageCheckOut;