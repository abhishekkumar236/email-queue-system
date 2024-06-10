import { Queue } from "bullmq";

const emailQueue = new Queue("email", {
  connection: {
    host: "127.0.0.1",
    port: 6379,
  },
  // removeOnComplete: true,
});

export default emailQueue;
