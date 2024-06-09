import mongoose, { Schema } from "mongoose";

const emailSchema = new Schema(
  {
    email: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    sent: { type: Boolean, default: false },
    isRead: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Email = mongoose.model("Email", emailSchema);

export default Email;
