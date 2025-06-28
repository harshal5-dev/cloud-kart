import { useEffect, useState } from "react";
import {
  LogoutOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Dropdown, Typography } from "antd";
import { MdCategory, MdDashboard, MdViewModule } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router";
import { FaImage, FaUserCircle, FaUsers } from "react-icons/fa";
import ProLayout, { PageContainer } from "@ant-design/pro-layout";
import { AiFillProduct } from "react-icons/ai";

import ToggleTheme from "./ToggleTheme";
import { cssVariables } from "../../config/themeConfig";
import { useKeycloak } from "../../hooks/useKeycloak";
import AppRoutes from "../../routes";
import AuthWrapper from "../AuthWrapper";

const { Text } = Typography;

const getAvatar = () => {
  return "/assets/images/avatarMale.svg";
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
            colorTextMenuSelected: cssVariables.colorSelected,
            colorTextMenuItemHover: cssVariables.hoverColor,
            colorBgMenuItemSelected: cssVariables.colorBgSelected,
          },
        }}
        avatarProps={{
          src: getAvatar(),
          size: "small",
          title: userInfo?.given_name || "Guest",
          render: (_, dom) => {
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
        menuItemRender={(item, dom) => (
          <div
            onClick={() => {
              if (item?.path !== "#") {
                navigate(item.path || "/dashboard");
              }
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
