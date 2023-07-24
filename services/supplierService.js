const db = require('../entities/index');
const MerchandiseModel = db.merchandise;
const SupplierModel = db.supplier;
const { json } = require('body-parser');

const createSupplierData = async (req, res) => {
    const { partnerName, partnerType, city, state, creditBalance, drivingLicenseNumber } = req.body;

    var data = await MerchandiseModel.create({ partnerName, partnerType, city, state });
    if (data && data.partnerId) {
        await SupplierModel.create({
            creditBalance, drivingLicenseNumber,
            MerchandisePartnerId: data.partnerId
        })
            .then(async () => {
                if (data) res.json({ message: "Thanks for registering" });
            }).catch((err) => {
                console.log("Error: ", err);
                res.status(500).json({ error: "Cannot register user at the moment!" });
            });
    }
}

const getSupplierData = async (req, res) => {
    const Data = await MerchandiseModel.findAll({
        attributes: [
            "partnerId", "partnerName", "partnerType", "city", "State"],
        include: [{
            model: SupplierModel,
            attributes: ["creditBalance", "drivingLicenseNumber"]
        }],
        where: { partnerType: "supplier" }

    })
    res.status(200).json({ supplierData: Data })
}

const singleSupplierDetails = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json(failureResponse("Unable to find id in request"));
    }

    const result = await MerchandiseModel.findOne({
        where: { partnerId: id, partnerType: "supplier" },
        attributes: [
            "partnerId", "partnerName", "partnerType", "city", "State"],
        include: [{
            model: SupplierModel,
            attributes: ["creditBalance", "drivingLicenseNumber"]
        }],
    })
        .then((result) => {
            res.status(200).json({ supplierData: result })
        }).catch(() => {
            res.status(500).json(("Something went wrong"));
        });
}

const SupplierDataUpdate = async (req, res) => {
    const { id } = req.params;
    const { partnerName, partnerType, city, state, creditBalance, drivingLicenseNumber } = req.body;

    if (!id) {
        return res.status(400).json({ error: "Unable to find id in request" });
    }

    try {
        const updatedMerchandise = await MerchandiseModel.update(
            { partnerName, partnerType, city, state },
            { where: { partnerId: id } }
        );

        if (updatedMerchandise[0] > 0) { // Check if any rows were affected by the update
            await SupplierModel.update(
                { creditBalance, drivingLicenseNumber },
                { where: { MerchandisePartnerId: id } }
            );
            res.json({ message: "Record Updated" });
        } else {
            res.status(404).json({ error: "Partner not found" });
        }
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({ error: "Cannot register user at the moment!" });
    }
};


const deleteSupplierDetails = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json(failureResponse("Unable to find id in request"));
    }

    const result = await MerchandiseModel.destroy({
        where: { partnerId: id, partnerType: "supplier" },
        include: [{
            model: SupplierModel,
            attributes: ["id", "creditBalance", "drivingLicenseNumber"]
        }],

    }).then((result) => {
        res.status(200).json({ supplierData: result })
    }).catch(() => {
        res.status(500).json(("Something went wrong"));
    });
}

module.exports = {
    createSupplierData,
    getSupplierData,
    singleSupplierDetails,
    deleteSupplierDetails,
    SupplierDataUpdate
}