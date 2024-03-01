import { Router } from "express";
import { check } from "express-validator";
import { businessExists, impactLevelExists, categoryExists } from "../helpers/db-validator.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { businessPOST } from "./business.controller.js";

const router = Router();


router.post(
    "/",
    [
        validarJWT,
        check("name", "The name can't be empity").not().isEmpty(),
        check("name").custom(businessExists),
        check("impactLevel").custom(impactLevelExists),
        check("yearsOfExperience", "Must be numeric").isNumeric(),
        check("category").custom(categoryExists),
        validarCampos,
    ],
    businessPOST
);

export default router;