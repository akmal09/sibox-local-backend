const express = require("express")
const {
    getPackageNumber
} = require("../controllers/machineController.js");

const {
    courierLogin
} = require("../controllers/courierController.js")

const router = express.Router();

router.post("/package", getPackageNumber);

router.post("/courier-login", courierLogin);

module.exports = {
    routes : router
}