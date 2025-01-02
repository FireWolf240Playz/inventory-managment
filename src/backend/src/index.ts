// src/backend/index.ts
import express from "express";
import dotenv from "dotenv";
import deviceRoutes from "./routes/deviceRoutes";
import employeeRoutes from "./routes/employeeRoutes";
import licenseRoutes from "./routes/licenseRoutes";

import helmet from "helmet";
import connectDB from "./config/db";
import rateLimit from "express-rate-limit";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());

app.use(helmet());

app.use(mongoSanitize());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use(limiter);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// Routes
app.use("/api/devices", deviceRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/licenses", licenseRoutes);

// Health Check Endpoint
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
