import { Request, Response } from "express";
import Employee, { IEmployee } from "../models/Employee";
import { asyncHandler } from "../utils/asyncHandlerWrapper";

export const getAllEmployees = asyncHandler(
  async (req: Request, res: Response) => {
    const employees: IEmployee[] = await Employee.find();
    res.status(200).json({
      status: "success",
      results: employees.length,
      data: { employees },
    });
  },
);

export const getOneEmployee = asyncHandler(
  async (req: Request, res: Response) => {
    const { employeeId } = req.params;

    const employee = await Employee.findById({ employeeId });
    res.status(200).json({ status: "success", data: { employee } });
  },
);

export const createEmployee = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      employeeId,
      employeeName,
      department,
      assignedDevices,
      location,
      role,
    } = req.body;

    const newEmployee = new Employee({
      employeeId,
      employeeName,
      department,
      assignedDevices,
      location,
      role,
    });

    const savedEmployee = await newEmployee.save();
    res.status(201).json({ status: "success", data: { savedEmployee } });
  },
);

export const updateEmployee = asyncHandler(
  async (req: Request, res: Response) => {
    const { employeeId } = req.params;
    const updateData = req.body;

    try {
      const updatedEmployee = await Employee.findOneAndUpdate(
        { employeeId },
        updateData,
        { new: true, runValidators: true, lean: true },
      );

      if (!updatedEmployee) {
        res.status(404).json({ message: "Employee not found" });
        return;
      }

      res.json({ status: "success", data: { updatedEmployee } });
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  },
);

export const deleteEmployee = asyncHandler(
  async (req: Request, res: Response) => {
    const { employeeId } = req.params;

    const deletedEmployee = await Employee.findOneAndDelete({ employeeId });

    if (!deletedEmployee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    res.json({ message: "Employee deleted successfully" });
  },
);
