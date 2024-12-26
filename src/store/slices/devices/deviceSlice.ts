import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { duplicateEntity } from "../entityUtils.ts";

export interface Device {
  deviceId: string;
  model: string;
  assignedTo: string | null;
  status: 0 | 1 | 2;
  department: string;
}
export interface DeviceState {
  devices: Device[];
  filters: {
    deviceId?: string;
    model?: string;
    status?: string;
    department?: string;
    assignedTo?: string;
  };
}
interface UpdateDeviceStatusPayload {
  deviceIds: string[] | null;
  status: 0 | 1 | 2;
}

export const statusMap: Record<string, number> = {
  available: 0,
  "in-use": 1,
  "under-maintenance": 2,
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
        key: keyof DeviceState["filters"];
        value: string;
      }>,
    ) {
      const { key, value } = action.payload;
      state.filters[key] = value === "all" ? undefined : value;
    },

    clearFilters(state) {
      state.filters = {};
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
  },
});
export const {
  setDevices,
  setFilter,
  clearFilters,
  deleteDevice,
  duplicateDevice,
  updateDeviceStatus,
} = deviceSlice.actions;
export default deviceSlice.reducer;
