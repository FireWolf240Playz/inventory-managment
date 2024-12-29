import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const selectLicenses = (state: RootState) => state.licenses.licenses;
export const selectLicenseFilters = (state: RootState) =>
  state.licenses.filters;

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
