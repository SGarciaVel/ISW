// src/routes/AppRouter.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginPage from "./Login";
import HomePage from "../pages/HomePage";
import InscriptionManagement from "../pages/InscriptionManagement";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  return user && user.roles.includes("encargado") ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/auth" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/inscriptions"
        element={
          <AdminRoute>
            <InscriptionManagement />
          </AdminRoute>
        }
      />
    </Routes>
  </Router>
);

export default AppRouter;
