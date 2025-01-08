import express from "express";

import { body } from "express-validator";
import {
  registerUsers,
  loginUser,
  getAllUsers,
} from "../controllers/usersController";

const router = express.Router();

router.get("/users", getAllUsers);

router.post("/register", registerUsers, [
  body("name").isString().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match."),
]);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email must be valid."),
    body("password").isString().notEmpty().withMessage("Password is required."),
  ],
  loginUser,
);

export default router;
