import { Router } from "express";
import { sendMail } from "../controllers/email.controller.js";

const router = Router();

router.route("/set-email").post(sendMail);

export default router;
