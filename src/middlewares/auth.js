import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

async function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedData = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodedData.id);

    if (!user) {
      return res.status(403).json({ message: "No user found" });
    }

    req.user = decodedData;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
