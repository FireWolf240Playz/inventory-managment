import { Request, Response } from "express";
import Employee, { IEmployee } from "../models/Employee";
import Device from "../models/Device";
import { asyncHandler } from "../utils/asyncHandlerWrapper";
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

    // 1) Find the old employee
    const oldEmployee = await Employee.findOne({ employeeId });
    if (!oldEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // 2) Extract old arrays
    const oldDeviceIds = oldEmployee.assignedDevices || [];
    const oldLicenseIds = oldEmployee.assignedLicenses || [];

    // 3) Update the employee doc (besides assigned devices & licenses)
    // If you want partial updates, do something like:
    if (rest.employeeName) oldEmployee.employeeName = rest.employeeName;
    if (rest.department) oldEmployee.department = rest.department;
    if (rest.location) oldEmployee.location = rest.location;
    if (rest.role) oldEmployee.role = rest.role;

    // 4) Overwrite the assigned arrays with the new ones
    oldEmployee.assignedDevices = assignedDevices;
    oldEmployee.assignedLicenses = assignedLicenses;

    // 5) Save the updated employee
    await oldEmployee.save();

    // 6) For devices that were in old but not in new => unassign them
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

    // 7) For devices that are new => assign them
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
    if (employee.assignedDevices?.length) {
      await Promise.all(
        employee.assignedDevices.map((devId) =>
          Device.findOneAndUpdate({ deviceId: devId }, { assignedTo: null }),
        ),
      );
    }

    // 3) Unassign the licenses
    if (employee.assignedLicenses?.length) {
      await Promise.all(
        employee.assignedLicenses.map((licId) =>
          License.findOneAndUpdate({ licenseId: licId }, { assignedTo: null }),
        ),
      );
    }

    // 4) Delete the employee doc
    await Employee.deleteOne({ employeeId });

    return res.json({ message: "Employee deleted successfully" });
  },
);
