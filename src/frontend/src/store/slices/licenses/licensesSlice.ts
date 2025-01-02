import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { duplicateEntity } from "../entityUtils.ts";

export interface License {
  licenseId: string;
  licenseName: string;
  type: string;
  assignedTo: string | null;
  status: 0 | 1 | 2;
  department: string;
}

export interface LicenseFilters {
  licenseId?: string | string[];
  licenseName?: string | string[];
  type?: string | string[];
  assignedTo?: string | string[];
  department?: string | string[];
  status?: string | string[];
}

export interface LicenseState {
  licenses: License[];
  filters: LicenseFilters;
}

//Sample data
const initialState: LicenseState = {
  licenses: [
    {
      licenseId: "L1",
      licenseName: "Office 365",
      type: "Subscription",
      assignedTo: "1",
      status: 1,
      department: "IT",
    },
    {
      licenseId: "L2",
      licenseName: "Adobe Photoshop",
      type: "Perpetual",
      assignedTo: null,
      status: 0,
      department: "Marketing",
    },
    {
      licenseId: "L3",
      licenseName: "Antivirus Suite",
      type: "Subscription",
      assignedTo: "2",
      status: 0,
      department: "IT",
    },
    {
      licenseId: "L4",
      licenseName: "VPN Access",
      type: "Subscription",
      assignedTo: null,
      status: 2,
      department: "Finance",
    },
  ],
  filters: {},
};

const licenseSlice = createSlice({
  name: "licenses",
  initialState,
  reducers: {
    setLicenses(state, action: PayloadAction<License[]>) {
      state.licenses = action.payload;
    },
    setFilter(
      state,
      action: PayloadAction<{
        key: keyof LicenseFilters;
        value: string | string[];
      }>,
    ) {
      const { key, value } = action.payload;
      if (value === "all" || (Array.isArray(value) && value.length === 0)) {
        state.filters[key] = undefined;
        return;
      }
      state.filters[key] = Array.isArray(value) ? value : [value];
    },
    clearFilters(state) {
      state.filters = {};
    },
    addLicense(state, action: PayloadAction<License>) {
      state.licenses.push(action.payload);
    },

    editLicense(state, action: PayloadAction<License>) {
      const index = state.licenses.findIndex(
        (lic) => lic.licenseId === action.payload.licenseId,
      );
      if (index !== -1) {
        state.licenses[index] = action.payload;
      }
    },
    deleteLicense(state, action: PayloadAction<string>) {
      state.licenses = state.licenses.filter(
        (lic) => lic.licenseId !== action.payload,
      );
    },

    duplicateLicense(state, action: PayloadAction<License>) {
      const duplicated = duplicateEntity(action.payload) as License;
      state.licenses.push(duplicated);
    },
    updateLicenseStatus: (
      state,
      action: PayloadAction<{ licenseIds: string[] | null; status: 0 | 1 | 2 }>,
    ) => {
      const { licenseIds, status } = action.payload;
      if (!licenseIds) return;
      state.licenses.forEach((lic) => {
        if (licenseIds.includes(lic.licenseId)) {
          lic.status = status;
        }
      });
    },

    reassignLicenses: (
      state,
      action: PayloadAction<{
        newUser: string | null;
        licenseIds: string[];
      }>,
    ) => {
      const { newUser, licenseIds } = action.payload;
      state.licenses.forEach((lic) => {
        if (licenseIds.includes(lic.licenseId)) {
          lic.assignedTo = newUser;
        }
      });
    },
  },
});

export const {
  setLicenses,
  setFilter,
  clearFilters,
  addLicense,
  editLicense,
  deleteLicense,
  duplicateLicense,
  updateLicenseStatus,
  reassignLicenses,
} = licenseSlice.actions;

export default licenseSlice.reducer;
