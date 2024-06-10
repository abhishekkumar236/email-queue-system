import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import emailRouter from "./routes/email.routes.js";
import { sendMail } from "./utils/utils.js";
import { Worker } from "bullmq";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/", userRouter);
app.use("/api/v1/", emailRouter);

const worker = new Worker(
  "email",
  async (job) => {
    try {
      const res = await sendMail(
        job.data.email,
        job.data.subject,
        job.data.body
      );
      console.log(res);
    } catch (error) {
      console.error(`Job ${job.id} failed with ${error.message}`);
    }
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  }
);

worker.on("completed", async (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed with ${err.message}`);
});

export { app };
