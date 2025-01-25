import { Device } from "../../store/slices/devices/deviceSlice";
import { getDevices } from "../../services/apiDevices.ts";
import { useGroupedData } from "./useGroupedData";

function groupDevicesByDepartment(devices: Device[]) {
  const departmentMap: Record<string, number> = {};

  devices.forEach((device) => {
    const dept = device.department || "Not assigned";
    departmentMap[dept] = (departmentMap[dept] || 0) + 1;
  });

  return Object.entries(departmentMap).map(([dept, count]) => ({
    label: dept,
    value: count,
  }));
}

export function useDevicesByDepartment() {
  return useGroupedData<Device>(getDevices, groupDevicesByDepartment);
}
