import Email from "../models/email.model.js";
import emailQueue from "../queue/producer.js";
import { emailSchema } from "../validators/validators.js";

async function sendMail(req, res) {
  try {
    const { email, subject, body, time } = req.body;

    if (!emailSchema.safeParse(req.body).success) {
      return res
        .status(400)
        .json({ message: "Invalid email or subject or body" });
    }

    const emailData = new Email({ email, subject, body });

    const result = await emailData.save();

    const jobId = `email-${Date.now()}`;
    const delay = new Date(time) - new Date(); // Calculate delay from the current time

    await emailQueue.add(jobId, { email, subject, body }, { delay });

    res.status(201).json({ message: "Email is scheduled for sending" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "Internal Server Error" });
  }
}

export { sendMail };
