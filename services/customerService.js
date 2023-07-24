const db = require('../entities/index');
const CustomerModel = db.customer;
const MerchandiseModel = db.merchandise;
const { json } = require('body-parser');

const createCustomerData = async(req, res) =>{
    const { partnerName, partnerType, city, state, creditLimit, phoneNumber, email } = req.body;
    
      var data = await MerchandiseModel.create({  partnerName, partnerType, city, state });
      if (data && data.partnerId) {
      await CustomerModel.create({
        creditLimit, phoneNumber, email,
        MerchandisePartnerId: data.partnerId
         })
         .then(async() =>{  
            if (data) res.json({ message: "Thanks for registering" });
        }).catch((err) => {
                console.log("Error: ", err);
                res.status(500).json({ error: "Cannot register user at the moment!" });
            });
    }
}

const getCustomerData = async(req, res) => {
    const Data = await MerchandiseModel.findAll({
        attributes: [
            "partnerId","partnerName", "partnerType", "city", "State"],
            include:[{
                model:CustomerModel,
                attributes:["creditLimit", "phoneNumber", "email"] 
            }],
where:{partnerType:"customer"}
        
    })
    res.status(200).json({CustomerData:Data})
}

const singleCustomerDetails = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json(failureResponse("Unable to find id in request"));
    }
   const result = await MerchandiseModel.findOne({
         where: { partnerId:id, partnerType:"customer" },
            attributes: [
                "partnerId", "partnerName", "partnerType", "city", "State"],
                include:[{
                    model:CustomerModel,
                    attributes:["creditLimit", "phoneNumber", "email"] 
                }],
    })
    .then((result) => {
        res.status(200).json({customerData:result})
    }).catch(() => {
        res.status(500).json(("Something went wrong"));
    });
}

const CustomerDataUpdate = async (req, res) => {
    const { id } = req.params;
    const { partnerName, partnerType, city, state, creditLimit, phoneNumber, email } = req.body;
    if (!id) {
        return res.status(400).json({ error: "Unable to find id in request" });
    }
    try {
        const updatedMerchandise = await MerchandiseModel.update(
            { partnerName, partnerType, city, state },
            { where: { partnerId: id } }
        );
        if (updatedMerchandise[0] > 0) { // Check if any rows were affected by the update
            await CustomerModel.update(
                { creditLimit, phoneNumber, email },
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


const deleteCustomerDetails = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json(("Unable to find id in request"));
    }
    const result = await MerchandiseModel.destroy({
        where: { partnerId: id, partnerType: "customer" },
        include: [{
            model: CustomerModel,
            attributes: ["id","creditLimit", "phoneNumber", "email"]
        }],
    }).then((result) => {
        res.status(200).json({ customerData: result })
    }).catch(() => {
        res.status(500).json(("Something went wrong"));
    });
}


module.exports = {
    createCustomerData,
    getCustomerData,
    singleCustomerDetails,
    CustomerDataUpdate,
    deleteCustomerDetails
}