import { useEffect, useState } from "react";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, Typography, Avatar, Flex, Tag } from "antd";
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

const getAvatar = () => {
  return "/assets/images/developer.svg";
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
    },
    {
      path: "/users",
      name: "Users",
      icon: <FaUsers />,
      access: "canAdmin",
    },
    {
      path: "/categories",
      name: "Categories",
      icon: <MdCategory />,
    },
    {
      name: "Products",
      path: "/products",
      icon: <AiFillProduct />,
    },
  ],
};

const AppLayout = () => {
  const [pathname, setPathname] = useState("");
  const { userInfo, logout } = useKeycloak();

  const navigate = useNavigate();
  const location = useLocation();

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
                src={getAvatar()}
                style={{
                  border: `2px solid ${cssVariables.colorPrimary}30`,
                  boxShadow: cssVariables.boxShadowLight,
                }}
                icon={<UserOutlined />}
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
                {userInfo?.given_name || "Guest User"}
              </Typography.Text>
              <Typography.Text
                type="secondary"
                style={{
                  fontSize: "12px",
                  lineHeight: "16px",
                  fontWeight: 400,
                }}
              >
                @{userInfo?.preferred_username || "guest"}
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
                Admin
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
        title="Cloud Kart Admin"
        logo="/logo.svg"
        fixSiderbar
        route={route}
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
          src: getAvatar(),
          size: "large",
          shape: "circle",
          style: {
            border: `2px solid ${cssVariables.colorPrimary}40`,
            boxShadow: `0 2px 6px ${cssVariables.colorPrimary}20`,
            transition: "all 0.2s ease",
            cursor: "pointer",
          },
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
                      {userInfo?.given_name || "Guest"}
                    </Typography.Text>
                    <Typography.Text
                      type="secondary"
                      style={{
                        fontSize: "11px",
                        lineHeight: "14px",
                        fontWeight: 400,
                      }}
                    >
                      <span>{userInfo?.preferred_username || "guest"}</span>
                    </Typography.Text>
                  </Flex>
                </Flex>
              </Dropdown>
            );
          },
        }}
        headerTitleRender={(logo, title) => (
          <Link to="/dashboard">
            {logo}
            {title}
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
              if (item?.path !== "#") {
                navigate(item.path || "/dashboard");
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
