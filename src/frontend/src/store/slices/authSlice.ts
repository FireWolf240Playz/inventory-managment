import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: { id: string; name: string; email: string; avatar: string } | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      return null;
    }
  })(),
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{ user: AuthState["user"]; token: string }>,
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;

      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    updateUserSuccess(state, action) {
      if (state.user) {
        state.user! = { ...state.user!, ...action.payload };
        state.user!.avatar = action.payload.avatar;
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
});

export const { loginSuccess, logout, updateUserSuccess } = authSlice.actions;
export default authSlice.reducer;
