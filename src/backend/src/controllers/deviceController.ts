import { Request, Response } from "express";
import Device, { IDevice } from "../models/Device";
import { asyncHandler } from "../utils/asyncHandlerWrapper";

export const getAllDevices = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const devices: IDevice[] = await Device.find();
      res.status(200).json({
        status: "success",
        results: devices.length,
        data: {
          devices,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  },
);

export const getOneDevice = asyncHandler(
  async (req: Request, res: Response) => {
    const { deviceId } = req.params;
    try {
      const device: IDevice | null = await Device.findOne({ deviceId });
      res.status(200).json({
        status: "success",
        data: {
          device,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  },
);

export const createDevice = asyncHandler(
  async (req: Request, res: Response) => {
    const { deviceId, model, assignedTo, status, department } = req.body;

    try {
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
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
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

    try {
      const deletedDevice = await Device.findOneAndDelete({ deviceId });

      if (!deletedDevice) {
        res.status(404).json({ message: "Device not found" });
        return;
      }
      res.json({ message: "Device deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },
);
