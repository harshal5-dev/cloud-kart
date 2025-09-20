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
  BellOutlined,
  SearchOutlined,
  GlobalOutlined,
  SafetyOutlined,
  CustomerServiceOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  LoadingOutlined,
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
  Badge,
  Input,
  Divider,
  Card,
  Flex,
  Tag,
  Spin,
} from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { FaUserCircle } from "react-icons/fa";
import SearchProduct from "./searchProduct/SearchProduct";
import HeaderCart from "../HeaderCart";
import { cssVariables } from "../../config/themeConfig";
import {
  initializeLogoTheme,
  injectLogoStyles,
} from "../../utils/logoThemeAdapter";

const { Footer } = Layout;
const { Title, Text } = Typography;

// Enhanced route configuration
const route = {
  path: "/",
  routes: [
    {
      path: "#",
      name: "Navigation",
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
    {
      path: "/wishlist",
      name: "Wishlist",
      icon: <HeartOutlined />,
    },
  ],
};

const AppLayout = () => {
  const [pathname, setPathname] = useState("");
  const [userLoading] = useState(false); // Mock loading state for consistency

  const navigate = useNavigate();
  const location = useLocation();

  // Mock user profile for consistency with admin
  const userProfile = {
    firstName: "Guest",
    lastName: "User",
    username: "guest",
    roles: ["Customer"],
    profilePictureUrl: null,
  };

  const getAvatar = (userProfile) => {
    return userProfile?.profilePictureUrl || "/assets/images/user.svg";
  };

  async function handleLogout() {
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
                {userProfile?.roles[0] || "Customer"}
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
      key: "orders",
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
                backgroundColor: `${cssVariables.colorInfo}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShoppingOutlined
                style={{ color: cssVariables.colorInfo, fontSize: "14px" }}
              />
            </div>
            <Flex vertical gap={0}>
              <Typography.Text style={{ fontSize: "13px", fontWeight: 600 }}>
                My Orders
              </Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: "11px" }}>
                Track your orders
              </Typography.Text>
            </Flex>
          </Flex>
        </div>
      ),
      onClick: () => navigate("/orders"),
    },
    {
      key: "wishlist",
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
                backgroundColor: `${cssVariables.colorMagenta}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HeartOutlined
                style={{ color: cssVariables.colorMagenta, fontSize: "14px" }}
              />
            </div>
            <Flex vertical gap={0}>
              <Typography.Text style={{ fontSize: "13px", fontWeight: 600 }}>
                My Wishlist
              </Typography.Text>
              <Typography.Text type="secondary" style={{ fontSize: "11px" }}>
                Saved items
              </Typography.Text>
            </Flex>
          </Flex>
        </div>
      ),
      onClick: () => navigate("/wishlist"),
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

  // Set CSS variables for theme-adaptive logo
  useEffect(() => {
    const cleanupTheme = initializeLogoTheme(cssVariables);
    const cleanupStyles = injectLogoStyles();

    return () => {
      cleanupTheme();
      cleanupStyles();
    };
  }, []);

  useEffect(() => {
    if (location.pathname !== "#") {
      setPathname(location.pathname);
    }
  }, [location.pathname]);

  return (
    <ProLayout
      title="Cloud Kart"
      logo="/assets/images/cloud-kart-logo-ultimate.svg"
      fixSiderbar
      route={route}
      siderWidth={240}
      layout="mix"
      ghost
      location={{
        pathname,
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
          colorHeaderTitle: cssVariables.colorText,
          colorBgHeader: cssVariables.containerBackground,
          colorTextHeading: cssVariables.colorText,
        },
        pageContainer: {
          paddingInlinePageContainerContent: 20,
          paddingBlockPageContainerContent: 20,
          colorBgPageContainer: cssVariables.containerBackground,
        },
      }}
      headerContentRender={() => (
        <SearchProduct placeholder="Search for products, brands, categories..." />
      )}
      actionsRender={() => [
        <Tooltip title="Shopping Cart" key="cart">
          <HeaderCart />
        </Tooltip>,
      ]}
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
          to="/"
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
                  fontSize: "10px",
                  lineHeight: "14px",
                  fontWeight: 500,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                Shop Smart, Live Better
              </Typography.Text>
            </Flex>
          </Flex>
        </Link>
      )}
      menuItemRender={(item, dom) => (
        <div
          onClick={() => {
            if (item?.path !== "/#" && !item?.disabled) {
              navigate(item.path || "/");
            }
          }}
          style={{
            cursor: item?.disabled ? "not-allowed" : "pointer",
            opacity: item?.disabled ? 0.6 : 1,
            transition: "all 0.2s ease",
          }}
        >
          {dom}
        </div>
      )}
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
          background: cssVariables.headerGradientPrimary,
          color: cssVariables.colorWhite,
          marginTop: 60,
        }}
      >
        <div style={{ padding: "40px 0" }}>
          <Row gutter={[32, 32]}>
            <Col xs={24} sm={24} md={8}>
              <Space direction="vertical" size={16}>
                <div>
                  <Title
                    level={4}
                    style={{
                      color: cssVariables.colorWhite,
                      marginBottom: 8,
                      fontWeight: cssVariables.fontWeightBold,
                    }}
                  >
                    CloudKart
                  </Title>
                  <Text
                    style={{
                      color: cssVariables.whiteTransparent90,
                      fontSize: cssVariables.fontSizeRegular,
                      lineHeight: 1.6,
                    }}
                  >
                    Your trusted e-commerce partner for quality products and
                    exceptional service. We bring you the best shopping
                    experience with unmatched customer support.
                  </Text>
                </div>
                <Space size="large">
                  <Tooltip title="Follow us on Facebook">
                    <FacebookOutlined
                      style={{
                        color: cssVariables.colorWhite,
                        fontSize: 20,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = cssVariables.colorSecondary;
                        e.target.style.transform = "scale(1.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = cssVariables.colorWhite;
                        e.target.style.transform = "scale(1)";
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Follow us on Twitter">
                    <TwitterOutlined
                      style={{
                        color: cssVariables.colorWhite,
                        fontSize: 20,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = cssVariables.colorInfo;
                        e.target.style.transform = "scale(1.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = cssVariables.colorWhite;
                        e.target.style.transform = "scale(1)";
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Follow us on Instagram">
                    <InstagramOutlined
                      style={{
                        color: cssVariables.colorWhite,
                        fontSize: 20,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = cssVariables.colorMagenta;
                        e.target.style.transform = "scale(1.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = cssVariables.colorWhite;
                        e.target.style.transform = "scale(1)";
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Connect on LinkedIn">
                    <LinkedinOutlined
                      style={{
                        color: cssVariables.colorWhite,
                        fontSize: 20,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = cssVariables.colorInfo;
                        e.target.style.transform = "scale(1.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = cssVariables.colorWhite;
                        e.target.style.transform = "scale(1)";
                      }}
                    />
                  </Tooltip>
                </Space>
              </Space>
            </Col>

            <Col xs={24} sm={8} md={4}>
              <Title
                level={5}
                style={{
                  color: cssVariables.colorWhite,
                  marginBottom: 20,
                  fontWeight: cssVariables.fontWeightBold,
                }}
              >
                Quick Links
              </Title>
              <Space direction="vertical" size={12}>
                <Link
                  to="/"
                  style={{
                    color: cssVariables.whiteTransparent90,
                    fontSize: cssVariables.fontSizeRegular,
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = cssVariables.colorWhite;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = cssVariables.whiteTransparent90;
                  }}
                >
                  Home
                </Link>
                <Link
                  to="/categories"
                  style={{
                    color: cssVariables.whiteTransparent90,
                    fontSize: cssVariables.fontSizeRegular,
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = cssVariables.colorWhite;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = cssVariables.whiteTransparent90;
                  }}
                >
                  Categories
                </Link>
                <Link
                  to="/products"
                  style={{
                    color: cssVariables.whiteTransparent90,
                    fontSize: cssVariables.fontSizeRegular,
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = cssVariables.colorWhite;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = cssVariables.whiteTransparent90;
                  }}
                >
                  Products
                </Link>
                <Link
                  to="/about"
                  style={{
                    color: cssVariables.whiteTransparent90,
                    fontSize: cssVariables.fontSizeRegular,
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = cssVariables.colorWhite;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = cssVariables.whiteTransparent90;
                  }}
                >
                  About Us
                </Link>
              </Space>
            </Col>

            <Col xs={24} sm={8} md={4}>
              <Title
                level={5}
                style={{
                  color: cssVariables.colorWhite,
                  marginBottom: 20,
                  fontWeight: cssVariables.fontWeightBold,
                }}
              >
                Customer Service
              </Title>
              <Space direction="vertical" size={12}>
                <Link
                  to="/contact"
                  style={{
                    color: cssVariables.whiteTransparent90,
                    fontSize: cssVariables.fontSizeRegular,
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = cssVariables.colorWhite;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = cssVariables.whiteTransparent90;
                  }}
                >
                  <CustomerServiceOutlined style={{ marginRight: 8 }} />
                  Contact Us
                </Link>
                <Link
                  to="/shipping"
                  style={{
                    color: cssVariables.whiteTransparent90,
                    fontSize: cssVariables.fontSizeRegular,
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = cssVariables.colorWhite;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = cssVariables.whiteTransparent90;
                  }}
                >
                  <GlobalOutlined style={{ marginRight: 8 }} />
                  Shipping Info
                </Link>
                <Link
                  to="/returns"
                  style={{
                    color: cssVariables.whiteTransparent90,
                    fontSize: cssVariables.fontSizeRegular,
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = cssVariables.colorWhite;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = cssVariables.whiteTransparent90;
                  }}
                >
                  <SafetyOutlined style={{ marginRight: 8 }} />
                  Returns
                </Link>
                <Link
                  to="/faq"
                  style={{
                    color: cssVariables.whiteTransparent90,
                    fontSize: cssVariables.fontSizeRegular,
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = cssVariables.colorWhite;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = cssVariables.whiteTransparent90;
                  }}
                >
                  Help & FAQ
                </Link>
              </Space>
            </Col>

            <Col xs={24} sm={8} md={8}>
              <Title
                level={5}
                style={{
                  color: cssVariables.colorWhite,
                  marginBottom: 20,
                  fontWeight: cssVariables.fontWeightBold,
                }}
              >
                Contact Information
              </Title>
              <Space direction="vertical" size={16}>
                <Space>
                  <PhoneOutlined
                    style={{
                      color: cssVariables.colorSecondary,
                      fontSize: 16,
                    }}
                  />
                  <Text
                    style={{
                      color: cssVariables.whiteTransparent90,
                      fontSize: cssVariables.fontSizeRegular,
                    }}
                  >
                    +1 (555) 123-4567
                  </Text>
                </Space>
                <Space>
                  <MailOutlined
                    style={{
                      color: cssVariables.colorSecondary,
                      fontSize: 16,
                    }}
                  />
                  <Text
                    style={{
                      color: cssVariables.whiteTransparent90,
                      fontSize: cssVariables.fontSizeRegular,
                    }}
                  >
                    support@cloudkart.com
                  </Text>
                </Space>
                <Space align="start">
                  <EnvironmentOutlined
                    style={{
                      color: cssVariables.colorSecondary,
                      fontSize: 16,
                      marginTop: 2,
                    }}
                  />
                  <Text
                    style={{
                      color: cssVariables.whiteTransparent90,
                      fontSize: cssVariables.fontSizeRegular,
                      lineHeight: 1.5,
                    }}
                  >
                    123 Commerce Street
                    <br />
                    Business District
                    <br />
                    City, State 12345
                  </Text>
                </Space>
              </Space>
            </Col>
          </Row>

          <Divider
            style={{
              borderColor: cssVariables.whiteTransparent30,
              margin: "40px 0 24px 0",
            }}
          />

          <Row justify="space-between" align="middle">
            <Col
              xs={24}
              md={12}
              style={{ textAlign: { xs: "center", md: "left" } }}
            >
              <Text
                style={{
                  color: cssVariables.whiteTransparent90,
                  fontSize: cssVariables.fontSizeRegular,
                }}
              >
                © 2025 CloudKart. All rights reserved.
              </Text>
            </Col>
            <Col
              xs={24}
              md={12}
              style={{ textAlign: { xs: "center", md: "right" } }}
            >
              <Space>
                <Link
                  to="/privacy"
                  style={{
                    color: cssVariables.whiteTransparent90,
                    fontSize: cssVariables.fontSizeSmall,
                    textDecoration: "none",
                  }}
                >
                  Privacy Policy
                </Link>
                <Text style={{ color: cssVariables.whiteTransparent30 }}>
                  |
                </Text>
                <Link
                  to="/terms"
                  style={{
                    color: cssVariables.whiteTransparent90,
                    fontSize: cssVariables.fontSizeSmall,
                    textDecoration: "none",
                  }}
                >
                  Terms of Service
                </Link>
                <Text style={{ color: cssVariables.whiteTransparent30 }}>
                  |
                </Text>
                <Link
                  to="/cookies"
                  style={{
                    color: cssVariables.whiteTransparent90,
                    fontSize: cssVariables.fontSizeSmall,
                    textDecoration: "none",
                  }}
                >
                  Cookie Policy
                </Link>
              </Space>
            </Col>
          </Row>
        </div>
      </Footer>
    </ProLayout>
  );
};

export default AppLayout;
