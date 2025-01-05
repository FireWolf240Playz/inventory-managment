import { Device } from "../store/slices/devices/deviceSlice.ts";

import api from "./api.ts";

export async function getDevices(): Promise<Device[]> {
  const response = await api.get("/devices");
  return response.data.data.devices;
}

export async function getDevice(id: string): Promise<Device> {
  const response = await api.get(`/devices/${id}`);
  return response.data.data.device;
}

export async function createDevice(device: Device): Promise<void> {
  await api.post("/devices", device);
}

export async function editDevice(device: Device): Promise<void> {
  await api.put(`/devices/${device.deviceId}`, device);
}

export async function deleteDevice(id: string): Promise<void> {
  const response = await api.delete(`/devices/${id}`);
  return response.data;
}
