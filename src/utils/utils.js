import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

async function genAccessToken(payload) {
  const token = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  return token;
}

async function genRefreshToken(payload) {
  const token = await jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return token;
}

async function sendMail(email, subject, body) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.PORTMAIL,
      secure: false,
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject: subject,
      text: body,
    };

    const info = await transporter.sendMail(mailOptions);
    return info ? true : false;
  } catch (error) {
    throw new Error(error);
  }
}

export { genAccessToken, genRefreshToken, sendMail };
