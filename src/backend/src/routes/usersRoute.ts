import express from "express";
import { getAllUsers, updateUser } from "../controllers/usersController";
import { authenticateUser } from "../controllers/usersController";
import { upload } from "../utils/multerConfig";

const router = express.Router();

router.get("/users", getAllUsers);

router.patch("/account", authenticateUser, upload.single("avatar"), updateUser);

export default router;
