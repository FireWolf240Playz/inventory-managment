import mongoose from "mongoose";
import fs from "fs";
import Device from "../models/Device";
import Employee from "../models/Employee";
import License from "../models/License";

// 1) Load environment variables

(async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://FireWolfBG:lainotoBG123@cluster0.4unoh.mongodb.net/",
    );
    console.log("Connected to DB via data loader.");
  } catch (error) {
    console.error("DB connection error in data loader:", error);
  }
})();

// 2) Load your JSON data
const devices = JSON.parse(
  fs.readFileSync(`${__dirname}/devices.json`, "utf-8"),
);
const employees = JSON.parse(
  fs.readFileSync(`${__dirname}/employees.json`, "utf-8"),
);
const licenses = JSON.parse(
  fs.readFileSync(`${__dirname}/licenses.json`, "utf-8"),
);
// etc.

// 3) Import or Delete data
const importData = async () => {
  try {
    await Device.create(devices);
    await Employee.create(employees);
    await License.create(licenses);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Device.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
