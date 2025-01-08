import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../services/apiAuth";
import { loginSuccess, logout } from "../slices/authSlice";

export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { dispatch },
  ) => {
    const data = await loginUser(email, password);
    dispatch(loginSuccess({ user: data.user, token: data.token }));
    localStorage.setItem("token", data.token);
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    dispatch(logout());
    localStorage.removeItem("token");
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    {
      name,
      email,
      password,
    }: { name: string; email: string; password: string },
    { dispatch },
  ) => {
    const data = await registerUser(name, email, password);
    dispatch(loginSuccess({ user: data.user, token: data.token }));
    localStorage.setItem("token", data.token);
  },
);
