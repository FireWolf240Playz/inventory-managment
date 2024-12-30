import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  isCollapsedSidebar: boolean;
  isCollapsedAdvancedSidebarEmployees: boolean;
  isCollapsedAdvancedSidebarDevices: boolean;
  isCollapsedAdvancedSidebarLicenses: boolean;
}

const initialState: AppState = {
  isCollapsedSidebar: false,
  isCollapsedAdvancedSidebarEmployees: false,
  isCollapsedAdvancedSidebarDevices: false,
  isCollapsedAdvancedSidebarLicenses: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // General Sidebar Toggling
    toggleSidebar(state) {
      state.isCollapsedSidebar = !state.isCollapsedSidebar;
    },
    setSidebarState(state, action: PayloadAction<boolean>) {
      state.isCollapsedSidebar = action.payload;
    },

    // Employees Advanced Filter Sidebar
    toggleAdvancedFilterSidebarEmployees(state) {
      state.isCollapsedAdvancedSidebarEmployees =
        !state.isCollapsedAdvancedSidebarEmployees;
    },
    setAdvancedFilterSidebarStateEmployees(
      state,
      action: PayloadAction<boolean>,
    ) {
      state.isCollapsedAdvancedSidebarEmployees = action.payload;
    },

    // Devices Advanced Filter Sidebar
    toggleAdvancedFilterSidebarDevices(state) {
      state.isCollapsedAdvancedSidebarDevices =
        !state.isCollapsedAdvancedSidebarDevices;
    },
    setAdvancedFilterSidebarStateDevices(
      state,
      action: PayloadAction<boolean>,
    ) {
      state.isCollapsedAdvancedSidebarDevices = action.payload;
    },

    toggleAdvancedFilterLicenses(state) {
      state.isCollapsedAdvancedSidebarLicenses =
        !state.isCollapsedAdvancedSidebarLicenses;
    },
    setAdvancedFilterSidebarStateLicenses(
      state,
      action: PayloadAction<boolean>,
    ) {
      state.isCollapsedAdvancedSidebarDevices = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarState,
  toggleAdvancedFilterSidebarEmployees,
  setAdvancedFilterSidebarStateEmployees,
  toggleAdvancedFilterSidebarDevices,
  setAdvancedFilterSidebarStateDevices,
  toggleAdvancedFilterLicenses,
  setAdvancedFilterSidebarStateLicenses,
} = appSlice.actions;

export default appSlice.reducer;
