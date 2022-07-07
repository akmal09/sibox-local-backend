const express = require("express")
const {
    getPackageNumber,
    saveDropPackage
} = require("../controllers/machineController.js");

const {
    courierLogin
} = require("../controllers/courierController.js")

const router = express.Router();

router.post("/package", getPackageNumber);
router.post("/courier-login", courierLogin);
router.post("/save-package", saveDropPackage);

module.exports = {
    routes : router
}