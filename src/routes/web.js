const router = require("express").Router();
const BaseController = require("../controllers/baseController");
const Payment = require("../controllers/payment");

router.get("/boot", (req,res)=> res.send("Server is Up 👍 - API DEVLOPED BY ENJOY"));
router.get("/update-bin/", BaseController.UpdateCards);
router.get("/convert/xlsxToJson", BaseController.CovertCSV2Json);
router.post("/payment", Payment.Init);
router.get("/get-products", BaseController.getProducts);
router.get("/offers", BaseController.getOffers);

module.exports = router;
