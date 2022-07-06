const express = require("express")
const {
    getPackageNumber
} = require("../controllers/machineController.js");

const router = express.Router();

router.get("/package", getPackageNumber);

module.exports = {
    routes : router
}