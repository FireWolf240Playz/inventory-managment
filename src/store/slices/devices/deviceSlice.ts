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
