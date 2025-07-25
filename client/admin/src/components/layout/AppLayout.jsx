import { useEffect, useState } from "react";
import {
  LogoutOutlined,
  UserOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Dropdown, Typography, Avatar, Flex, Tag, Spin } from "antd";
import { MdCategory, MdDashboard, MdViewModule } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router";
import { FaUserCircle, FaUsers } from "react-icons/fa";
import ProLayout from "@ant-design/pro-layout";
import { AiFillProduct } from "react-icons/ai";

import ToggleTheme from "./ToggleTheme";
import { cssVariables } from "../../config/themeConfig";
import { useKeycloak } from "../../hooks/useKeycloak";
import AppRoutes from "../../routes";
import AuthWrapper from "../AuthWrapper";
import {
  initializeLogoTheme,
  injectLogoStyles,
} from "../../utils/logoThemeAdapter";
import { useGetUserProfileQuery } from "../../pages/users/usersApi";
import { filterRoutesByAccess, canAccessPath } from "../../utils/roleAccess";

const getAvatar = (userProfile) => {
  return userProfile?.profilePictureUrl || "/assets/images/developer.svg";
};

const route = {
  path: "/dashboard",
  routes: [
    {
      path: "#",
      name: "Modules",
      icon: <MdViewModule />,
      disabled: true,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <MdDashboard />,
      access: ["ADMIN", "MANAGER"],
    },
    {
      path: "/users",
      name: "Users",
      icon: <FaUsers />,
      access: ["ADMIN"],
    },
    {
      path: "/categories",
      name: "Categories",
      icon: <MdCategory />,
      access: ["ADMIN", "MANAGER"],
    },
    {
      name: "Products",
      path: "/products",
      icon: <AiFillProduct />,
      access: ["ADMIN", "MANAGER"],
    },
  ],
};

