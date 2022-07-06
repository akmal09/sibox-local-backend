const { Model, DataTypes } = require("sequelize");
// const { FOREIGNKEYS } = require("sequelize/types/query-types");
const sequelize = require("../database/dbconfig");

class Box extends Model {}

Box.init(
    {
        id:{
            type : DataTypes.STRING,
            primaryKey : true
        },
        default_overdue_price:{
            type : DataTypes.BIGINT

        },
        default_use_price:{
            type : DataTypes.BIGINT
        },
        name:{
            type : DataTypes.STRING,
        }
    },
    {
        sequelize,
        modelName : "box_types",
        timestamps : true
    }
    )