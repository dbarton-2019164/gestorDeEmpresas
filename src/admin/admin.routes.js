import { Router } from "express";
import { check } from "express-validator";
import { emailExists } from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { loginUsers, registerUser } from "./admin.controller.js";

const router = Router();

router.post(
  "/",
  [
    check("name", "The name can't be empty").not().isEmpty(),
    check("email", "Invalid email").isEmail(),
    check("email").custom(emailExists),
    check("password", "Must be at least 6 characters").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  registerUser
);

router.get(
  "/",
  [
    check("email", "Invalid email").isEmail(),
    // check("email").custom(userExists),
    validarCampos,
  ],
  loginUsers
);

export default router;
