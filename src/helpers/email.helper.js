const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "bhs106.truehost.cloud",
  port: 465,
  auth: {
    user: "support@compacthydro.co.ke",
    pass: "#operationhydrate2022",
  },
});

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "compacthydro2@gmail.com",
//     pass: "#Compact2022%",
//   },
// });

const send = (info) => {
  return new Promise(async (resolve, reject) => {
    try {
      // send mail with defined transport object
      let result = await transporter.sendMail(info);

      console.log("Message sent: %s", result.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

      resolve(result);
    } catch (error) {
      console.log(error);
    }
  });
};

const emailProcessor = ({ email, pin, type, verificationLink = "" }) => {
  let info = "";
  switch (type) {
    case "request-new-password":
      info = {
        from: '"Compact Hydro" <support@compacthydro.co.ke>', // sender address
        to: email, // list of receivers
        subject: "Password rest Pin", // Subject line
        text:
          "Here is your password rest pin" +
          pin +
          " This pin will expires in 1day", // plain text body
        html: `<b>Hello </b>
      Here is your pin 
      <b>${pin} </b>
      This pin will expires in 1day
      <p></p>`, // html body
      };

      send(info);
      break;

    case "update-password-success":
      info = {
        from: '"Compact Hydro" <support@compacthydro.co.ke>', // sender address
        to: email, // list of receivers
        subject: "Password updated", // Subject line
        text: "Your new password has been update", // plain text body
        html: `<b>Hello </b>
       
      <p>Your new password has been update</p>`, // html body
      };

      send(info);
      break;

    case "new-user-confirmation-required":
      info = {
        from: '"Compact Hydro" <support@compacthydro.co.ke>', // sender address
        to: email, // list of receivers
        subject: "Please verify your new user", // Subject line
        text: "Please follow the link to very your account before you can login", // plain text body
        html: `<b>Hello </b>
        <p>Please follow the link to very your account before you can login</p>
        <p>${verificationLink}</P>
        `, // html body
      };

      send(info);
      break;

    default:
      break;
  }
};

module.exports = { emailProcessor };
