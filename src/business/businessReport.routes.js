import { Router } from "express";

import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { businessReportGET } from "./business.controller.js";

const router = Router();

router.get("/", [validarJWT, validarCampos], businessReportGET);

export default router;
