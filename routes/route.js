const express = require("express")
const {
    getPackage
} = require("../controllers/machineController.js");

const router = express.Router();

router.get("/package", getPackage);

module.exports = {
    routes : router
}