import Email from "../models/email.model.js";
import { sendMail } from "../utils/utils.js";

async function sendMail(req, res) {
  try {
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "Internal Server Error" });
  }
}
