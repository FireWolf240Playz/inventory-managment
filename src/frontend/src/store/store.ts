import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice.ts";
import devicesReducer from "./slices/devices/deviceSlice.ts";
import employeeReducer from "./slices/employees/employeeSlice.ts";
import licensesReducer from "./slices/licenses/licensesSlice.ts";

const store = configureStore({
  reducer: {
    app: appReducer,
    devices: devicesReducer,
    employees: employeeReducer,
    licenses: licensesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;