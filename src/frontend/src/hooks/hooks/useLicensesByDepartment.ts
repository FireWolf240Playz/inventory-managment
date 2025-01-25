import { License } from "../../store/slices/licenses/licensesSlice.ts";
import { useGroupedData } from "./useGroupedData.ts";
import { getLicenses } from "../../services/apiLicenses.ts";

function groupLicensesByDepartment(licenses: License[]) {
  const departmentMap: Record<string, number> = {};
  licenses.forEach((license) => {
    const dept = license.department || "Not assigned";
    departmentMap[dept] = (departmentMap[dept] || 0) + 1;
  });

  return Object.entries(departmentMap).map(([dept, count]) => ({
    label: dept,
    value: count,
  }));
}

export function useLicensesByDepartment() {
  return useGroupedData<License>(getLicenses, groupLicensesByDepartment);
}
