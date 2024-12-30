import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store.ts";

import { License } from "./licensesSlice.ts";

export const selectLicenses = (state: RootState) => state.licenses.licenses;
export const selectLicenseFilters = (state: RootState) =>
  state.licenses.filters;

export const statusMapToStringLicenses: Record<number, string> = {
  0: "Available",
  1: "In use",
  2: "Expired",
};

export const selectFilteredLicenses = createSelector(
  [selectLicenses, selectLicenseFilters],
  (licenses, filters) => {
    return licenses.filter((license) => {
      // If licenseId is set, only keep if licenseId in array
      if (filters.licenseId && filters.licenseId.length > 0) {
        if (!filters.licenseId.includes(license.licenseId)) return false;
      }

      // licenseName
      if (filters.licenseName && filters.licenseName.length > 0) {
        if (!filters.licenseName.includes(license.licenseName)) return false;
      }

      // type
      if (filters.type && filters.type.length > 0) {
        if (!filters.type.includes(license.type)) return false;
      }

      // assignedTo (if user picks multi or single user?)
      if (filters.assignedTo && filters.assignedTo.length > 0) {
        const currentAssigned = license.assignedTo ?? "Unassigned";
        if (!filters.assignedTo.includes(currentAssigned)) return false;
      }

      // department
      if (filters.department && filters.department.length > 0) {
        if (!filters.department.includes(license.department)) return false;
      }

      // status ( numeric => string?  0 => "0" ?)
      if (filters.status && filters.status.length > 0) {
        const statusStr = license.status.toString();
        if (!filters.status.includes(statusStr)) return false;
      }

      return true;
    });
  },
);

export const selectLicenseDepartmentOptions = createSelector(
  [selectLicenses],
  (licenses) =>
    Array.from(new Set(licenses.map((lic) => lic.department))).map((dept) => ({
      value: dept,
      label: dept,
    })),
);

export const selectLicenseIdOptions = createSelector(
  [selectLicenses],
  (licenses) =>
    licenses.map((lic) => ({
      value: lic.licenseId,
      label: lic.licenseId,
    })),
);

export const selectLicenseStatusOptions = () => [
  { value: "all", label: "All", statusCode: null },
  { value: "0", label: "Available", statusCode: 0 },
  { value: "1", label: "In Use", statusCode: 1 },
  { value: "2", label: "Under Maintenance", statusCode: 2 },
];

export const selectLicenseNameOptions = createSelector(
  [selectLicenses],
  (licenses) =>
    Array.from(new Set(licenses.map((lic) => lic.licenseName))).map((name) => ({
      value: name,
      label: name,
    })),
);

export const selectLicenseAssignedToOptions = createSelector(
  [selectLicenses],
  (licenses) =>
    Array.from(
      new Set(
        licenses.map((lic) => (lic.assignedTo ? lic.assignedTo : "Unassigned")),
      ),
    ).map((user) => ({
      value: user,
      label: user,
    })),
);

export const selectLicenseTypeOptions = createSelector(
  [selectLicenses],
  (licenses) =>
    Array.from(new Set(licenses.map((license) => license.type))).map(
      (type) => ({
        value: type,
        label: type,
      }),
    ),
);

export const selectAvailableLicenses = createSelector(
  [selectLicenses],
  (licenses) =>
    licenses
      .filter((lic) => lic.status === 0)
      .map((license) => ({
        value: license.licenseId,
        label: license.licenseName,
      })),
);

export const selectLicensesInUse = createSelector(
  [selectLicenses],
  (licenses) => licenses.filter((lic) => lic.status === 1),
);

export const selectLicensesUnderMaintenance = createSelector(
  [selectLicenses],
  (licenses) => licenses.filter((lic) => lic.status === 2),
);

export const findLicenseById = (id: string) =>
  createSelector([selectLicenses], (licenses) =>
    licenses.find((lic) => lic.licenseId === id),
  );

export const selectLicensesMap = createSelector(
  [selectLicenses],
  (licenses) => {
    const map: Record<string, License> = {};
    licenses.forEach((lic) => {
      map[lic.licenseId] = lic;
    });
    return map;
  },
);
