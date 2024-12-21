import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  isCollapsedSidebar: boolean;
  isCollapsedAdvancedSidebar: boolean;
}

const initialState: AppState = {
  isCollapsedSidebar: false,
  isCollapsedAdvancedSidebar: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isCollapsedSidebar = !state.isCollapsedSidebar;
    },
    setSidebarState(state, action: PayloadAction<boolean>) {
      state.isCollapsedAdvancedSidebar = action.payload;
    },
    toggleAdvancedFilterSidebar(state) {
      state.isCollapsedAdvancedSidebar = !state.isCollapsedAdvancedSidebar;
    },
    setAdvancedFilterSidebarState(state, action: PayloadAction<boolean>) {
      state.isCollapsedAdvancedSidebar = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  toggleAdvancedFilterSidebar,
  setAdvancedFilterSidebarState,
} = appSlice.actions;

export default appSlice.reducer;
