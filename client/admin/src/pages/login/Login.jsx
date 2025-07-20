import React from "react";
import {
  Alert,
  Button,
  Col,
  Flex,
  Row,
  Typography,
  Card,
  Space,
  Divider,
} from "antd";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FcKey } from "react-icons/fc";
import { UserOutlined, LockOutlined, CloudOutlined } from "@ant-design/icons";

import { loginWithKeycloak } from "../../features/auth/authSlice";
import { cssVariables } from "../../config/themeConfig";

const { Title } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleKeycloakLogin = () => {
    dispatch(loginWithKeycloak());
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${cssVariables.colorPrimary} 0%, ${cssVariables.colorSecondary} 100%)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorative elements */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: cssVariables.whiteTransparent25,
          filter: "blur(100px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "-15%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: cssVariables.whiteTransparent30,
          filter: "blur(120px)",
        }}
      />

      <Row gutter={[0, 0]} style={{ minHeight: "100vh" }}>
        {/* Left Side - Branding */}
        <Col span={24} xxl={14} xl={14} lg={14} md={0} sm={0} xs={0}>
          <Flex
            style={{
              height: "100vh",
              padding: "80px 60px",
              position: "relative",
            }}
            vertical
            justify="center"
            align="flex-start"
          >
            <Space direction="vertical" size={32} style={{ maxWidth: "600px" }}>
              {/* Logo Section */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "8px",
                }}
              >
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "20px",
                    background: cssVariables.whiteTransparent25,
                    border: `1px solid ${cssVariables.whiteTransparent30}`,
                    backdropFilter: "blur(20px)",
                    boxShadow: `0 8px 32px rgba(0,0,0,0.1)`,
                  }}
                >
                  <img
                    src="/assets/images/cloud-kart-logo-ultimate.svg"
                    alt="Cloud Kart Logo"
                    style={{
                      width: "56px",
                      height: "56px",
                      filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.15))",
                    }}
                  />
                </div>
                <div>
                  <Typography.Title
                    level={2}
                    style={{
                      margin: 0,
                      color: cssVariables.colorWhite,
                      fontSize: "40px",
                      fontWeight: 800,
                      textShadow: cssVariables.textShadow,
                      background: `linear-gradient(45deg, ${cssVariables.colorWhite}, ${cssVariables.whiteTransparent90})`,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Cloud Kart
                  </Typography.Title>
                </div>
              </div>

              {/* Hero Content */}
              <Space direction="vertical" size={20} style={{ width: "100%" }}>
                <Typography.Title
                  level={1}
                  style={{
                    margin: 0,
                    color: cssVariables.colorWhite,
                    fontSize: "clamp(32px, 4vw, 48px)",
                    fontWeight: 800,
                    lineHeight: 1.2,
                    textShadow: cssVariables.textShadow,
                    letterSpacing: "-0.5px",
                  }}
                >
                  Welcome to the Future of
                  <br />
                  <span
                    style={{
                      background: `linear-gradient(45deg, ${cssVariables.colorWhite}, ${cssVariables.whiteTransparent90})`,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    E-Commerce Management
                  </span>
                </Typography.Title>

                <Typography.Text
                  style={{
                    color: cssVariables.whiteTransparent90,
                    fontSize: "18px",
                    lineHeight: 1.6,
                    textShadow: cssVariables.textShadow,
                    fontWeight: 400,
                  }}
                >
                  Streamline your business operations with our comprehensive
                  admin dashboard. Manage users, products, and orders with ease.
                </Typography.Text>
              </Space>

              {/* Feature highlights */}
              <Space
                direction="vertical"
                size={16}
                style={{ marginTop: "16px" }}
              >
                {[
                  { icon: <UserOutlined />, text: "Advanced User Management" },
                  { icon: <LockOutlined />, text: "Secure Authentication" },
                  {
                    icon: <CloudOutlined />,
                    text: "Cloud-Based Infrastructure",
                  },
                ].map((feature, index) => (
                  <Space key={index} align="center" size={16}>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: cssVariables.whiteTransparent25,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backdropFilter: "blur(10px)",
                        border: `1px solid ${cssVariables.whiteTransparent30}`,
                      }}
                    >
                      {React.cloneElement(feature.icon, {
                        style: {
                          color: cssVariables.colorWhite,
                          fontSize: "16px",
                        },
                      })}
                    </div>
                    <Typography.Text
                      style={{
                        color: cssVariables.whiteTransparent90,
                        fontSize: "15px",
                        fontWeight: 500,
                      }}
                    >
                      {feature.text}
                    </Typography.Text>
                  </Space>
                ))}
              </Space>
            </Space>
          </Flex>
        </Col>

        {/* Right Side - Login Form */}
        <Col span={24} xxl={10} xl={10} lg={10} md={24} sm={24} xs={24}>
          <Flex
            style={{
              height: "100vh",
              padding: "60px 40px",
              background: cssVariables.whiteTransparent25,
              backdropFilter: "blur(20px)",
              borderLeft: `1px solid ${cssVariables.whiteTransparent30}`,
            }}
            justify="center"
            vertical
            align="center"
          >
            <Card
              style={{
                width: "100%",
                maxWidth: "440px",
                border: `1px solid ${cssVariables.borderSubtle}`,
                borderRadius: cssVariables.borderRadiusLarge,
                boxShadow: cssVariables.shadowMedium,
                backdropFilter: "blur(10px)",
              }}
              styles={{
                body: {
                  padding: "48px 40px",
                },
              }}
            >
              <Space direction="vertical" size={20} style={{ width: "100%" }}>
                {/* Mobile Logo */}
                <Flex justify="center" className="lg:hidden">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "16px",
                        background: `linear-gradient(135deg, ${cssVariables.colorPrimary}, ${cssVariables.colorSecondary})`,
                        boxShadow: `0 4px 20px ${cssVariables.colorPrimary}25`,
                      }}
                    >
                      <img
                        src="/assets/images/cloud-kart-logo-ultimate.svg"
                        alt="Cloud Kart Logo"
                        style={{
                          width: "40px",
                          height: "40px",
                          filter: "brightness(0) saturate(100%) invert(100%)",
                        }}
                      />
                    </div>
                    <Typography.Title
                      level={3}
                      style={{
                        margin: 0,
                        background: `linear-gradient(135deg, ${cssVariables.colorPrimary}, ${cssVariables.colorSecondary})`,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: 700,
                      }}
                    >
                      Cloud Kart
                    </Typography.Title>
                  </div>
                </Flex>

                {/* Welcome Text */}
                <Space
                  direction="vertical"
                  size={8}
                  style={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <Typography.Title
                    level={2}
                    style={{
                      margin: 0,
                      fontSize: "28px",
                      fontWeight: 700,
                      letterSpacing: "-0.5px",
                    }}
                  >
                    Welcome Back
                  </Typography.Title>
                  <Typography.Text
                    style={{
                      color: cssVariables.colorTextSecondary,
                      fontSize: "16px",
                      lineHeight: 1.5,
                    }}
                  >
                    Sign in to access your admin dashboard
                  </Typography.Text>
                </Space>

                {/* Error Alert */}
                {!isLoading && error && (
                  <Alert
                    message="Authentication Failed"
                    description={error}
                    type="error"
                    showIcon
                    style={{
                      borderRadius: cssVariables.borderRadiusButton,
                      border: `1px solid ${cssVariables.colorError}20`,
                      backgroundColor: `${cssVariables.colorError}08`,
                    }}
                  />
                )}

                <Divider style={{ margin: "16px 0" }}>
                  <Typography.Text
                    type="secondary"
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                      color: cssVariables.colorTextSecondary,
                    }}
                  >
                    Secure Login
                  </Typography.Text>
                </Divider>

                {/* Login Button */}
                <Button
                  type="primary"
                  icon={<FcKey style={{ fontSize: "20px" }} />}
                  size="large"
                  onClick={handleKeycloakLogin}
                  loading={isLoading}
                  style={{
                    width: "100%",
                    height: "56px",
                    fontSize: "16px",
                    fontWeight: 600,
                    borderRadius: cssVariables.borderRadiusButton,
                    background: `linear-gradient(135deg, ${cssVariables.colorPrimary}, ${cssVariables.colorSecondary})`,
                    border: "none",
                    boxShadow: `0 4px 16px ${cssVariables.colorPrimary}25`,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = `0 8px 25px ${cssVariables.colorPrimary}35`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = `0 4px 16px ${cssVariables.colorPrimary}25`;
                  }}
                >
                  Continue with Keycloak
                </Button>

                {/* Footer */}
                <Space
                  direction="vertical"
                  size={4}
                  style={{
                    textAlign: "center",
                    marginTop: "24px",
                    width: "100%",
                  }}
                >
                  <Typography.Text
                    type="secondary"
                    style={{ fontSize: "13px", fontWeight: 500 }}
                  >
                    🔒 Secure authentication powered by Keycloak
                  </Typography.Text>
                  <Typography.Text
                    type="secondary"
                    style={{ fontSize: "12px" }}
                  >
                    Cloud Kart © {new Date().getFullYear()} | Created by Harshal
                  </Typography.Text>
                </Space>
              </Space>
            </Card>
          </Flex>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
