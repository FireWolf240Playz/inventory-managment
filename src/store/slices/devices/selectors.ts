import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store.ts";

// Base selectors
export const selectDevices = (state: RootState) => state.devices.devices;
export const selectDeviceFilters = (state: RootState) => state.devices.filters;

// Filtered devices selector
export const selectFilteredDevices = createSelector(
  [selectDevices, selectDeviceFilters],
  (devices, filters) => {
    return devices.filter((device) => {
      if (filters.deviceId && device.deviceId !== filters.deviceId)
        return false;
      if (filters.model && device.model !== filters.model) return false;
      if (
        filters.status &&
        filters.status !== "all" &&
        `${device.status}` !== filters.status
      )
        return false;
      if (filters.department && device.department !== filters.department)
        return false;
      return !(
        filters.assignedTo &&
        filters.assignedTo !== (device.assignedTo || "Unassigned")
      );
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
