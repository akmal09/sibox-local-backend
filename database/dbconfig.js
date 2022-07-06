if(process.env.NODE_ENV == "production"){
    require('dotenv').config()
    dbname = process.env.DBNAME
}else{
    dbname = "debug"
}

const { Sequelize } = require("sequelize")

const sequelize = new Sequelize("test-db", "user", "pass",{
    dialect: "sqlite",
    host: `./${dbname}.sqlite`
});

module.exports = sequelize;