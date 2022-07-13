const Package = require("./models/Package");
const Locker = require("./models/Locker");
const Box = require("./models/Box");
const TransactionRecord = require("./models/TransactionRecord")


// ALERT MIGRATION
const sequelize = require("./database/dbconfig")
sequelize.sync({ force: true})