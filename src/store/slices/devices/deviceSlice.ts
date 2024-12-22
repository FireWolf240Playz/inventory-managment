import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Device {
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
  },
});
export const { setDevices, setFilter, clearFilters } = deviceSlice.actions;
export default deviceSlice.reducer;
