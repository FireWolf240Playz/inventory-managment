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
import Licenses from "./pages/Licenses.tsx";
import ProtectedRoute from "./ui/ProtectedRoute.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DarkModeProvider } from "./context/DarkModeContext.tsx";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 0 } },
  });

  return (
    <>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <GlobalStyles />
            <Routes>
              <Route path="/" element={<Navigate replace to="/login" />} />

              <Route path="/login" element={<Login />} />

              <Route element={<AppLayout />}>
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/devices"
                  element={
                    <ProtectedRoute>
                      <Devices />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employees"
                  element={
                    <ProtectedRoute>
                      <Employees />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/licenses"
                  element={
                    <ProtectedRoute>
                      <Licenses />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/account"
                  element={
                    <ProtectedRoute>
                      <Account />
                    </ProtectedRoute>
                  }
                />
              </Route>

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </DarkModeProvider>

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
