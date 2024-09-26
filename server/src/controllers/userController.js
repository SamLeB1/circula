import userModel from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ msg: "User not found." });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
