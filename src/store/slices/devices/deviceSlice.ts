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

const initialState: DeviceState = {
  devices: [],
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
  },
});
export const {
  setDevices,
  setFilter,
  clearFilters,
  deleteDevice,
  duplicateDevice,
} = deviceSlice.actions;
export default deviceSlice.reducer;
