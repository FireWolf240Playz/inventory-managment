import { Request, Response } from "express";

import License, { ILicense } from "../models/License";
import { asyncHandler } from "../utils/asyncHandlerWrapper";

export const getAllLicenses = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const licenses: ILicense[] = await License.find();
      res.status(200).json({
        status: "success",
        results: licenses.length,
        data: { licenses },
      });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  },
);

export const getOneLicense = asyncHandler(
  async (req: Request, res: Response) => {
    const { licenseId } = req.params;
    try {
      const license: ILicense | null = await License.findOne({
        licenseId,
      });

      res.status(200).json({
        status: "success",
        data: {
          license,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  },
);

export const createLicense = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      licenseId,
      licenseName,
      type,
      assignedTo,
      status,
      department,
      description,
    } = req.body;

    try {
      const newLicense = new License({
        licenseId,
        licenseName,
        type,
        assignedTo,
        status,
        department,
        description,
      });
      const savedLicense = await newLicense.save();
      res.status(201).json({ status: "success", data: { savedLicense } });
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  },
);

export const updateLicense = asyncHandler(
  async (req: Request, res: Response) => {
    const { licenseId } = req.params;
    const updateData = req.body;

    const updatedLicense = await License.findOneAndUpdate(
      { licenseId },
      updateData,
      { new: true, runValidators: true, lean: true },
    );

    if (!updatedLicense) {
      res.status(404).json({ message: "License not found" });
      return;
    }

    res.status(200).json({ status: "success", data: { updatedLicense } });
  },
);

export const deleteLicense = asyncHandler(
  async (req: Request, res: Response) => {
    const { licenseId } = req.params;
    const deletedLicense = await License.findOneAndDelete({
      licenseId,
    }).lean();

    if (!deletedLicense) {
      res.status(404).json({ message: "License not found" });
      return;
    }

    res.status(200).json({ message: "License deleted successfully" });
  },
);
