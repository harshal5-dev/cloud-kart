import { cloneElement } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Statistic,
  Typography,
  Progress,
  Badge,
  Flex,
  Avatar,
} from "antd";
import { AiFillProduct } from "react-icons/ai";
import { MdCategory, MdTrendingUp, MdInventory } from "react-icons/md";
import { RiRefreshFill, RiShoppingBagLine } from "react-icons/ri";
import {
  PlusCircleFilled,
  ShoppingCartOutlined,
  DollarCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";

import { useGetCategoryCountQuery } from "../category/categoryApi";
import { useGetProductCountQuery } from "../product/productApi";
import { cssVariables } from "../../config/themeConfig";

const { Text, Title } = Typography;

const Dashboard = () => {
  const categoryResponse = useGetCategoryCountQuery();
  const {
    data: categoryCount,
    isLoading: isCategoryLoading,
    refetch: refetchCategory,
  } = categoryResponse;
  const productResponse = useGetProductCountQuery();
  const {
    data: productCount,
    isLoading: isProductLoading,
    refetch: refetchProduct,
  } = productResponse;
  const navigate = useNavigate();

  // Mock data for demo purposes - replace with real API calls
  const mockStats = {
    totalSales: 24567,
    monthlyRevenue: 85432,
    activeOrders: 156,
    lowStockItems: 23,
    conversionRate: 3.2,
    averageOrderValue: 127.5,
  };

  const StatCard = ({
    title,
    value,
    icon,
    color,
    trend,
    subtitle,
    loading,
    actions,
  }) => {
    return (
      <Card
        style={{
          height: "100%",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        styles={{
          body: {
            padding: "18px",
            borderRadius: "inherit",
          },
        }}
        className="dashboard-stat-card"
      >
        <Flex justify="space-between" align="flex-start" wrap="wrap" gap={8}>
          <Flex vertical gap={8} flex={1} style={{ minWidth: 0 }}>
            <Flex align="center" gap={8} wrap="wrap">
              <Avatar
                size={32}
                style={{
                  color: color,
                  flexShrink: 0,
                  backgroundColor: color + "65",
                }}
                icon={icon}
              />
              <Flex vertical gap={2} style={{ minWidth: 0 }}>
                <Text
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: 1.3,
                  }}
                >
                  {title}
                </Text>
                {subtitle && (
                  <Text
                    type="secondary"
                    style={{
                      fontSize: "12px",
                      lineHeight: 1.2,
                      opacity: 0.8,
                    }}
                  >
                    {subtitle}
                  </Text>
                )}
              </Flex>
            </Flex>

            <Statistic
              value={value}
              loading={loading}
              valueStyle={{
                fontSize: "clamp(22px, 4.5vw, 30px)",
                fontWeight: "bold",
                color: color,
                lineHeight: 1.2,
              }}
              precision={typeof value === "number" && value % 1 !== 0 ? 2 : 0}
              prefix={
                title.includes("Revenue") || title.includes("Value") ? "$" : ""
              }
            />

            {trend && (
              <Flex
                align="center"
                gap={6}
                style={{
                  padding: "6px 12px",
                  transition: "all 0.3s ease",
                }}
              >
                <Badge
                  status={trend > 0 ? "success" : "error"}
                  text={
                    <Text
                      style={{
                        fontSize: "13px",
                        color:
                          trend > 0
                            ? cssVariables.colorSuccess
                            : cssVariables.colorError,
                        lineHeight: 1.2,
                        fontWeight: 500,
                      }}
                    >
                      {trend > 0 ? "+" : ""}
                      {trend}% vs last month
                    </Text>
                  }
                />
              </Flex>
            )}
          </Flex>

          {actions && (
            <Flex vertical gap={4} style={{ flexShrink: 0 }}>
              {actions.map((action, index) =>
                cloneElement(action, {
                  key: action.key || index,
                  size: "small",
                })
              )}
            </Flex>
          )}
        </Flex>
      </Card>
    );
  };

  return (
    <div
      style={{
        padding: "10px 0 0 0",
      }}
    >
      {/* Header Section */}
      <Card
        style={{
          marginBottom: 24,
          background: `linear-gradient(135deg, ${cssVariables.colorPrimary} 0%, ${cssVariables.colorTitle} 100%)`,
          padding: 0,
        }}
      >
        <Flex justify="space-between" align="flex-start" wrap="wrap" gap={16}>
          <Flex vertical gap={8} style={{ minWidth: 0, flex: "1 1 300px" }}>
            <Title
              level={2}
              style={{
                margin: 0,
                fontSize: "clamp(18px, 5.5vw, 28px)",
                fontWeight: 600,
                lineHeight: 1.2,
                wordBreak: "break-word",
                color: cssVariables.colorWhite,
              }}
            >
              Welcome to CloudKart Management Portal
            </Title>
            <Text
              style={{
                fontSize: "clamp(13px, 4vw, 15px)",
                lineHeight: 1.4,
                color: cssVariables.colorWhite,
                opacity: 0.7,
              }}
            >
              Monitor your e-commerce performance and manage your store
            </Text>
          </Flex>

          <Flex
            gap={8}
            wrap="wrap"
            style={{
              flex: "0 0 auto",
              justifyContent: "flex-end",
              width: "100%",
              maxWidth: "300px",
            }}
          >
            <Button
              type="primary"
              icon={<PlusCircleFilled />}
              size="small"
              style={{
                background: cssVariables.whiteTransparent25,
                border: `1px solid ${cssVariables.whiteTransparent40}`,
                color: cssVariables.colorWhite,
                fontSize: "13px",
                height: "34px",
                minWidth: "120px",
                transition: "all 0.3s ease",
              }}
              onClick={() => navigate("/products")}
            >
              Add Product
            </Button>
            <Button
              icon={<MdCategory />}
              size="small"
              style={{
                background: cssVariables.whiteTransparent25,
                border: `1px solid ${cssVariables.whiteTransparent40}`,
                color: cssVariables.colorWhite,
                fontSize: "13px",
                height: "34px",
                minWidth: "120px",
                transition: "all 0.3s ease",
              }}
              onClick={() => navigate("/categories")}
            >
              Manage Categories
            </Button>
          </Flex>
        </Flex>
      </Card>

      {/* Main Stats Grid */}
      <Row gutter={[16, 16]}>
        {/* Primary Stats */}
        <Col xs={24} sm={12} md={12} lg={6}>
          <StatCard
            title="Total Products"
            value={productCount}
            icon={<AiFillProduct />}
            color={cssVariables.colorPrimary}
            trend={12.5}
            subtitle="Active listings"
            loading={isProductLoading}
            actions={[
              <Button
                key="add"
                type="text"
                size="small"
                icon={<PlusCircleFilled />}
                style={{ color: cssVariables.colorPrimary }}
                onClick={() => navigate("/products")}
              />,
              <Button
                key="refresh"
                type="text"
                size="small"
                icon={<RiRefreshFill />}
                style={{ color: cssVariables.colorPrimary }}
                onClick={() => refetchProduct()}
              />,
            ]}
          />
        </Col>

        <Col xs={24} sm={12} md={12} lg={6}>
          <StatCard
            title="Categories"
            value={categoryCount}
            icon={<MdCategory />}
            color={cssVariables.colorTitle}
            trend={8.3}
            subtitle="Product categories"
            loading={isCategoryLoading}
            actions={[
              <Button
                key="add"
                type="text"
                size="small"
                icon={<PlusCircleFilled />}
                style={{ color: cssVariables.colorTitle }}
                onClick={() => navigate("/categories")}
              />,
              <Button
                key="refresh"
                type="text"
                size="small"
                icon={<RiRefreshFill />}
                style={{ color: cssVariables.colorTitle }}
                onClick={() => refetchCategory()}
              />,
            ]}
          />
        </Col>

        <Col xs={24} sm={12} md={12} lg={6}>
          <StatCard
            title="Monthly Revenue"
            value={mockStats.monthlyRevenue}
            icon={<DollarCircleOutlined />}
            color={cssVariables.colorSecondary}
            trend={15.7}
            subtitle="This month"
          />
        </Col>

        <Col xs={24} sm={12} md={12} lg={6}>
          <StatCard
            title="Active Orders"
            value={mockStats.activeOrders}
            icon={<ShoppingCartOutlined />}
            color={cssVariables.colorOrange}
            trend={-2.1}
            subtitle="Pending fulfillment"
          />
        </Col>

        {/* Secondary Stats */}
        <Col xs={24} sm={12} md={12} lg={6}>
          <StatCard
            title="Total Sales"
            value={mockStats.totalSales}
            icon={<MdTrendingUp />}
            color={cssVariables.colorPurple}
            trend={23.1}
            subtitle="All time"
          />
        </Col>

        <Col xs={24} sm={12} md={12} lg={6}>
          <StatCard
            title="Low Stock Items"
            value={mockStats.lowStockItems}
            icon={<MdInventory />}
            color={cssVariables.colorMagenta}
            trend={-5.2}
            subtitle="Needs restocking"
          />
        </Col>

        <Col xs={24} sm={12} md={12} lg={6}>
          <StatCard
            title="Conversion Rate"
            value={mockStats.conversionRate}
            icon={<EyeOutlined />}
            color={cssVariables.colorPurple}
            trend={1.8}
            subtitle="Visitors to buyers"
          />
        </Col>

        <Col xs={24} sm={12} md={12} lg={6}>
          <StatCard
            title="Avg Order Value"
            value={mockStats.averageOrderValue}
            icon={<RiShoppingBagLine />}
            color={cssVariables.colorOrange}
            trend={7.4}
            subtitle="Per transaction"
          />
        </Col>
      </Row>

      {/* Performance Overview */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={16}>
          <Card
            title={
              <Flex align="center" gap={8}>
                <Avatar
                  size="small"
                  style={{
                    backgroundColor: cssVariables.colorPrimary + "55",
                    color: cssVariables.colorPrimary,
                  }}
                  icon={<MdTrendingUp />}
                />
                <Title
                  level={5}
                  style={{
                    margin: 0,
                    fontSize: "clamp(15px, 3.5vw, 18px)",
                  }}
                >
                  Performance Overview
                </Title>
              </Flex>
            }
            style={{
              transition: "all 0.3s ease",
            }}
            styles={{ body: { padding: "16px" } }}
          >
            <Row gutter={[12, 16]}>
              <Col xs={24} sm={12}>
                <Flex vertical gap={8}>
                  <Text
                    type="secondary"
                    style={{
                      fontSize: "13px",
                      color: cssVariables.colorTextSecondary,
                      fontWeight: 500,
                    }}
                  >
                    Sales Performance
                  </Text>
                  <Progress
                    percent={78}
                    strokeColor={cssVariables.colorSecondary}
                    trailColor={cssVariables.colorSecondary + "20"}
                    size="small"
                  />
                </Flex>
              </Col>
              <Col xs={24} sm={12}>
                <Flex vertical gap={8}>
                  <Text
                    type="secondary"
                    style={{
                      fontSize: "13px",
                      color: cssVariables.colorTextSecondary,
                      fontWeight: 500,
                    }}
                  >
                    Inventory Health
                  </Text>
                  <Progress
                    percent={92}
                    strokeColor={cssVariables.colorPrimary}
                    trailColor={cssVariables.colorPrimary + "20"}
                    size="small"
                  />
                </Flex>
              </Col>
              <Col xs={24} sm={12}>
                <Flex vertical gap={8}>
                  <Text
                    type="secondary"
                    style={{
                      fontSize: "13px",
                      color: cssVariables.colorTextSecondary,
                      fontWeight: 500,
                    }}
                  >
                    Customer Satisfaction
                  </Text>
                  <Progress
                    percent={85}
                    strokeColor={cssVariables.colorTitle}
                    trailColor={cssVariables.colorTitle + "20"}
                    size="small"
                  />
                </Flex>
              </Col>
              <Col xs={24} sm={12}>
                <Flex vertical gap={8}>
                  <Text
                    type="secondary"
                    style={{
                      fontSize: "13px",
                      color: cssVariables.colorTextSecondary,
                      fontWeight: 500,
                    }}
                  >
                    Order Fulfillment
                  </Text>
                  <Progress
                    percent={96}
                    strokeColor={cssVariables.colorOrange}
                    trailColor={cssVariables.colorOrange + "20"}
                    size="small"
                  />
                </Flex>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={
              <Flex align="center" gap={8}>
                <Avatar
                  size="small"
                  style={{
                    backgroundColor: cssVariables.colorSecondary + "65",
                    color: cssVariables.colorSecondary,
                  }}
                  icon={<RiShoppingBagLine />}
                />
                <Title
                  level={5}
                  style={{
                    margin: 0,
                    fontSize: "clamp(15px, 3.5vw, 18px)",
                  }}
                >
                  Quick Actions
                </Title>
              </Flex>
            }
            style={{
              transition: "all 0.3s ease",
            }}
            styles={{ body: { padding: "16px" } }}
          >
            <Flex vertical gap={10}>
              <Button
                block
                icon={<PlusCircleFilled />}
                variant="solid"
                color="primary"
                onClick={() => navigate("/products/create")}
              >
                Add New Product
              </Button>

              <Button
                block
                icon={<MdCategory />}
                variant="solid"
                color="gold"
                onClick={() => navigate("/categories/create")}
              >
                Create Category
              </Button>

              <Button
                block
                icon={<EyeOutlined />}
                variant="solid"
                color="green"
                onClick={() => navigate("/products")}
              >
                View All Products
              </Button>
            </Flex>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
