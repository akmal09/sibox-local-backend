const express = require("express")
const {
    getPackageNumber,
    saveDropPackage,
    courierLogin
} = require("../controllers/courierController");

const {
    takenPackage
} = require("../controllers/customerController")

const {
    syncPackage
} = require("../controllers/packageController")

const router = express.Router();

router.post("/sync-package", syncPackage);

router.post("/courier-check-package", getPackageNumber);
router.post("/courier-login", courierLogin);
router.post("/save-drop-package", saveDropPackage);
router.post("/take-package", takenPackage);


router.post("/user-take-package", takenPackage);

module.exports = {
    routes : router
}