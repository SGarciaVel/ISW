import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import AdminDashboard from "../pages/AdminDashboard";
import LoginPage from "../pages/LoginPage"; // Asegúrate de importar la página de Login
import AuthProvider from "../context/AuthContext";
import ProductProvider from "../context/ProductContext";

const AppRouter = () => (
  <Router>
    <AuthProvider>
      <ProductProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />{" "}
          {/* Página principal de login */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </ProductProvider>
    </AuthProvider>
  </Router>
);

export default AppRouter;
