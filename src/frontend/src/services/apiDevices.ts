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

export async function createDevice(device: Device): Promise<Device> {
  const response = await api.post("/devices", device);

  return response.data;
}
