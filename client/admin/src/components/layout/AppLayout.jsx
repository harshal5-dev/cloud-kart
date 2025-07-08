import { useEffect, useState } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { Dropdown, Spin, Typography } from "antd";
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
import { useGetUserProfileQuery } from "../../pages/users/usersApi";

const { Text } = Typography;

const getAvatar = () => {
  return "/assets/images/developer.svg";
};

const route = {
  path: "/",
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
      access: "canManage",
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
      access: "canManage",
    },
    {
      name: "Products",
      path: "/products",
      icon: <AiFillProduct />,
      access: "canManage",
    },
  ],
};

const AppLayout = () => {
  const [pathname, setPathname] = useState("");
  const { logout, isAuthenticated } = useKeycloak();
  const {
    data: userData,
    isLoading,
    isError,
  } = useGetUserProfileQuery(undefined, {
    skip: !isAuthenticated,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const userRoles = userData?.roles || [];

  const hasAccess = (access) => {
    if (!access) return true;

    const roleMap = {
      canAdmin: ["ADMIN"],
      canManage: ["ADMIN", "MANAGER"],
    };

    const requiredRoles = roleMap[access] || [];
    return requiredRoles.some((role) => userRoles.includes(role));
  };

  const filterRoutesByRole = (routes) => {
    return routes.filter((route) => {
      if (route.access && !hasAccess(route.access)) {
        return false;
      }
      if (route.routes) {
        route.routes = filterRoutesByRole(route.routes);
      }

      return true;
    });
  };

  const filteredRoute = {
    ...route,
    routes: filterRoutesByRole(route.routes),
  };

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
      label: "My Account",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "profile",
      label: "Profile",
      icon: <FaUserCircle />,
      onClick: handleProfile,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
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
            colorTextMenuSelected: cssVariables.colorSelected,
            colorTextMenuItemHover: cssVariables.hoverColor,
            colorBgMenuItemSelected: cssVariables.colorBgSelected,
          },
          pageContainer: {
            paddingInlinePageContainerContent: 25,
          },
        }}
        avatarProps={{
          src: getAvatar(),
          size: "small",
          shape: "square",
          title: userData?.firstName || "Guest",
          render: (_, dom) => {
            if (isLoading) {
              return <Spin size="small" className="flex items-center" />;
            }
            if (isError) {
              return (
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "retry",
                        label: "Retry",
                        onClick: () => window.location.reload(),
                      },
                    ],
                  }}
                  trigger={["click"]}
                >
                  <Text
                    type="danger"
                    className="flex items-center cursor-pointer"
                  >
                    Failed to load user&nbsp;
                    <span role="img" aria-label="error">
                      ⚠️
                    </span>
                  </Text>
                </Dropdown>
              );
            }
            return (
              <Dropdown
                menu={{
                  items: userMenuItems,
                }}
              >
                {dom}
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
            <div className="text-center">
              <Text type="secondary">
                Cloud Kart ©{new Date().getFullYear()} created by Harshal
              </Text>
            </div>
          );
        }}
        menuItemRender={(item, dom) => {
          return (
            <div
              onClick={() => {
                navigate(item.path || "/dashboard");
              }}
              className={`${item?.disabled ? "pointer-events-none" : ""}`}
            >
              {dom}
            </div>
          );
        }}
      >
        <AppRoutes />
      </ProLayout>
    </AuthWrapper>
  );
};

export default AppLayout;
