import { useState, useEffect } from "react";
import { ProLayout } from "@ant-design/pro-layout";
import { MdViewModule } from "react-icons/md";
import {
  LogoutOutlined,
  UserOutlined,
  HomeOutlined,
  AppstoreOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import {
  Button,
  Avatar,
  Tooltip,
  Space,
  Typography,
  Row,
  Col,
  Dropdown,
  Layout,
} from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import SearchProduct from "./searchProduct/SearchProduct";
import HeaderCart from "../HeaderCart";
import { cssVariables } from "../../config/themeConfig";

const { Footer } = Layout;
const { Title, Text } = Typography;

// Route configuration for ProLayout
const route = {
  path: "/",
  routes: [
    {
      path: "#",
      name: "Menu",
      icon: <MdViewModule />,
      disabled: true,
    },
    {
      path: "/",
      name: "Home",
      icon: <HomeOutlined />,
    },
    {
      path: "/categories",
      name: "Categories",
      icon: <AppstoreOutlined />,
    },
    {
      path: "/products",
      name: "Products",
      icon: <ShoppingOutlined />,
    },
    {
      path: "/cart",
      name: "Cart",
      icon: <ShoppingCartOutlined />,
    },
  ],
};

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [pathname, setPathname] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogout() {
    navigate("/");
  }

  const userMenu = {
    items: [
      {
        key: "profile",
        label: <Link to="/profile">My Profile</Link>,
        icon: <UserOutlined />,
      },
      {
        key: "orders",
        label: <Link to="/orders">My Orders</Link>,
        icon: <ShoppingOutlined />,
      },
      {
        key: "wishlist",
        label: <Link to="/wishlist">Wishlist</Link>,
        icon: <HeartOutlined />,
      },
      { type: "divider" },
      {
        key: "logout",
        label: "Logout",
        onClick: handleLogout,
        icon: <LogoutOutlined />,
      },
    ],
  };

  useEffect(() => {
    if (location.pathname !== "#") {
      setPathname(location.pathname);
    }
  }, [location.pathname]);

  useEffect(() => {
    setCollapsed(true);
  }, []);

  return (
    <ProLayout
      title="Cloud Kart"
      logo="/logo.svg"
      route={route}
      fixSiderbar
      location={{
        pathname,
      }}
      ghost
      collapsed={collapsed}
      onCollapse={setCollapsed}
      menuItemRender={(item, dom) => {
        return (
          <div
            onClick={() => {
              navigate(item.path || "/");
            }}
            className={`${item?.disabled ? "pointer-events-none" : ""}`}
          >
            {dom}
          </div>
        );
      }}
      layout="mix"
      headerTitleRender={(logo, title) => (
        <Link to="/">
          {logo}
          {title}
        </Link>
      )}
      siderWidth={230}
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
      headerContentRender={() => (
        <SearchProduct placeholder="Search for products, brands, categories..." />
      )}
      actionsRender={() => [
        <div
          key="actions-wrapper"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <Tooltip title="Shopping Cart">
            <HeaderCart />
          </Tooltip>
        </div>,
        <Dropdown menu={userMenu} trigger={["click"]}>
          <Button
            type="text"
            style={{
              display: "flex",
              alignItems: "center",
              height: "40px",
              padding: "0 12px",
              borderRadius: "8px",
              border: "1px solid #f0f0f0",
              backgroundColor: "#fafafa",
            }}
          >
            <Avatar
              size="small"
              style={{ backgroundColor: "#10b981", marginRight: 8 }}
            >
              <UserOutlined />
            </Avatar>
            <span
              style={{
                display: window.innerWidth >= 768 ? "inline" : "none",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Account
            </span>
          </Button>
        </Dropdown>,
      ]}
      menuHeaderRender={false}
      style={{
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          minHeight: "calc(100vh - 64px)",
          paddingBottom: window.innerWidth < 768 ? 70 : 0, // Add padding for mobile bottom nav
        }}
      >
        <Outlet />
      </div>

      {/* Footer */}
      <Footer
        style={{
          background: "#001529",
          color: "white",
          marginTop: 40,
          paddingBottom: window.innerWidth < 768 ? 80 : 20,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Row gutter={[32, 32]}>
            <Col xs={24} sm={12} md={6}>
              <Title level={4} style={{ color: "white", marginBottom: 16 }}>
                CloudKart
              </Title>
              <Space direction="vertical" size={8}>
                <Text style={{ color: "#bfbfbf", fontSize: 14 }}>
                  Your trusted e-commerce partner for quality products and
                  exceptional service.
                </Text>
                <Space>
                  <FacebookOutlined
                    style={{ color: "#10b981", fontSize: 18 }}
                  />
                  <TwitterOutlined style={{ color: "#10b981", fontSize: 18 }} />
                  <InstagramOutlined
                    style={{ color: "#10b981", fontSize: 18 }}
                  />
                  <LinkedinOutlined
                    style={{ color: "#10b981", fontSize: 18 }}
                  />
                </Space>
              </Space>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Title level={5} style={{ color: "white", marginBottom: 16 }}>
                Quick Links
              </Title>
              <Space direction="vertical" size={8}>
                <Link to="/" style={{ color: "#bfbfbf", fontSize: 14 }}>
                  Home
                </Link>
                <Link
                  to="/categories"
                  style={{ color: "#bfbfbf", fontSize: 14 }}
                >
                  Categories
                </Link>
                <Link to="/products" style={{ color: "#bfbfbf", fontSize: 14 }}>
                  Products
                </Link>
                <Link to="/about" style={{ color: "#bfbfbf", fontSize: 14 }}>
                  About Us
                </Link>
              </Space>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Title level={5} style={{ color: "white", marginBottom: 16 }}>
                Customer Service
              </Title>
              <Space direction="vertical" size={8}>
                <Link to="/contact" style={{ color: "#bfbfbf", fontSize: 14 }}>
                  Contact Us
                </Link>
                <Link to="/shipping" style={{ color: "#bfbfbf", fontSize: 14 }}>
                  Shipping Info
                </Link>
                <Link to="/returns" style={{ color: "#bfbfbf", fontSize: 14 }}>
                  Returns
                </Link>
                <Link to="/faq" style={{ color: "#bfbfbf", fontSize: 14 }}>
                  FAQ
                </Link>
              </Space>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Title level={5} style={{ color: "white", marginBottom: 16 }}>
                Contact Info
              </Title>
              <Space direction="vertical" size={8}>
                <Text style={{ color: "#bfbfbf", fontSize: 14 }}>
                  📞 +1 (555) 123-4567
                </Text>
                <Text style={{ color: "#bfbfbf", fontSize: 14 }}>
                  ✉️ support@cloudkart.com
                </Text>
                <Text style={{ color: "#bfbfbf", fontSize: 14 }}>
                  📍 123 Commerce St, City, State 12345
                </Text>
              </Space>
            </Col>
          </Row>
          <div
            style={{
              textAlign: "center",
              marginTop: 32,
              paddingTop: 24,
              borderTop: "1px solid #434343",
            }}
          >
            <Text style={{ color: "#8c8c8c", fontSize: 14 }}>
              © 2025 CloudKart. All rights reserved.
            </Text>
          </div>
        </div>
      </Footer>
    </ProLayout>
  );
};

export default AppLayout;
