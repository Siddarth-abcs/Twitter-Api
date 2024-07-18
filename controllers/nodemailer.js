const nodemailer = require("nodemailer");
const { json } = require("stream/consumers");

const transporter = nodemailer.createTransport({
  port: 465,
  service: "gmail",
  // You can change this to 465 or 25 if needed // Use `true` for port 465, `false` for other ports
  auth: {
    user: "siddarthabcs@gmail.com",
    pass: "vvru sgdw klvg ylud",
  },
});

function generateFourDigitOTP() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

exports.otpverify = async (req, res) => {
  const otp = generateFourDigitOTP();

  const receiversemail = JSON.stringify(req.params.email);
  console.log(receiversemail);

  try {
    const info = await transporter.sendMail({
      from: "siddarthabcs@gmail.com", // sender address
      to: receiversemail, // list of receivers
      subject: "OTP Verification", // Subject line
      text: `Your OTP is ${otp}`, // plain text body
      html: `<b>Your OTP is ${otp}</b>`, // html body
    });

    res.send({ otp });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
