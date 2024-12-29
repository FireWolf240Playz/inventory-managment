import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { duplicateEntity } from "../entityUtils.ts";

export interface Device {
  deviceId: string;
  model: string;
  assignedTo: string | null;
  status: 0 | 1 | 2;
  department: string;
}

export interface DeviceFilters {
  deviceId?: string | string[];
  model?: string | string[];
  status?: string | string[];
  department?: string | string[];
  assignedTo?: string | string[];
}

export interface DeviceState {
  devices: Device[];
  filters: DeviceFilters;
}

interface ReassignPayload {
  employeeName: string;
  oldDeviceIds: string[];
  newDeviceIds: string[];
}

interface UpdateDeviceStatusPayload {
  deviceIds: string[] | null;
  status: 0 | 1 | 2;
}

export const statusMapToString: Record<number, string> = {
  0: "Available",
  1: "In use",
  2: "Under maintenance",
};

const initialState: DeviceState = {
  devices: [
    {
      deviceId: "1",
      model: "Laptop-123",
      assignedTo: "John Doe",
      status: 1,
      department: "IT",
    },
    {
      deviceId: "2",
      model: "Monitor-456",
      assignedTo: null,
      status: 0,
      department: "HR",
    },
    {
      deviceId: "3",
      model: "Monitor-46",
      assignedTo: null,
      status: 0,
      department: "HR",
    },
    {
      deviceId: "4",
      model: "Monitor-416",
      assignedTo: null,
      status: 0,
      department: "HR",
    },
    {
      deviceId: "5",
      model: "Monitor-346",
      assignedTo: null,
      status: 0,
      department: "HR",
    },
    {
      deviceId: "6",
      model: "Monitor-312",
      assignedTo: null,
      status: 0,
      department: "HR",
    },
    {
      deviceId: "7",
      model: "Monitor-339",
      assignedTo: null,
      status: 0,
      department: "HR",
    },
    {
      deviceId: "8",
      model: "Monitor-290",
      assignedTo: null,
      status: 0,
      department: "HR",
    },
    {
      deviceId: "9",
      model: "Monitor-322",
      assignedTo: null,
      status: 0,
      department: "HR",
    },
    {
      deviceId: "10",
      model: "Monitor-311",
      assignedTo: null,
      status: 0,
      department: "HR",
    },
    {
      deviceId: "11",
      model: "Monitor-349",
      assignedTo: null,
      status: 0,
      department: "HR",
    },
    {
      deviceId: "12",
      model: "Monitor-341",
      assignedTo: null,
      status: 0,
      department: "HR",
    },
    {
      deviceId: "13",
      model: "Monitor-343",
      assignedTo: null,
      status: 0,
      department: "HR",
    },
    {
      deviceId: "14",
      model: "Monitor-326",
      assignedTo: null,
      status: 0,
      department: "HR",
    },
  ],
  filters: {},
};

const deviceSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    setDevices(state, action: PayloadAction<Device[]>) {
      state.devices = action.payload;
    },
    setFilter(
      state,
      action: PayloadAction<{
        key: keyof DeviceFilters;
        value: string | string[];
      }>,
    ) {
      const { key, value } = action.payload;

      if (value === "all" || (Array.isArray(value) && value.length === 0)) {
        state.filters[key] = undefined;
        return;
      }

      state.filters[key] = Array.isArray(value) ? value : [value];
    },

    clearFilters(state) {
      state.filters = {};
    },

    addDevice(state, action: PayloadAction<Device>) {
      state.devices.push(action.payload);
    },

    deleteDevice(state, action: PayloadAction<string>) {
      state.devices = state.devices.filter(
        (device) => device.deviceId !== action.payload,
      );
    },
    duplicateDevice(state, action: PayloadAction<Device>) {
      const duplicatedDevice = duplicateEntity(action.payload) as Device;
      state.devices.push(duplicatedDevice);
    },

    updateDeviceStatus: (
      state,
      action: PayloadAction<UpdateDeviceStatusPayload>,
    ) => {
      const { deviceIds, status } = action.payload;
      state.devices.forEach((device) => {
        if (deviceIds !== null && deviceIds.includes(device.deviceId)) {
          device.status = status;
        }
      });
    },
    updateDevice(state, action: PayloadAction<Device>) {
      const index = state.devices.findIndex(
        (device) => device.deviceId === action.payload.deviceId,
      );

      if (index !== -1) state.devices[index] = action.payload;
    },

    reassignDevicesToEmployee: (
      state,
      action: PayloadAction<ReassignPayload>,
    ) => {
      const { employeeName, oldDeviceIds, newDeviceIds } = action.payload;

      // 1) For devices that were in old but not in new => unassign them
      const removedIds = oldDeviceIds.filter(
        (id) => !newDeviceIds.includes(id),
      );
      removedIds.forEach((id) => {
        const device = state.devices.find((d) => d.deviceId === id);
        if (device) {
          device.assignedTo = null; // or device.status = 0, etc.
        }
      });

      // 2) For devices that are new => assign them
      const addedIds = newDeviceIds.filter((id) => !oldDeviceIds.includes(id));
      addedIds.forEach((id) => {
        const device = state.devices.find((d) => d.deviceId === id);
        if (device) {
          device.assignedTo = employeeName;
        }
      });

      // 3) For devices that remain in both old and new => do nothing
    },
  },
});
export const {
  setDevices,
  setFilter,
  clearFilters,
  addDevice,
  deleteDevice,
  duplicateDevice,
  updateDeviceStatus,
  updateDevice,
  reassignDevicesToEmployee,
} = deviceSlice.actions;
export default deviceSlice.reducer;
