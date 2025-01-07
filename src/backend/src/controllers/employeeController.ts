import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandlerWrapper";

import Employee, { IEmployee } from "../models/Employee";
import Device from "../models/Device";
import License from "../models/License";

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
      assignedLicenses,
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

    if (assignedDevices.length) {
      await Promise.all(
        assignedDevices.map((deviceId: string) =>
          Device.findOne({ deviceId }, { assignedTo: employeeId }),
        ),
      );
    }

    if (assignedLicenses.length) {
      await Promise.all(
        assignedLicenses.map((licenseId: string) =>
          License.findOne({ licenseId }, { assignedTo: employeeId }),
        ),
      );
    }

    const savedEmployee = await newEmployee.save();
    res.status(201).json({ status: "success", data: { savedEmployee } });
  },
);

// PATCH or PUT /api/employees/:employeeId
export const updateEmployee = asyncHandler(
  async (req: Request, res: Response) => {
    const { employeeId } = req.params;
    const { assignedDevices = [], assignedLicenses = [], ...rest } = req.body;

    const oldEmployee = await Employee.findOne({ employeeId });
    if (!oldEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const oldDeviceIds = oldEmployee.assignedDevices || [];
    const oldLicenseIds = oldEmployee.assignedLicenses || [];

    if (rest.employeeName) oldEmployee.employeeName = rest.employeeName;
    if (rest.department) oldEmployee.department = rest.department;
    if (rest.location) oldEmployee.location = rest.location;
    if (rest.role) oldEmployee.role = rest.role;

    oldEmployee.assignedDevices = assignedDevices;
    oldEmployee.assignedLicenses = assignedLicenses;

    await oldEmployee.save();

    const removedDeviceIds = oldDeviceIds.filter(
      (id) => !assignedDevices.includes(id),
    );
    if (removedDeviceIds.length) {
      await Promise.all(
        removedDeviceIds.map((devId) =>
          Device.findOneAndUpdate({ deviceId: devId }, { assignedTo: null }),
        ),
      );
    }

    if (assignedDevices) {
      const addedDeviceIds = assignedDevices.filter(
        (id: string) => !oldDeviceIds.includes(id),
      );
      if (addedDeviceIds.length) {
        await Promise.all(
          addedDeviceIds.map((devId: string) =>
            Device.findOneAndUpdate(
              { deviceId: devId },
              { assignedTo: employeeId },
            ),
          ),
        );
      }
    }

    // 8) Similarly for licenses:
    const removedLicenseIds = oldLicenseIds.filter(
      (id) => !assignedLicenses.includes(id),
    );
    if (removedLicenseIds.length) {
      await Promise.all(
        removedLicenseIds.map((licId) =>
          License.findOneAndUpdate({ licenseId: licId }, { assignedTo: null }),
        ),
      );
    }

    if (assignedLicenses) {
      const addedLicenseIds = assignedLicenses.filter(
        (id: string) => !oldLicenseIds.includes(id),
      );
      if (addedLicenseIds.length) {
        await Promise.all(
          addedLicenseIds.map((licId: string) =>
            License.findOneAndUpdate(
              { licenseId: licId },
              { assignedTo: employeeId },
            ),
          ),
        );
      }
    }

    return res.json({
      status: "success",
      data: { updatedEmployee: oldEmployee },
    });
  },
);

export const deleteEmployee = asyncHandler(
  async (req: Request, res: Response) => {
    const { employeeId } = req.params;

    // 1) Find the employee
    const employee = await Employee.findOne({ employeeId });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // 2) Unassign the devices
    await Device.updateMany({ employeeId }, { $set: { assignedTo: null } });

    // 3) Unassign the licenses
    await License.updateMany({ employeeId }, { $set: { assignedTo: null } });

    // 4) Delete the employee doc
    const deletedEmployee = await Employee.findOneAndDelete({ employeeId });

    if (!deletedEmployee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  },
);
