import { Router } from "express";
import { check } from "express-validator";
import {
  businessExists,
  businessExistsID,
  categoryExists,
  impactLevelExists,
} from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import {
  businessGET,
  businessPOST,
  businessPUT,
} from "./business.controller.js";

const router = Router();

router.post(
  "/",
  [
    validarJWT,
    check("name", "The name can't be empty").not().isEmpty(),
    check("name").custom(businessExists),
    check("impactLevel").custom(impactLevelExists),
    check("yearsOfExperience", "Must be numeric").isNumeric(),
    check("category").custom(categoryExists),
    validarCampos,
  ],
  businessPOST
);

router.get("/:order", [validarJWT, validarCampos], businessGET);
// Para cuando no le manden el orden
router.get("/", [validarJWT, validarCampos], businessGET);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "Invalid id").isMongoId(),
    check("id").custom(businessExistsID),

    validarCampos,
  ],
  businessPUT
);

export default router;
