const sequelize = require("./database/dbconfig")

sequelize.sync({ force: true})