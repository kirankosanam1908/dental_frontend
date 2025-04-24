import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import ProtectedRoute from "../components/common/ProtectedRoute";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DentistListPage from "../pages/DentistListPage";
import MyRequestsPage from "../pages/MyRequestsPage";
import CheckupDetailPage from "../pages/CheckupDetailPage";
import PendingRequestsPage from "../pages/PendingRequestsPage";
import UploadResultsPage from "../pages/UploadResultsPage";
import HomePage from "../pages/HomePage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dentists"
            element={
              <ProtectedRoute role="patient">
                <DentistListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-requests"
            element={
              <ProtectedRoute role="patient">
                <MyRequestsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/requests/:id"
            element={
              <ProtectedRoute role="patient">
                <CheckupDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pending"
            element={
              <ProtectedRoute role="dentist">
                <PendingRequestsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload/:id"
            element={
              <ProtectedRoute role="dentist">
                <UploadResultsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
