import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/User.js";

function createToken(_id) {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ msg: "All fields must be filled." });

    const user = await userModel.findOne({ username });
    if (!user) return res.status(404).json({ msg: "Username not found." });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ msg: "Password is incorrect." });
    res
      .status(200)
      .json({
        token: createToken(user._id),
        _id: user._id,
        username: user.username,
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;
    const foundUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (foundUser) {
      if (foundUser.email === email)
        return res.status(409).json({ msg: "Email is already taken." });
      if (foundUser.username === username)
        return res.status(409).json({ msg: "Username is already taken." });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      username,
      password: hash,
    });
    res.status(201).json({
      token: createToken(user._id),
      _id: user._id,
      username: user.username,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
