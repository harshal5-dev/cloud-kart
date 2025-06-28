import { useSelector } from "react-redux";
import { Spin, Result, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

import Login from "../pages/login/Login";

const AuthWrapper = ({ children, requiredRoles = [] }) => {
  const { isAuthenticated, roles, isLoading } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin fullscreen size="large" tip="Initializing application..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  if (requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some((role) => roles.includes(role));
    if (!hasRequiredRole) {
      return (
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          icon={<LockOutlined />}
          extra={
            <Button type="primary" onClick={() => navigate("/")}>
              Back Dashboard
            </Button>
          }
        />
      );
    }
  }

  return children;
};

export default AuthWrapper;