const AppLayout = () => {
  const [pathname, setPathname] = useState("");
  const { isAuthenticated, roles, logout } = useKeycloak();

  const userResponse = useGetUserProfileQuery(undefined, {
    skip: !isAuthenticated,
  });
  const {
    data: userProfile,
    isLoading: userLoading,
    error: userError,
  } = userResponse;

  const navigate = useNavigate();
  const location = useLocation();

  // Filter routes based on user roles
  const filteredRoutes = filterRoutesByAccess(route.routes, roles);
  const filteredRoute = {
    ...route,
    routes: filteredRoutes,
  };

  // Set CSS variables for theme-adaptive logo
  useEffect(() => {
    const cleanupTheme = initializeLogoTheme(cssVariables);
    const cleanupStyles = injectLogoStyles();

    return () => {
      cleanupTheme();
      cleanupStyles();
    };
  }, []);

  async function handleLogout() {
    logout();
    navigate("/");
  }

  function handleProfile() {
    navigate("/profile");
  }

  const userMenuItems = [
    {
      key: "account",
      label: (
        <div style={{ padding: "12px", minWidth: "200px" }}>
          <Flex align="center" gap={8}>
            <div style={{ position: "relative" }}>
              <Avatar
                size={40}
                src={userLoading ? undefined : getAvatar(userProfile)}
                style={{
                  border: `2px solid ${cssVariables.colorPrimary}30`,
                  boxShadow: cssVariables.boxShadowLight,
                }}
                icon={userLoading ? <LoadingOutlined spin /> : <UserOutlined />}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "2px",
                  right: "2px",
                  width: "10px",
                  height: "10px",
                  backgroundColor: cssVariables.colorSuccess,
                  border: `2px solid ${cssVariables.containerBorder}`,
                  borderRadius: "50%",
                  boxShadow: cssVariables.shadowSmall,
                }}
              />
            </div>
            <Flex vertical gap={1}>
              <Typography.Text
                strong
                style={{
                  fontSize: "14px",
                  lineHeight: "18px",
                  fontWeight: 600,
                }}
              >
                {userLoading ? (
                  <Spin
                    size="small"
                    indicator={
                      <LoadingOutlined style={{ fontSize: 12 }} spin />
                    }
                  />
                ) : userError ? (
                  "Error loading user"
                ) : (
                  `${userProfile?.firstName || "Guest"} ${
                    userProfile?.lastName || "User"
                  }`
                )}
              </Typography.Text>
              <Typography.Text
                type="secondary"
                style={{
                  fontSize: "12px",
                  lineHeight: "16px",
                  fontWeight: 400,
                }}
              >
                {userLoading ? (
                  <Spin
                    size="small"
                    indicator={
                      <LoadingOutlined style={{ fontSize: 10 }} spin />
                    }
                  />
                ) : (
                  `@${userProfile?.username || "guest"}`
                )}
              </Typography.Text>
              <Tag
                style={{
                  fontSize: "9px",
                  padding: "1px 6px",
                  border: "none",
                  fontWeight: 500,
                  width: "fit-content",
                  marginTop: "2px",
                  background: `linear-gradient(135deg, ${cssVariables.colorPrimary}, ${cssVariables.colorSecondary})`,
                  color: "white",
                  textTransform: "uppercase",
                  letterSpacing: "0.3px",
                }}
              >
                {userProfile?.roles[0] || "User"}
              </Tag>
            </Flex>
          </Flex>
          <div
            style={{
              height: "1px",
              backgroundColor: cssVariables.borderDivider,
              margin: "8px 0 4px 0",
            }}
          />
        </div>
      ),
      disabled: true,
    },
    {
      key: "profile",
      label: (
        <div
          style={{
            padding: "6px 8px",
            borderRadius: "6px",
            transition: "all 0.2s ease",
          }}
        >
          <Flex align="center" gap={8}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                backgroundColor: `${cssVariables.colorPrimary}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaUserCircle
                style={{ color: cssVariables.colorPrimary, fontSize: "14px" }}
              />
            </div>
            <Flex vertical gap={0}>
              <Typography.Text style={{ fontSize: "13px", fontWeight: 600 }}>
                My Profile
              </Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: "11px" }}>
                View and edit profile
              </Typography.Text>
            </Flex>
          </Flex>
        </div>
      ),
      onClick: handleProfile,
    },
    {
      type: "divider",
      style: { margin: "4px 0" },
    },
    {
      key: "logout",
      label: (
        <div
          style={{
            padding: "6px 8px",
            borderRadius: "6px",
            transition: "all 0.2s ease",
          }}
        >
          <Flex align="center" gap={8}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                backgroundColor: `${cssVariables.colorError}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LogoutOutlined
                style={{ color: cssVariables.colorError, fontSize: "14px" }}
              />
            </div>
            <Flex vertical gap={0}>
              <Typography.Text
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: cssVariables.colorError,
                }}
              >
                Sign Out
              </Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: "11px" }}>
                Logout from account
              </Typography.Text>
            </Flex>
          </Flex>
        </div>
      ),
      onClick: handleLogout,
    },
  ];

  useEffect(() => {
    if (location.pathname !== "#") {
      setPathname(location.pathname);
    }
  }, [location.pathname]);

  return (
    <AuthWrapper>
      <ProLayout
        title="Cloud Kart"
        logo="/assets/images/cloud-kart-logo-ultimate.svg"
        fixSiderbar
        route={filteredRoute}
        siderWidth={230}
        layout="mix"
        ghost
        location={{
          pathname,
        }}
        actionsRender={() => {
          return [<ToggleTheme key="toggleTheme" />];
        }}
        token={{
          sider: {
            colorTextMenuSelected: cssVariables.colorWhite,
            colorTextMenuItemHover: cssVariables.colorPrimary,
            colorBgMenuItemSelected: cssVariables.colorPrimary,
            colorBgMenuItemHover: `${cssVariables.colorPrimary}15`,
            colorTextMenu: "inherit",
            paddingInlineLayoutSider: 16,
            marginInlineStart: 4,
            marginInlineEnd: 4,
          },
          header: {
            heightLayoutHeader: 60,
            paddingInlineLayoutHeader: 20,
          },
          pageContainer: {
            paddingInlinePageContainerContent: 20,
            paddingBlockPageContainerContent: 20,
          },
        }}
        avatarProps={{
          src: userLoading ? undefined : getAvatar(userProfile),
          size: "large",
          shape: "circle",
          style: {
            border: `2px solid ${cssVariables.colorPrimary}40`,
            boxShadow: `0 2px 6px ${cssVariables.colorPrimary}20`,
            transition: "all 0.2s ease",
            cursor: "pointer",
          },
          icon: userLoading ? <LoadingOutlined spin /> : <UserOutlined />,
          render: (_, dom) => {
            return (
              <Dropdown
                menu={{
                  items: userMenuItems,
                }}
                trigger={["click"]}
                placement="bottomRight"
                overlayStyle={{
                  borderRadius: "12px",
                  boxShadow: cssVariables.shadowMedium,
                  border: `1px solid ${cssVariables.borderSubtle}`,
                  overflow: "hidden",
                  backdropFilter: "blur(6px)",
                  background: cssVariables.containerBackground,
                  padding: "0",
                  minWidth: "200px",
                  maxWidth: "220px",
                }}
              >
                <Flex
                  align="center"
                  gap={8}
                  style={{
                    cursor: "pointer",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    transition: "all 0.2s ease",
                    backgroundColor: "transparent",
                    border: `1px solid transparent`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${cssVariables.colorPrimary}10`;
                    e.currentTarget.style.borderColor = `${cssVariables.colorPrimary}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = "transparent";
                  }}
                >
                  <div style={{ position: "relative" }}>
                    {dom}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "2px",
                        right: "2px",
                        width: "9px",
                        height: "9px",
                        backgroundColor: cssVariables.colorSuccess,
                        border: `1px solid ${cssVariables.containerBorder}`,
                        borderRadius: "50%",
                        boxShadow: cssVariables.shadowLight,
                      }}
                    />
                  </div>
                  <Flex vertical gap={0} style={{ minWidth: "70px" }}>
                    <Typography.Text
                      strong
                      style={{
                        fontSize: "13px",
                        lineHeight: "16px",
                        fontWeight: 600,
                      }}
                    >
                      {userLoading ? (
                        <Spin
                          size="small"
                          indicator={
                            <LoadingOutlined style={{ fontSize: 11 }} spin />
                          }
                        />
                      ) : (
                        userProfile?.firstName || "Guest"
                      )}
                    </Typography.Text>
                    <Typography.Text
                      type="secondary"
                      style={{
                        fontSize: "11px",
                        lineHeight: "14px",
                        fontWeight: 400,
                      }}
                    >
                      {userLoading ? (
                        <Spin
                          size="small"
                          indicator={
                            <LoadingOutlined style={{ fontSize: 9 }} spin />
                          }
                        />
                      ) : (
                        <span>{userProfile?.username || "guest"}</span>
                      )}
                    </Typography.Text>
                  </Flex>
                </Flex>
              </Dropdown>
            );
          },
        }}
        headerTitleRender={() => (
          <Link
            to="/dashboard"
            style={{
              textDecoration: "none",
            }}
          >
            <Flex align="center" gap={12}>
              <div
                className="logo-container"
                style={{
                  width: "48px",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  borderRadius: "12px",
                  padding: "4px",
                  background: `linear-gradient(135deg, ${cssVariables.colorPrimary}10, ${cssVariables.colorSecondary}10)`,
                  border: `1px solid ${cssVariables.colorPrimary}20`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.08) rotate(2deg)";
                  e.currentTarget.style.background = `linear-gradient(135deg, ${cssVariables.colorPrimary}20, ${cssVariables.colorSecondary}20)`;
                  e.currentTarget.style.borderColor = `${cssVariables.colorPrimary}40`;
                  e.currentTarget.style.boxShadow = `0 8px 25px ${cssVariables.colorPrimary}30, 0 4px 10px ${cssVariables.colorSecondary}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1) rotate(0deg)";
                  e.currentTarget.style.background = `linear-gradient(135deg, ${cssVariables.colorPrimary}10, ${cssVariables.colorSecondary}10)`;
                  e.currentTarget.style.borderColor = `${cssVariables.colorPrimary}20`;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <img
                  src="/assets/images/cloud-kart-logo-ultimate.svg"
                  alt="Cloud Kart Logo"
                  style={{
                    width: "40px",
                    height: "40px",
                    filter: `drop-shadow(0 4px 12px ${cssVariables.colorPrimary}25) drop-shadow(0 2px 4px ${cssVariables.colorSecondary}15)`,
                    transition: "all 0.3s ease",
                  }}
                />
              </div>
              <Flex vertical gap={0}>
                <Typography.Text
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    lineHeight: "24px",
                    background: `linear-gradient(155deg, ${cssVariables.colorPrimary} 0%, ${cssVariables.colorSecondary} 100%)`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "-0.5px",
                  }}
                >
                  Cloud Kart
                </Typography.Text>
                <Typography.Text
                  type="secondary"
                  style={{
                    fontSize: "11px",
                    lineHeight: "14px",
                    fontWeight: 500,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  Management Portal
                </Typography.Text>
              </Flex>
            </Flex>
          </Link>
        )}
        menuFooterRender={({ collapsed }) => {
          if (collapsed) return undefined;
          return (
            <Flex
              vertical
              align="center"
              style={{
                padding: "12px 16px",
                borderTop: `1px solid ${cssVariables.borderSubtle}`,
                marginTop: "8px",
              }}
            >
              <Typography.Text
                type="secondary"
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                Cloud Kart ©{new Date().getFullYear()}
              </Typography.Text>
              <Typography.Text
                type="secondary"
                style={{
                  fontSize: "10px",
                  textAlign: "center",
                  marginTop: "2px",
                }}
              >
                Created by Harshal
              </Typography.Text>
            </Flex>
          );
        }}
        menuItemRender={(item, dom) => (
          <div
            onClick={() => {
              if (item?.path !== "/#" && !item?.disabled) {
                // Check if user has access to the route before navigation
                if (canAccessPath(item.path, route.routes, roles)) {
                  navigate(item.path || "/dashboard");
                } else {
                  console.warn(`Access denied to route: ${item.path}`);
                }
              }
            }}
            style={{
              cursor: item?.disabled ? "not-allowed" : "pointer",
              opacity: item?.disabled ? 0.6 : 1,
              margin: "2px 0",
              borderRadius: "6px",
              transition: "all 0.2s ease",
            }}
          >
            {dom}
          </div>
        )}
      >
        <AppRoutes />
      </ProLayout>
    </AuthWrapper>
  );
};

export default AppLayout;
