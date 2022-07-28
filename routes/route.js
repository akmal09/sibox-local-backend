const express = require("express")
const {
    getPackageNumber,
    saveDropPackage,
    courierLogin,
    getCourierData
} = require("../controllers/courierController");

const {
    takenPackage
} = require("../controllers/customerController")

const {
    syncPackage
} = require("../controllers/packageController")

const {
    initLocker, 
    initBox,
    emptyBox
} = require("../controllers/machineController")

const{
    cekTarif, cekAsuransi, listKelurahan, pickUpRequest, payGetQr, checkQrStatus
} = require("../controllers/thirdApiController")

const router = express.Router();

function middleware(req, res, next){
    next()
}

router.post("/sync-package", syncPackage);

router.post("/courier-check-package", getPackageNumber);
router.post("/courier-login", courierLogin);
router.post("/save-drop-package", saveDropPackage);

router.post("/user-take-package", takenPackage);

router.post("/init-locker",initLocker)
router.post("/init-box/:id_lockers", middleware, initBox)
router.post("/empty-box", emptyBox)

router.post("/cek-tarif", cekTarif)
router.post("/cek-asuransi", cekAsuransi)

router.post("/list-kelurahan", listKelurahan)
router.post("/pickup-request", pickUpRequest)
router.post("/courier-data", getCourierData)
router.post("/get-qr", payGetQr)
router.post("/check-qr-status", checkQrStatus)


module.exports = {
    routes : router
}