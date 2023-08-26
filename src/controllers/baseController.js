const fs = require("fs");
const https = require("https");
const excelToJson = require("convert-excel-to-json");
const products = require("../data/products.json");
const offers = require("../data/offers.json");
const path = require("path");

const CARDSpath =  path.join(process.cwd(), "src","data", "CARDS.xlsx");
const binJs =  path.join(process.cwd(), "src","services", "bin.js");

class BaseController {
  async UpdateCards(req, res) {
    const url =
      "https://developer-assets.paytm.com/sftp/upload/cmsuploads/Paytm_powered_OTP_Bin_List_59d48f08b7.xlsx";

    https.get(url, (res) => {
      const filePath = fs.createWriteStream(CARDSpath);
      res.pipe(filePath);
      filePath.on("finish", () => {
        filePath.close();
      });
    });
    res.redirect("/convert/xlsxToJson");
  }
  CovertCSV2Json(req, res) {
    ("use strict");
    const result = excelToJson({
      sourceFile: CARDSpath,
      columnToKey: {
        A: "BinNumber",
        B: "Issuing_Bank",
        C: "CardScheme",
        D: "CardType",
      },
    });

    const content = ` const Cards = ${JSON.stringify(
      result.Sheet1
    )} \n module.exports = Cards`;
    fs.writeFileSync(binJs, content);
    res.send("Job Finished")
  }
  getProducts(req, res) {
    res.send({
      products,
      success: true,
    });
  }
  getOffers(req, res) {
    res.send({
      offers,
      success: true,
    });
  }
}
module.exports = new BaseController();
