const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,           
    pass: process.env.EMAIL_PASSWORD,  
  },
});

const sendEmail = async (sendto, subject, text, html) => {
  try {
    await transporter.sendMail({
      from: `"Movie Booking" <${process.env.EMAIL}>`, // ✅ from (not form)
      to: sendto,
      subject,
      text,
      html,
    });

    console.log("✅ Email sent to:", sendto);
  } catch (error) {
    console.error("❌ Email error:", error.message);
    throw error;
  }
};

module.exports = { sendEmail };
