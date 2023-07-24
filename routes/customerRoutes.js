const {
    createCustomerData,
    getCustomerData,
    singleCustomerDetails,
    deleteCustomerDetails,
    CustomerDataUpdate
}=require('../services/customerService');

const router = require('express').Router();

router.post("/",createCustomerData)
router.get("/",getCustomerData)
router.get("/:id", singleCustomerDetails);
router.delete("/:id", deleteCustomerDetails);
router.patch("/:id", CustomerDataUpdate);

module.exports = router;