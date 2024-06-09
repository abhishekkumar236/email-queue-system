import User from "../models/user.model.js";
import { loginSchema, signupSchema } from "../validators/validators.js";
import { genAccessToken, genRefreshToken } from "../utils/utils.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function signup(req, res) {
  try {
    const data = req.body;

    if (!signupSchema.safeParse(data).success) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const userExist = await User.exists({ email: data.email });

    if (userExist) {
      return res.status(409).json({ error: "User already exist" });
    }

    const user = await User.create({
      ...data,
      password: bcrypt.hashSync(data.password, 10),
    });

    if (!newUser) {
      return res.status(201).json({ message: "Something went wrong" });
    }

    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Internal Server Error" });
  }
}

async function login(req, res) {
  try {
    const data = req.body;

    if (!loginSchema.safeParse(data).success) {
      return res.status(400).json({ error: "Invalid data" });
    }

    const userExist = await User.findOne({ email: data.email });

    if (!userExist) {
      return res.status(404).json({ error: "User not found" });
    }

    const matchPassword = bcrypt.compareSync(data.password, userExist.password);

    if (!matchPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = await genAccessToken({ id: userExist._id });
    const refreshToken = await genRefreshToken({ id: userExist._id });

    userExist.refreshToken = refreshToken;
    await userExist.save();

    return res.status(200).json({
      message: "User logged in successfully",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error.message, message: "Internal Server Error" });
  }
}

async function refreshAccessToken(req, res) {
  try {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedData = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const decodedDataId = decodedData.id;
    const user = await User.findById(decodedDataId);

    if (!user) {
      return res.status(403).json({ message: "No user found" });
    }

    if (user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Refresh token is expired" });
    }

    const accessToken = await genAccessToken({ id: user._id });

    return res
      .status(200)
      .json({ accessToken, message: "Access token refresher successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "Internal Server Error" });
  }
}

export { signup, login };
