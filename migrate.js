const Package = require("./models/Package");
const Locker = require("./models/Locker");
const Box = require("./models/Box");
const TransactionRecord = require("./models/TransactionRecord")
const BoxType = require("./models/BoxType");
const PackageCheckOut = require("./models/PackageCheckOut");

// ALERT MIGRATION
const sequelize = require("./database/dbconfig");
sequelize.sync({ force: true})


Package.hasOne(PackageCheckOut, {foreignKey: "packages_id"})
PackageCheckOut.belongsTo(Package, {foreignKey: "packages_id"})