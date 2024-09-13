import jwt from "jsonwebtoken";
import userModel from "../models/User.js";

export default async function (req, res, next) {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).json({ msg: "Authorization token required." });

  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await userModel.findById(_id);
    next();
  } catch (err) {
    res.status(401).json(err);
  }
}
