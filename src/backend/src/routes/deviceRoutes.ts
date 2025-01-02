import express from "express";
import { body, param } from "express-validator";
import {
  getAllDevices,
  getOneDevice,
  createDevice,
  updateDevice,
  deleteDevice,
} from "../controllers/deviceController";

const router = express.Router();

router.get("/", getAllDevices);

router.get(
  "/:deviceId",
  [
    param("deviceId")
      .isString()
      .notEmpty()
      .withMessage("deviceId must be a non-empty string"),
  ],

  getOneDevice,
);

router.post(
  "/",
  [
    body("deviceId")
      .isString()
      .notEmpty()
      .withMessage("deviceId is required and must be a string"),
    body("modelName")
      .isString()
      .notEmpty()
      .withMessage("modelName is required and must be a string"),
    body("status")
      .isInt({ min: 0, max: 2 })
      .withMessage("status must be an integer between 0 and 2"),
    body("department")
      .isString()
      .notEmpty()
      .withMessage("department is required and must be a string"),
    body("assignedTo")
      .optional()
      .isString()
      .withMessage("assignedTo must be a string if provided"),
  ],

  createDevice,
);

router.put(
  "/:deviceId",
  [
    param("deviceId")
      .isString()
      .notEmpty()
      .withMessage("deviceId must be a non-empty string"),
    body("modelName")
      .optional()
      .isString()
      .withMessage("modelName must be a string"),
    body("status")
      .optional()
      .isInt({ min: 0, max: 2 })
      .withMessage("status must be an integer between 0 and 2"),
    body("department")
      .optional()
      .isString()
      .withMessage("department must be a string"),
    body("assignedTo")
      .optional()
      .isString()
      .withMessage("assignedTo must be a string if provided"),
  ],

  updateDevice,
);

router.delete(
  "/:deviceId",
  [
    param("deviceId")
      .isString()
      .notEmpty()
      .withMessage("deviceId must be a non-empty string"),
  ],

  deleteDevice,
);

export default router;
