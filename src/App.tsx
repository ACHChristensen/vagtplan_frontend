// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminManagementPage from "./pages/AdminManagementPage";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/" element={<LoginPage />} />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/dashboard-admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ADMIN MANAGEMENT */}
        <Route
          path="/admin/management"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminManagementPage />
            </ProtectedRoute>
          }
        />

        {/* EMPLOYEE DASHBOARD */}
        <Route
          path="/dashboard-employee"
          element={
            <ProtectedRoute roles={["employee"]}>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
