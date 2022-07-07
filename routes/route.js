const express = require("express")
const {
    getPackageNumber
} = require("../controllers/machineController.js");

const router = express.Router();

router.post("/package", getPackageNumber);

module.exports = {
    routes : router
}