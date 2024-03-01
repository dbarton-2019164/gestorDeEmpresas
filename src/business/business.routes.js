import { Router } from "express";
import { check } from "express-validator";
//import {  } from "../helpers/db-validator.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarCampos } from "../middlewares/validar-campos.js";
//import {  } from "./admin.controller.js";

const router = Router();



export default router;