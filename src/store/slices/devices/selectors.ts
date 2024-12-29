import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store.ts";
import { Device } from "./deviceSlice.ts";
// Base selectors
export const selectDevices = (state: RootState) => state.devices.devices;
export const selectDeviceFilters = (state: RootState) => state.devices.filters;

// Filtered devices selector
export const selectFilteredDevices = createSelector(
  [selectDevices, selectDeviceFilters],
  (devices, filters) => {
    return devices.filter((device) => {
      // 1) deviceId filter
      if (filters.deviceId && filters.deviceId.length > 0) {
        if (!filters.deviceId.includes(device.deviceId)) return false;
      }

      // 2) model filter
      if (filters.model && filters.model.length > 0) {
        if (!filters.model.includes(device.model)) return false;
      }

      // 3) department filter
      if (filters.department && filters.department.length > 0) {
        if (!filters.department.includes(device.department)) return false;
      }

      // 4) assignedTo filter
      if (filters.assignedTo && filters.assignedTo.length > 0) {
        const assigned = device.assignedTo ?? "Unassigned";
        if (!filters.assignedTo.includes(assigned)) return false;
      }

      // 5) status filter
      if (filters.status && filters.status.length > 0) {
        const statusAsString = device.status.toString(); // e.g. "0", "1", or "2"
        if (!filters.status.includes(statusAsString)) return false;
      }
      // if we passed all checks, keep the device
      return true;
    });
  },
);

// Derived options for filters
export const selectDepartmentOptions = createSelector(
  [selectDevices],
  (devices) =>
    Array.from(new Set(devices.map((d) => d.department))).map((dept) => ({
      value: dept,
      label: dept,
    })),
);

export const selectIdOptions = createSelector([selectDevices], (devices) =>
  devices.map((d) => ({
    value: d.deviceId,
    label: d.deviceId,
  })),
);

export const selectStatusOptions = () => [
  { value: "all", label: "All", statusCode: null }, // Use null for "all"
  { value: "available", label: "Available", statusCode: 0 },
  { value: "in-use", label: "In Use", statusCode: 1 },
  { value: "under-maintenance", label: "Under Maintenance", statusCode: 2 },
];

export const selectModelOptions = createSelector([selectDevices], (devices) =>
  Array.from(new Set(devices.map((d) => d.model))).map((model) => ({
    value: model,
    label: model,
  })),
);

export const selectAssignedToOptions = createSelector(
  [selectDevices],
  (devices) =>
    Array.from(new Set(devices.map((d) => d.assignedTo || "Unassigned"))).map(
      (user) => ({
        value: user,
        label: user,
      }),
    ),
);

export const selectAvailableDevices = createSelector(
  [selectDevices],
  (devices) =>
    devices
      .filter((device) => device.status === 0)
      .map((device) => ({
        value: device.deviceId,
        label: `${device.model} (${device.deviceId})`,
      })),
);

export const selectDevicesInUse = createSelector([selectDevices], (devices) =>
  devices.filter((device) => device.status === 1),
);

export const selectDevicesUnderMaintenance = createSelector(
  [selectDevices],
  (devices) => devices.filter((device) => device.status === 2),
);

export const findDeviceById = (id: string) =>
  createSelector([selectDevices], (devices) =>
    devices.find((device) => device.deviceId === id),
  );

export const selectDevicesMap = createSelector(
  [(state: RootState) => state.devices.devices],
  (devices) => {
    const map: Record<string, Device> = {};
    devices.forEach((d) => {
      map[d.deviceId] = d;
    });
    return map;
  },
);
