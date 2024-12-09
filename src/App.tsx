import GlobalStyles from "./styles/GlobalStyles.ts";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Dashboard from "./pages/Dashboard.tsx";
import Devices from "./pages/Devices.tsx";
import Employees from "./pages/Employees.tsx";
import Login from "./pages/Login.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import AppLayout from "./ui/AppLayout.tsx";
import Account from "./pages/Account.tsx";
import { Toaster, ToastBar, toast } from "react-hot-toast";
import { HiXMark } from "react-icons/hi2";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />

        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{
          margin: "8px",
        }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      >
        {(toastObj) => (
          <ToastBar toast={toastObj}>
            {({ icon, message }) => (
              <div style={{ display: "flex", alignItems: "center" }}>
                {icon}
                <span style={{ marginLeft: "8px", flex: 1 }}>{message}</span>
                <button
                  onClick={() => toast.dismiss(toastObj.id)}
                  style={{
                    marginLeft: "12px",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "bold",
                    color: "var(--color-grey-700)",
                  }}
                >
                  <HiXMark />
                </button>
              </div>
            )}
          </ToastBar>
        )}
      </Toaster>
    </>
  );
}

export default App;
