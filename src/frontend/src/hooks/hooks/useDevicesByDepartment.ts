import { useState, useEffect } from "react";
import { getDevices } from "../../services/apiDevices.ts";
import { Device } from "../../store/slices/devices/deviceSlice.ts";

interface DeptDeviceCount {
  department: string;
  devices: number;
}

export function useDevicesByDepartment() {
  const [data, setData] = useState<DeptDeviceCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDevices() {
      try {
        setIsLoading(true);
        const allDevices: Device[] = await getDevices();
        const grouped = groupDevicesByDepartment(allDevices);
        setData(grouped);
      } catch {
        setError("Failed to fetch or group devices");
      } finally {
        setIsLoading(false);
      }
    }
    fetchDevices();
  }, []);

  return { data, isLoading, error };
}

function groupDevicesByDepartment(devices: Device[]): DeptDeviceCount[] {
  const departmentMap: Record<string, number> = {};

  devices.forEach((device) => {
    const dept = device.department || "Not assigned";
    if (!departmentMap[dept]) {
      departmentMap[dept] = 1;
    } else {
      departmentMap[dept]++;
    }
  });

  return Object.entries(departmentMap).map(([department, count]) => ({
    department,
    devices: count,
  }));
}
