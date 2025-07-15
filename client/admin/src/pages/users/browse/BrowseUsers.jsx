import { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  Table,
  Space,
  Tag,
  Avatar,
  Input,
  Typography,
  Result,
  Empty,
  Flex,
  Button,
  Badge,
  Tooltip,
  theme,
} from "antd";
import {
  UserOutlined,
  SearchOutlined,
  FilterOutlined,
  MoreOutlined,
  PhoneOutlined,
  MailOutlined,
  CrownOutlined,
} from "@ant-design/icons";

import { getRoleColor } from "../../../lib/utils";
import ManageUser from "../manage/ManageUser";
import DeleteUser from "./DeleteUser";
import { cssVariables } from "../../../config/themeConfig";

const { Text, Title } = Typography;
const { Search } = Input;

// Enhanced table styles for better UX
const tableStyles = `
  .users-table .ant-table-cell {
    padding: 12px 16px !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06) !important;
  }
  
  .users-table .ant-table-thead > tr > th {
    background: linear-gradient(135deg, rgba(22, 119, 255, 0.08) 0%, rgba(22, 119, 255, 0.03) 100%) !important;
    border-bottom: 2px solid rgba(22, 119, 255, 0.15) !important;
    font-weight: 600 !important;
    font-size: 13px !important;
    text-transform: uppercase !important;
    letter-spacing: 0.5px !important;
  }
  
  .users-table .ant-table-tbody > tr:hover > td {
    background: rgba(22, 119, 255, 0.05) !important;
    transition: all 0.2s ease !important;
  }
`;

// Inject enhanced table styles
if (typeof document !== "undefined") {
  const styleElement = document.getElementById("users-table-styles");
  if (!styleElement) {
    const style = document.createElement("style");
    style.id = "users-table-styles";
    style.textContent = tableStyles;
    document.head.appendChild(style);
  }
}

