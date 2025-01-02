import mongoose, { Schema, Document } from "mongoose";

export interface IDevice extends Document {
  deviceId: string;
  modelName: string;
  assignedTo: string | null;
  status: 0 | 1 | 2;
  department: string;
}

const DeviceSchema: Schema = new Schema(
  {
    deviceId: { type: String, required: true, unique: true },
    model: { type: String, required: true },
    assignedTo: { type: String, default: null },
    status: { type: Number, enum: [0, 1, 2], default: 0 },
    department: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IDevice>("Device", DeviceSchema);
