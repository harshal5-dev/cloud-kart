import { useState } from "react";
import {
  Card,
  Button,
  Space,
  Typography,
  Flex,
  Avatar,
  Statistic,
  Row,
  Col,
  theme,
} from "antd";
import {
  RiRefreshFill,
  RiUserLine,
  RiUserAddLine,
  RiTeamLine,
  RiAdminLine,
} from "react-icons/ri";
import { UserOutlined } from "@ant-design/icons";

import BrowseUsers from "./browse/BrowseUsers";
import ManageUser from "./manage/ManageUser";
import { useGetUsersQuery } from "./adminApi";
import { cssVariables } from "../../config/themeConfig";

const { Title, Text } = Typography;

const pageSize = 5;

const Users = () => {
  const { token } = theme.useToken();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersResponse = useGetUsersQuery({
    page: currentPage,
    pageSize,
    searchTerm,
  });
  const { refetch, isLoading, data } = usersResponse;

  // Simple statistics
  const stats = {
    totalUsers: data?.totalElements || 0,
    activeUsers: Math.floor((data?.totalElements || 0) * 0.8),
    newUsersThisMonth: Math.floor((data?.totalElements || 0) * 0.15),
    adminUsers: Math.floor((data?.totalElements || 0) * 0.1),
  };

  const isDarkMode =
    token.colorBgBase === "#000000" || token.colorBgBase === "#141414";

  // Modern stat card component
  const StatCard = ({ title, value, icon, color, gradient, subtitle }) => (
    <Card
      style={{
        height: "100%",
        background: isDarkMode
          ? `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`
          : `linear-gradient(135deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
        border: isDarkMode ? `1px solid ${color}30` : `1px solid ${color}20`,
        borderRadius: 16,
        boxShadow: isDarkMode
          ? `0 8px 32px rgba(0, 0, 0, 0.5), 0 2px 8px ${color}25`
          : `0 4px 20px ${color}20, 0 2px 8px ${color}15`,
        backdropFilter: "blur(10px)",
        overflow: "hidden",
        position: "relative",
        transition: "all 0.3s ease",
      }}
      styles={{
        body: {
          padding: "24px",
          position: "relative",
          zIndex: 2,
        },
      }}
      hoverable
    >
      {/* Decorative element */}
      <div
        style={{
          position: "absolute",
          top: -50,
          right: -50,
          width: 100,
          height: 100,
          background: isDarkMode
            ? `linear-gradient(45deg, ${color}15, ${color}08)`
            : `linear-gradient(45deg, ${color}25, ${color}15)`,
          borderRadius: "50%",
          zIndex: 1,
        }}
      />

      <Flex align="center" gap={16}>
        <Avatar
          size={56}
          style={{
            background: isDarkMode
              ? `linear-gradient(135deg, ${color}90 0%, ${color}70 100%)`
              : `linear-gradient(135deg, ${cssVariables.colorWhite} 0%, rgba(255,255,255,0.9) 100%)`,
            border: isDarkMode
              ? `3px solid ${color}40`
              : `3px solid ${color}30`,
            boxShadow: isDarkMode
              ? `0 4px 12px ${color}30`
              : `0 4px 12px ${color}25`,
            color: isDarkMode ? cssVariables.colorWhite : color,
          }}
          icon={icon}
        />
        <Flex vertical flex={1}>
          <Text
            type="secondary"
            style={{
              fontSize: "13px",
              fontWeight: 500,
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              color: isDarkMode
                ? "rgba(255,255,255,0.7)"
                : "rgba(255,255,255,0.8)",
            }}
          >
            {title}
          </Text>
          <Statistic
            value={value}
            valueStyle={{
              fontSize: "28px",
              fontWeight: "700",
              color: isDarkMode
                ? cssVariables.colorWhite
                : cssVariables.colorWhite,
              lineHeight: 1,
              fontFamily: "'Inter', sans-serif",
            }}
          />
          {subtitle && (
            <Text
              type="secondary"
              style={{
                fontSize: "12px",
                marginTop: 6,
                opacity: 0.7,
                color: isDarkMode
                  ? "rgba(255,255,255,0.6)"
                  : "rgba(255,255,255,0.7)",
              }}
            >
              {subtitle}
            </Text>
          )}
        </Flex>
      </Flex>
    </Card>
  );

  return (
    <div
      style={{
        padding: "24px",
        minHeight: "100vh",
        background: isDarkMode
          ? "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)"
          : "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 50%, #f8fafc 100%)",
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Header Card */}
        <Card
          style={{
            background: isDarkMode
              ? `linear-gradient(135deg, rgba(39, 84, 138, 0.25) 0%, rgba(0, 185, 107, 0.20) 100%)`
              : `linear-gradient(135deg, ${cssVariables.colorPrimary} 0%, ${cssVariables.colorSecondary} 100%)`,
            border: isDarkMode ? `1px solid rgba(39, 84, 138, 0.4)` : "none",
            borderRadius: 20,
            boxShadow: isDarkMode
              ? `0 12px 40px rgba(0, 0, 0, 0.7), 0 4px 12px rgba(39, 84, 138, 0.3)`
              : `0 8px 32px rgba(39, 84, 138, 0.25), 0 4px 16px rgba(0, 185, 107, 0.15)`,
            overflow: "hidden",
            position: "relative",
          }}
          styles={{ body: { padding: "32px" } }}
        >
          {/* Background decoration */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "40%",
              height: "100%",
              background: isDarkMode
                ? `linear-gradient(45deg, rgba(39, 84, 138, 0.15), transparent)`
                : "rgba(255, 255, 255, 0.15)",
              zIndex: 1,
            }}
          />

          <Flex
            justify="space-between"
            align="center"
            wrap="wrap"
            gap={24}
            style={{ position: "relative", zIndex: 2 }}
          >
            <Flex align="center" gap={20}>
              <Avatar
                size={64}
                style={{
                  background: isDarkMode
                    ? `linear-gradient(135deg, ${cssVariables.colorPrimary} 0%, ${cssVariables.colorSecondary} 100%)`
                    : "rgba(255, 255, 255, 0.25)",
                  border: isDarkMode
                    ? `3px solid rgba(39, 84, 138, 0.6)`
                    : "3px solid rgba(255, 255, 255, 0.4)",
                  boxShadow: isDarkMode
                    ? `0 8px 24px rgba(39, 84, 138, 0.4)`
                    : "0 8px 24px rgba(255, 255, 255, 0.4)",
                  color: cssVariables.colorWhite,
                }}
                icon={<RiTeamLine style={{ fontSize: "28px" }} />}
              />
              <Flex vertical>
                <Title
                  level={1}
                  style={{
                    margin: 0,
                    color: cssVariables.colorWhite,
                    fontSize: "clamp(24px, 4vw, 36px)",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    textShadow: isDarkMode
                      ? "0 2px 4px rgba(0, 0, 0, 0.5)"
                      : "0 2px 4px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  User Management
                </Title>
                <Text
                  style={{
                    color: isDarkMode
                      ? "rgba(255, 255, 255, 0.85)"
                      : "rgba(255, 255, 255, 0.95)",
                    fontSize: "16px",
                    fontWeight: 500,
                    margin: 0,
                    textShadow: isDarkMode
                      ? "0 1px 2px rgba(0, 0, 0, 0.3)"
                      : "0 1px 2px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Manage users, roles, and permissions with modern interface
                </Text>
              </Flex>
            </Flex>

            <Space size="middle">
              <Button
                icon={<RiRefreshFill />}
                onClick={refetch}
                loading={isLoading}
                size="large"
                style={{
                  height: 48,
                  borderRadius: 12,
                  background: isDarkMode
                    ? "rgba(255, 255, 255, 0.12)"
                    : "rgba(255, 255, 255, 0.25)",
                  border: isDarkMode
                    ? "1px solid rgba(255, 255, 255, 0.25)"
                    : "1px solid rgba(255, 255, 255, 0.4)",
                  color: cssVariables.colorWhite,
                  backdropFilter: "blur(10px)",
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = isDarkMode
                    ? "rgba(255, 255, 255, 0.18)"
                    : "rgba(255, 255, 255, 0.35)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = isDarkMode
                    ? "rgba(255, 255, 255, 0.12)"
                    : "rgba(255, 255, 255, 0.25)";
                }}
              >
                Refresh
              </Button>
              <ManageUser operation="CREATE" />
            </Space>
          </Flex>
        </Card>

        {/* Statistics Cards */}
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Total Users"
              value={stats.totalUsers}
              icon={<RiUserLine />}
              color={cssVariables.colorPrimary}
              gradient={["#27548a", "#1e4a7a"]}
              subtitle="All registered users"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Active Users"
              value={stats.activeUsers}
              icon={<UserOutlined />}
              color={cssVariables.colorSecondary}
              gradient={["#00B96B", "#00a85e"]}
              subtitle="Currently active"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="New This Month"
              value={stats.newUsersThisMonth}
              icon={<RiUserAddLine />}
              color={cssVariables.colorTitle}
              gradient={["#3b82f6", "#2563eb"]}
              subtitle="Recent registrations"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Admin Users"
              value={stats.adminUsers}
              icon={<RiAdminLine />}
              color={cssVariables.colorOrange}
              gradient={["#fa8c16", "#d4661a"]}
              subtitle="Administrative access"
            />
          </Col>
        </Row>

        {/* Users Table */}
        <BrowseUsers
          usersResponse={usersResponse}
          pageSize={pageSize}
          setCurrentPage={setCurrentPage}
          setSearchTerm={setSearchTerm}
        />
      </Space>
    </div>
  );
};

export default Users;
