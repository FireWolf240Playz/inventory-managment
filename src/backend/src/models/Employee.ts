import mongoose, { Schema, Document } from "mongoose";

export interface IEmployee extends Document {
  employeeId: string;
  employeeName: string;
  department: string;
  assignedDevices: string[] | null;
  location: string;
  role: string[];
}

const EmployeeSchema: Schema = new Schema(
  {
    employeeId: { type: String, required: true, unique: true },
    employeeName: { type: String, required: true },
    department: { type: String, required: true },
    assignedDevices: [{ type: String }],
    location: { type: String, required: true },
    role: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IEmployee>("Employee", EmployeeSchema);
