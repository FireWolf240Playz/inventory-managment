import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { asyncHandler } from "../utils/asyncHandlerWrapper";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users: IUser[] = await User.find();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: { users },
  });
});

export const registerUsers = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(401).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  },
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ message: "Invalid credentials" });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const jwtSecret = process.env.JWT_SECRET || "default_secret_key";
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }

  const token = jwt.sign({ id: user._id }, jwtSecret, {
    expiresIn: "1h",
  });

  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email },
  });
});

export const authenticateUser = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next?: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "No token, authorization denied" });
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
      };
      req.user = { id: decoded.id };
      if (next) next();
    } catch {
      res.status(401).json({ message: "Invalid token" });
      return;
    }
  },
);
