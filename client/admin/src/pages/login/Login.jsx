import { Alert, Button, Col, Flex, Row, Typography } from "antd";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FcKey } from "react-icons/fc";

import { loginWithKeycloak } from "../../features/auth/authSlice";

const { Title } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleKeycloakLogin = () => {
    dispatch(loginWithKeycloak());
  };

  return (
    <Row gutter={[0, 0]} className="h-screen">
      <Col span={24} xxl={12} xl={12} lg={12} md={12} sm={0} xs={0}>
        <img
          src="/assets/images/loginBanner.svg"
          alt="Logo"
          className="w-full h-full object-cover absolute inset-0 bg-slate-50"
        />
      </Col>
      <Col span={24} xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
        <Flex
          className="h-screen"
          justify="center"
          vertical
          gap={10}
          align="center"
        >
          <Flex vertical align="center" justify="centre" gap={3}>
            <Link to="/">
              <img src="/logo.svg" alt="Logo" className="size-20" />
            </Link>
            <Title level={3}>Welcome to Cloud kart</Title>
            {!isLoading && error && (
              <Alert message={error} type="error" showIcon />
            )}
          </Flex>
          <Button
            type="primary"
            icon={<FcKey />}
            size="large"
            className="w-64 mt-2"
            onClick={handleKeycloakLogin}
            loading={isLoading}
          >
            Login with Keycloak
          </Button>
        </Flex>
      </Col>
    </Row>
  );
};

export default Login;
