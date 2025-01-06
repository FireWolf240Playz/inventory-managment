import mongoose, { Schema, Document } from "mongoose";

export interface IEmployee extends Document {
  employeeId: string;
  employeeName: string;
  department: string;
  assignedDevices: string[] | null;
  assignedLicenses: string[] | null;
  location: string;
  role: string[];
}

const EmployeeSchema: Schema = new Schema(
  {
    employeeId: { type: String, required: true, unique: true },
    employeeName: { type: String, required: true },
    department: { type: String, required: true },
    assignedDevices: [{ type: String }],
    assignedLicenses: [{ type: String, required: false, default: null }],
    location: { type: String, required: true },
    role: [{ type: String, required: true }],
  },
  {
    timestamps: true,
    collection: "employees",
  },
);

export default mongoose.model<IEmployee>("employees", EmployeeSchema);
