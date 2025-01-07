import { Request, Response } from "express";
import Device, { IDevice } from "../models/Device";
import { asyncHandler } from "../utils/asyncHandlerWrapper";
import Employee from "../models/Employee";

export const getAllDevices = asyncHandler(
  async (req: Request, res: Response) => {
    const devices = await Device.find().lean();
    res.status(200).json({
      status: "success",
      results: devices.length,
      data: {
        devices,
      },
    });
  },
);

export const getOneDevice = asyncHandler(
  async (req: Request, res: Response) => {
    const { deviceId } = req.params;

    const device: IDevice | null = await Device.findOne({ deviceId });
    res.status(200).json({
      status: "success",
      data: {
        device,
      },
    });
  },
);

export const createDevice = asyncHandler(
  async (req: Request, res: Response) => {
    const { deviceId, model, assignedTo, status, department } = req.body;

    const newDevice = new Device({
      deviceId,
      model,
      assignedTo,
      status,
      department,
    });
    const savedDevice = await newDevice.save();
    res.status(200).json({
      status: "success",
      data: {
        savedDevice,
      },
    });
  },
);

export const updateDevice = asyncHandler(
  async (req: Request, res: Response) => {
    const { deviceId } = req.params;
    const updateData = req.body;

    const updatedDevice = await Device.findOneAndUpdate(
      { deviceId },
      updateData,
      { new: true, runValidators: true, lean: true },
    );
    if (!updatedDevice) {
      res.status(404).json({ message: "Device not found" });
      return;
    }
    res.status(200).json({
      status: "success",
      data: {
        updatedDevice,
      },
    });
  },
);

export const deleteDevice = asyncHandler(
  async (req: Request, res: Response) => {
    const { deviceId } = req.params;

    await Employee.updateMany(
      { assignedDevices: deviceId },
      { $pull: { assignedDevices: deviceId } },
    );

    const deletedDevice = await Device.findOneAndDelete({ deviceId });

    if (!deletedDevice) {
      res.status(404).json({ message: "Device not found" });
      return;
    }
    res.json({ message: "Device deleted successfully" });
  },
);
