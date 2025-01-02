import mongoose, { Schema, Document } from "mongoose";

export interface ILicense extends Document {
  licenseId: string;
  licenseName: string;
  type: "Subscription" | "Perpetual";
  assignedTo: string | null;
  status: 0 | 1 | 2;
  department: string;
  description?: string;
}

const LicenseSchema: Schema = new Schema(
  {
    licenseId: { type: String, required: true, unique: true },
    licenseName: { type: String, required: true },
    type: { type: String, required: true },
    assignedTo: { type: String, default: null },
    status: { type: Number, enum: [0, 1, 2], default: 0 },
    department: { type: String, required: true },
    description: { type: String, default: "" },
  },
  {
    timestamps: true,
    collection: "licenses",
  },
);

export default mongoose.model<ILicense>("licenses", LicenseSchema);
