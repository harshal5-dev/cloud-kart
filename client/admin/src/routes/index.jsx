import { Navigate, Route, Routes } from "react-router";

import Dashboard from "../pages/dashboard/Dashboard";
import Category from "../pages/category/Category";
import Product from "../pages/product/Product";
import PageNotFound from "../pages/result/PageNotFound";
import Users from "../pages/users/Users";
import AuthWrapper from "../components/AuthWrapper";
import UserProfile from "../pages/users/profile/UserProfile";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route
      path="/dashboard"
      element={
        <AuthWrapper requiredRoles={["ADMIN", "MANAGER"]}>
          <Dashboard />
        </AuthWrapper>
      }
    />

    <Route
      path="/users"
      element={
        <AuthWrapper requiredRoles={["ADMIN"]}>
          <Users />
        </AuthWrapper>
      }
    />

    <Route
      path="/categories"
      element={
        <AuthWrapper requiredRoles={["ADMIN", "MANAGER"]}>
          <Category />
        </AuthWrapper>
      }
    />
    <Route
      path="/products"
      element={
        <AuthWrapper requiredRoles={["ADMIN", "MANAGER"]}>
          <Product />
        </AuthWrapper>
      }
    />
    <Route path="/profile" element={<UserProfile />} />
    <Route path="*" element={<PageNotFound />} />
  </Routes>
);

export default AppRoutes;
