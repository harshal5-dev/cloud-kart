import React from "react";
import { Navigate } from "react-router-dom";
import { Result, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useRoleAccess } from "../hooks/useRoleAccess";

/**
 * Higher-Order Component for protecting routes based on user roles
 * @param {React.Component} WrappedComponent - The component to protect
 * @param {string[]} requiredRoles - Array of roles required to access the component
 * @param {Object} options - Additional options for the HOC
 * @returns {React.Component} - Protected component
 */
const withRoleAccess = (WrappedComponent, requiredRoles = [], options = {}) => {
  const {
    redirectTo = "/dashboard",
    showAccessDenied = true,
    fallbackComponent = null,
  } = options;

  const ProtectedComponent = (props) => {
    const { hasAnyRole } = useRoleAccess();

    // Check if user has required roles
    const hasAccess = hasAnyRole(requiredRoles);

    if (!hasAccess) {
      // If a fallback component is provided, render it
      if (fallbackComponent) {
        return fallbackComponent;
      }

      // If showAccessDenied is true, show access denied page
      if (showAccessDenied) {
        return (
          <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            icon={
              <LockOutlined style={{ fontSize: "72px", color: "#ff4d4f" }} />
            }
            extra={
              <Button type="primary" onClick={() => window.history.back()}>
                Go Back
              </Button>
            }
          />
        );
      }

      // Otherwise, redirect to specified route
      return <Navigate to={redirectTo} replace />;
    }

    // User has access, render the wrapped component
    return <WrappedComponent {...props} />;
  };

  // Set display name for debugging
  ProtectedComponent.displayName = `withRoleAccess(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return ProtectedComponent;
};

export default withRoleAccess;
