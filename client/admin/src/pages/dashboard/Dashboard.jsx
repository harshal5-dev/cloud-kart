import {
  Button,
  Card,
  Col,
  Row,
  Space,
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
  }) => (
    <Card
      style={{
        height: "100%",
        background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
        border: `1px solid ${color}20`,
        borderRadius: 12,
        boxShadow: `0 4px 12px ${color}10`,
      }}
      styles={{ body: { padding: "20px" } }}
    >
      <Flex justify="space-between" align="flex-start">
        <Flex vertical gap={8} flex={1}>
          <Flex align="center" gap={12}>
            <Avatar
              size={36}
              style={{
                backgroundColor: `${color}15`,
                color: color,
                border: `2px solid ${color}30`,
              }}
              icon={icon}
            />
            <Flex vertical gap={4}>
              <Text
                type="secondary"
                style={{ fontSize: "13px", fontWeight: 500 }}
              >
                {title}
              </Text>
              {subtitle && (
                <Text
                  style={{
                    fontSize: "11px",
                    color: cssVariables.colorSecondary,
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
              fontSize: "28px",
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
            <Flex align="center" gap={6}>
              <Badge
                status={trend > 0 ? "success" : "error"}
                text={
                  <Text
                    style={{
                      fontSize: "12px",
                      color:
                        trend > 0 ? cssVariables.colorSecondary : "#ff4d4f",
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
          <Flex vertical gap={4}>
            {actions}
          </Flex>
        )}
      </Flex>
    </Card>
  );

  return (
    <div style={{ padding: "0 0 24px 0" }}>
      {/* Header Section */}
      <Card
        style={{
          marginBottom: 24,
          background: `linear-gradient(135deg, ${cssVariables.colorPrimary} 0%, ${cssVariables.colorTitle} 100%)`,
          border: "none",
          borderRadius: 16,
        }}
        styles={{ body: { padding: "24px 32px" } }}
      >
        <Flex justify="space-between" align="center">
          <Flex vertical gap={8}>
            <Title
              level={2}
              style={{
                margin: 0,
                color: cssVariables.colorWhite,
                fontSize: "32px",
                fontWeight: 600,
              }}
            >
              Welcome to CloudKart Admin
            </Title>
            <Text
              style={{
                color: cssVariables.whiteTransparent90,
                fontSize: "16px",
              }}
            >
              Monitor your e-commerce performance and manage your store
            </Text>
          </Flex>

          <Flex gap={12}>
            <Button
              type="primary"
              icon={<PlusCircleFilled />}
              style={{
                background: cssVariables.whiteTransparent25,
                border: `1px solid ${cssVariables.whiteTransparent40}`,
                color: cssVariables.colorWhite,
                borderRadius: 6,
              }}
              onClick={() => navigate("/products/create")}
            >
              Add Product
            </Button>
            <Button
              icon={<MdCategory />}
              style={{
                background: cssVariables.whiteTransparent25,
                border: `1px solid ${cssVariables.whiteTransparent40}`,
                color: cssVariables.colorWhite,
                borderRadius: 6,
              }}
              onClick={() => navigate("/categories")}
            >
              Manage Categories
            </Button>
          </Flex>
        </Flex>
      </Card>

      {/* Main Stats Grid */}
      <Row gutter={[24, 24]}>
        {/* Primary Stats */}
        <Col xs={24} sm={12} lg={6}>
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

        <Col xs={24} sm={12} lg={6}>
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

        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Monthly Revenue"
            value={mockStats.monthlyRevenue}
            icon={<DollarCircleOutlined />}
            color={cssVariables.colorSecondary}
            trend={15.7}
            subtitle="This month"
          />
        </Col>

        <Col xs={24} sm={12} lg={6}>
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
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Total Sales"
            value={mockStats.totalSales}
            icon={<MdTrendingUp />}
            color={cssVariables.colorPurple}
            trend={23.1}
            subtitle="All time"
          />
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Low Stock Items"
            value={mockStats.lowStockItems}
            icon={<MdInventory />}
            color={cssVariables.colorMagenta}
            trend={-5.2}
            subtitle="Needs restocking"
          />
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Conversion Rate"
            value={mockStats.conversionRate}
            icon={<EyeOutlined />}
            color="#722ed1"
            trend={1.8}
            subtitle="Visitors to buyers"
          />
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Avg Order Value"
            value={mockStats.averageOrderValue}
            icon={<RiShoppingBagLine />}
            color="#fa8c16"
            trend={7.4}
            subtitle="Per transaction"
          />
        </Col>
      </Row>

      {/* Performance Overview */}
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={16}>
          <Card
            title={
              <Flex align="center" gap={12}>
                <Avatar
                  size="small"
                  style={{
                    backgroundColor: cssVariables.colorPrimary + "15",
                    color: cssVariables.colorPrimary,
                  }}
                  icon={<MdTrendingUp />}
                />
                <Title level={5} style={{ margin: 0 }}>
                  Performance Overview
                </Title>
              </Flex>
            }
            style={{
              borderRadius: 12,
              border: `1px solid ${cssVariables.colorPrimary}20`,
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Flex vertical gap={8}>
                  <Text type="secondary">Sales Performance</Text>
                  <Progress
                    percent={78}
                    strokeColor={cssVariables.colorSecondary}
                    trailColor={cssVariables.colorSecondary + "20"}
                  />
                </Flex>
              </Col>
              <Col span={12}>
                <Flex vertical gap={8}>
                  <Text type="secondary">Inventory Health</Text>
                  <Progress
                    percent={92}
                    strokeColor={cssVariables.colorPrimary}
                    trailColor={cssVariables.colorPrimary + "20"}
                  />
                </Flex>
              </Col>
              <Col span={12}>
                <Flex vertical gap={8}>
                  <Text type="secondary">Customer Satisfaction</Text>
                  <Progress
                    percent={85}
                    strokeColor={cssVariables.colorTitle}
                    trailColor={cssVariables.colorTitle + "20"}
                  />
                </Flex>
              </Col>
              <Col span={12}>
                <Flex vertical gap={8}>
                  <Text type="secondary">Order Fulfillment</Text>
                  <Progress
                    percent={96}
                    strokeColor={cssVariables.colorOrange}
                    trailColor={cssVariables.colorOrange + "20"}
                  />
                </Flex>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={
              <Flex align="center" gap={12}>
                <Avatar
                  size="small"
                  style={{
                    backgroundColor: cssVariables.colorSecondary + "15",
                    color: cssVariables.colorSecondary,
                  }}
                  icon={<RiShoppingBagLine />}
                />
                <Title level={5} style={{ margin: 0 }}>
                  Quick Actions
                </Title>
              </Flex>
            }
            style={{
              borderRadius: 12,
              border: `1px solid ${cssVariables.colorSecondary}20`,
            }}
          >
            <Flex vertical gap={12}>
              <Button
                block
                icon={<PlusCircleFilled />}
                style={{
                  background: cssVariables.colorPrimary,
                  borderColor: cssVariables.colorPrimary,
                  color: cssVariables.colorWhite,
                  borderRadius: 6,
                }}
                onClick={() => navigate("/products/create")}
              >
                Add New Product
              </Button>

              <Button
                block
                icon={<MdCategory />}
                style={{
                  background: cssVariables.colorTitle,
                  borderColor: cssVariables.colorTitle,
                  color: cssVariables.colorWhite,
                  borderRadius: 6,
                }}
                onClick={() => navigate("/categories/create")}
              >
                Create Category
              </Button>

              <Button
                block
                icon={<EyeOutlined />}
                style={{
                  background: cssVariables.colorSecondary,
                  borderColor: cssVariables.colorSecondary,
                  color: cssVariables.colorWhite,
                  borderRadius: 6,
                }}
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
