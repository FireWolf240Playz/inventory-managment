import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  isCollapsed: boolean;
}

const initialState: AppState = {
  isCollapsed: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isCollapsed = !state.isCollapsed;
    },
    setSidebarState(state, action: PayloadAction<boolean>) {
      state.isCollapsed = action.payload;
    },
  },
});

export const { toggleSidebar } = appSlice.actions;

export default appSlice.reducer;
