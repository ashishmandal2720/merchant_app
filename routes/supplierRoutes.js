const {
    createSupplierData,
    getSupplierData,
    singleSupplierDetails,
    deleteSupplierDetails,
    SupplierDataUpdate
}=require('../services/supplierService');

const router = require('express').Router();

router.post("/",createSupplierData)
router.get("/",getSupplierData)
router.get("/:id", singleSupplierDetails);
router.delete("/:id", deleteSupplierDetails);
router.patch("/:id", SupplierDataUpdate);

module.exports = router;