const BrowseUsers = ({
  usersResponse,
  setSearchTerm,
  setCurrentPage,
  pageSize,
}) => {
  const { token } = theme.useToken();
  const [searchText, setSearchText] = useState("");

  const { isLoading, data, isError } = usersResponse;
  const { totalElements, content } = data || {};

  const handleSearch = (value) => {
    const trimmedValue = value.trim();

    if (trimmedValue !== "") {
      setSearchTerm(trimmedValue);
      setCurrentPage(1);
    }
  };

  const handleOnClear = () => {
    setSearchText("");
    setSearchTerm("");
    setCurrentPage(1);
  };

  const columns = [
    {
      title: "User Profile",
      width: 280,
      render: (_, record) => (
        <Flex align="center" gap={12}>
          <Badge
            status={record.enabled ? "success" : "error"}
            offset={[-5, 35]}
          >
            <Avatar
              size={48}
              src="assets/images/avatarMan.svg"
              style={{
                border: `2px solid ${
                  record.enabled
                    ? cssVariables.colorSuccess
                    : cssVariables.colorError
                }20`,
                boxShadow: `0 2px 8px ${
                  record.enabled
                    ? cssVariables.colorSuccess
                    : cssVariables.colorError
                }20`,
              }}
              icon={<UserOutlined />}
            />
          </Badge>
          <Flex vertical gap={2}>
            <Text
              strong
              style={{
                fontSize: "15px",
                color: token.colorText,
                textTransform: "capitalize",
              }}
            >
              {record.firstName} {record.lastName}
            </Text>
            <Flex align="center" gap={4}>
              <MailOutlined
                style={{ fontSize: "12px", color: token.colorTextTertiary }}
              />
              <Text
                type="secondary"
                style={{
                  fontSize: "12px",
                  fontFamily: "monospace",
                }}
              >
                {record.email}
              </Text>
            </Flex>
            <Text
              type="secondary"
              style={{
                fontSize: "11px",
                color: record.enabled
                  ? cssVariables.colorSuccess
                  : cssVariables.colorError,
                fontWeight: 500,
              }}
            >
              {record.enabled ? "Active" : "Inactive"}
            </Text>
          </Flex>
        </Flex>
      ),
    },
    {
      title: (
        <Flex align="center" gap={6}>
          <CrownOutlined />
          <span>Roles</span>
        </Flex>
      ),
      dataIndex: "roles",
      width: 200,
      render: (roles) => (
        <Flex wrap="wrap" gap={4}>
          {roles.map((role) => (
            <Tag
              key={role}
              color={getRoleColor(role)}
              style={{
                borderRadius: 12,
                fontSize: "11px",
                fontWeight: 500,
                border: "none",
                padding: "2px 8px",
              }}
            >
              {role.toUpperCase()}
            </Tag>
          ))}
        </Flex>
      ),
      responsive: ["md"],
    },
    {
      title: "Username",
      dataIndex: "username",
      width: 150,
      render: (username) => (
        <Text
          code
          style={{
            fontSize: "12px",
            background: token.colorBgContainer,
            padding: "2px 6px",
            borderRadius: 4,
          }}
        >
          @{username}
        </Text>
      ),
      responsive: ["lg"],
    },
    {
      title: (
        <Flex align="center" gap={6}>
          <PhoneOutlined />
          <span>Contact</span>
        </Flex>
      ),
      dataIndex: "phoneNumber",
      width: 150,
      render: (phoneNumber) => (
        <Flex align="center" gap={6}>
          {phoneNumber ? (
            <>
              <PhoneOutlined
                style={{ fontSize: "12px", color: cssVariables.colorSuccess }}
              />
              <Text style={{ fontSize: "12px", fontFamily: "monospace" }}>
                {phoneNumber}
              </Text>
            </>
          ) : (
            <Text
              type="secondary"
              style={{
                fontSize: "12px",
                fontStyle: "italic",
              }}
            >
              Not provided
            </Text>
          )}
        </Flex>
      ),
      responsive: ["xl"],
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      fixed: "right",
      render: (_, record) => (
        <Flex gap={4}>
          <Tooltip title="Edit User">
            <ManageUser operation="UPDATE" user={record} />
          </Tooltip>
          <Tooltip title="Delete User">
            <DeleteUser id={record.keycloakId} />
          </Tooltip>
        </Flex>
      ),
    },
  ];

  return (
    <Card
      style={{
        borderRadius: 16,
        border:
          token.colorBgBase === "#000000" || token.colorBgBase === "#141414"
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "1px solid rgba(0, 0, 0, 0.06)",
        background:
          token.colorBgBase === "#000000" || token.colorBgBase === "#141414"
            ? "linear-gradient(135deg, rgba(25, 25, 25, 0.95) 0%, rgba(15, 15, 15, 0.9) 100%)"
            : "rgba(255, 255, 255, 0.9)",
        boxShadow:
          token.colorBgBase === "#000000" || token.colorBgBase === "#141414"
            ? "0 12px 40px rgba(0, 0, 0, 0.8), 0 4px 12px rgba(22, 119, 255, 0.2)"
            : "0 4px 12px rgba(0, 0, 0, 0.08)",
        backdropFilter: "blur(15px)",
      }}
      styles={{ body: { padding: "24px" } }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Header Section */}
        <Flex justify="space-between" align="center" wrap="wrap" gap={16}>
          <Flex align="center" gap={12}>
            <Avatar
              size={32}
              style={{
                backgroundColor: cssVariables.colorPrimary + "20",
                color: cssVariables.colorPrimary,
              }}
              icon={<UserOutlined />}
            />
            <Title
              level={4}
              style={{
                margin: 0,
                color: token.colorText,
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              Users Directory
            </Title>
            <Badge
              count={totalElements || 0}
              style={{
                backgroundColor: cssVariables.colorPrimary,
                color: "white",
                fontSize: "11px",
                fontWeight: 600,
              }}
            />
          </Flex>

          <Flex gap={12} align="center">
            <Search
              placeholder="Search users by name, email or username..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{
                width: 320,
                maxWidth: "100%",
              }}
              size="large"
              prefix={
                <SearchOutlined style={{ color: token.colorTextTertiary }} />
              }
              allowClear
              loading={isLoading}
              onSearch={handleSearch}
              onClear={handleOnClear}
            />
            <Button
              icon={<FilterOutlined />}
              style={{
                height: 40,
                borderRadius: 8,
              }}
            >
              Filter
            </Button>
          </Flex>
        </Flex>

        {/* Enhanced Table */}
        <Table
          className="users-table"
          columns={columns}
          dataSource={content}
          loading={isLoading}
          rowKey={(record) => record.id}
          scroll={{ x: 800 }}
          size="middle"
          style={{
            borderRadius: 12,
            overflow: "hidden",
          }}
          rowClassName={(record, index) =>
            index % 2 === 0 ? "table-row-even" : "table-row-odd"
          }
          pagination={{
            pageSize,
            onChange: (page) => setCurrentPage(page),
            total: totalElements,
            showTotal: (total, range) =>
              `Showing ${range[0]}-${range[1]} of ${total} users`,
            current: (data?.currentPage || 0) + 1,
            pageSizeOptions: ["5", "10", "20", "50"],
            showSizeChanger: true,
            showQuickJumper: true,
            size: "small",
            style: {
              padding: "16px 0 0 0",
              borderTop: `1px solid ${token.colorBorder}`,
            },
          }}
          locale={{
            emptyText: isError ? (
              <Result
                status="error"
                title="Failed to load users"
                subTitle="Something went wrong while fetching user data"
                style={{ padding: "40px 20px" }}
                extra={
                  <Button
                    type="primary"
                    onClick={() => window.location.reload()}
                  >
                    Retry
                  </Button>
                }
              />
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <Flex vertical align="center" gap={8}>
                    <Text type="secondary" style={{ fontSize: "16px" }}>
                      No users found
                    </Text>
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                      Try adjusting your search criteria
                    </Text>
                  </Flex>
                }
                style={{ padding: "40px 20px" }}
              />
            ),
          }}
        />
      </Space>
    </Card>
  );
};

BrowseUsers.propTypes = {
  usersResponse: PropTypes.object,
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
  setCurrentPage: PropTypes.func,
  pageSize: PropTypes.number,
};

export default BrowseUsers;
