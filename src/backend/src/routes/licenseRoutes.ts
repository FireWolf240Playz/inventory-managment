import express from "express";
import { body, param } from "express-validator";
import {
  getAllLicenses,
  getOneLicense,
  createLicense,
  updateLicense,
  deleteLicense,
} from "../controllers/licenseController";

const router = express.Router();

router.get("/", getAllLicenses);

router.get(
  "/:licenseId",
  [
    param("licenseId")
      .isString()
      .notEmpty()
      .withMessage("licenseId must be a non-empty string"),
  ],

  getOneLicense,
);

router.post(
  "/",
  [
    body("licenseId")
      .isString()
      .notEmpty()
      .withMessage("licenseId is required and must be a string"),
    body("licenseName")
      .isString()
      .notEmpty()
      .withMessage("licenseName is required and must be a string"),
    body("type")
      .isIn(["Subscription", "Perpetual"])
      .withMessage("type must be either 'Subscription' or 'Perpetual'"),
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
    body("description")
      .optional()
      .isString()
      .withMessage("description must be a string if provided"),
  ],
  createLicense,
);

router.put(
  "/:licenseId",
  [
    param("licenseId")
      .isString()
      .notEmpty()
      .withMessage("licenseId must be a non-empty string"),
    body("licenseName")
      .optional()
      .isString()
      .withMessage("licenseName must be a string"),
    body("type")
      .optional()
      .isIn(["Subscription", "Perpetual"])
      .withMessage("type must be either 'Subscription' or 'Perpetual'"),
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
    body("description")
      .optional()
      .isString()
      .withMessage("description must be a string if provided"),
  ],
  updateLicense,
);

router.delete(
  "/:licenseId",
  [
    param("licenseId")
      .isString()
      .notEmpty()
      .withMessage("licenseId must be a non-empty string"),
  ],
  deleteLicense,
);

export default router;
