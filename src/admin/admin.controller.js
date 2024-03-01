import bcryptjs from "bcryptjs";
import { generateJWT } from "../helpers/generate-jwt.js";
import adminModel from "./admin.model.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new adminModel({ name, email, password });
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUsers = async (req, res) => {
  const { email, password } = req.body;

  const user = await adminModel.findOne({ email: email });
  if (!user) {
    return res.status(400).json({
      msg: "The user was not found",
    });
  }
  const acces = bcryptjs.compareSync(password, user.password);
  if (!acces) {
    return res.status(400).json({ msg: "Incorrect password" });
  }
  const token = await generateJWT(user.id);
  res.status(200).json({
    msg: "Acceso concedido",
    token,
  });
};
