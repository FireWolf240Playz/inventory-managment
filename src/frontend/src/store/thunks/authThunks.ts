import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../services/apiAuth";
import { loginSuccess, logout, updateUserSuccess } from "../slices/authSlice";

interface UpdateUserPayload {
  fullName: string;
  avatar: File | null;
}

import api from "../../services/api.ts";
import { useQueryClient } from "@tanstack/react-query";

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

export const updateUser = createAsyncThunk(
  "users/account",
  async ({ fullName, avatar }: UpdateUserPayload, { dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("name", fullName);
      if (avatar) {
        formData.append("avatar", avatar);
      }

      const token = localStorage.getItem("token");

      const response = await api.patch("users/account", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(updateUserSuccess(response.data.data.user));
      return response.data.data.user;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },
);
