import express from "express";
import { body, param } from "express-validator";

import {
  getAllEmployees,
  getOneEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController";

const router = express.Router();

router.get("/", getAllEmployees);

router.get(
  "/:employeeId",
  [
    param("employeeId")
      .isString()
      .notEmpty()
      .withMessage("employeeId must be a non-empty string"),
  ],
  getOneEmployee,
);

router.post(
  "/",
  [
    body("employeeId")
      .isString()
      .notEmpty()
      .withMessage("employeeId must be a non-empty string"),
    body("employeeName")
      .isString()
      .notEmpty()
      .withMessage("employeeName must be a non-empty string"),
    body("department")
      .isString()
      .notEmpty()
      .withMessage("departmentName must be a non-empty string"),
    body("assignedDevices")
      .isString()
      .notEmpty()
      .withMessage("assignedDevices must be a non-empty string"),
    body("location")
      .isString()
      .notEmpty()
      .withMessage("location must be a non-empty string"),
    body("role")
      .isString()
      .notEmpty()
      .withMessage("role must be a non-empty string"),
  ],
  createEmployee,
);

router.put(
  "/:employeeId",
  [
    param("employeeId")
      .isString()
      .notEmpty()
      .withMessage("employeeId must be a non-empty string"),
    body("employeeName")
      .optional()
      .isString()
      .withMessage("licenseName must be a string"),
    body("department")
      .optional()
      .notEmpty()
      .withMessage("departmentName must be a non-empty string"),
    body("assignedDevices")
      .optional()
      .isString()
      .withMessage("assignedDevices must be a non-empty string"),
    body("location")
      .optional()
      .isString()
      .withMessage("location must be a non-empty string"),
    body("role")
      .optional()
      .isString()
      .withMessage("role must be a non-empty string"),
  ],
  updateEmployee,
);

router.delete(
  "/:employeeId",
  [
    param("employeeId")
      .isString()
      .notEmpty()
      .withMessage("employeeId must be a non-empty string"),
  ],

  deleteEmployee,
);

export default router;
