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
  Row,
  Col,
} from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  CrownOutlined,
  TeamOutlined,
  SettingOutlined,
  IdcardOutlined,
  MailOutlined,
} from "@ant-design/icons";

import { getRoleColor } from "../../../lib/utils";
import ManageUser from "../manage/ManageUser";
import DeleteUser from "./DeleteUser";
import { cssVariables } from "../../../config/themeConfig";

const { Text, Title } = Typography;
const { Search } = Input;

const BrowseUsers = ({
  usersResponse,
  setSearchTerm,
  setCurrentPage,
  pageSize,
}) => {
  const [searchText, setSearchText] = useState("");

  const { isLoading, data, isError, isFetching } = usersResponse;
  const { totalElements, content } = data || {};

  const handleSearch = (value) => {
    const trimmedValue = value.trim();
    if (trimmedValue !== "") {
      setSearchTerm(trimmedValue);
    }
  };

  const handleOnChange = (e) => {
    setSearchText(e.target.value);

    if (e.target.value.trim() === "") {
      setSearchTerm("");
    }
  };

  const handleOnClear = () => {
    setSearchText("");
    setSearchTerm("");
  };

  const columns = [
    {
      title: (
        <Space size={4} style={{ margin: "0.6rem 0.4rem" }}>
          <UserOutlined style={{ color: cssVariables.colorPrimary }} />
          <span style={{ color: cssVariables.colorPrimary, fontWeight: 600 }}>
            User
          </span>
        </Space>
      ),
      key: "user",
      render: (_, record) => (
        <Flex align="center" gap={10}>
          <Avatar
            size={45}
            src={record.profilePictureUrl || "assets/images/avatarMan.svg"}
            icon={<UserOutlined />}
            style={{
              border: `2px solid ${
                record.status === "ACTIVE"
                  ? cssVariables.colorSuccess
                  : cssVariables.colorError
              }`,
            }}
          />
          <Space direction="vertical" size={0}>
            <Typography.Text
              strong
              style={{
                fontSize: "13px",
                textTransform: "capitalize",
                margin: 0,
              }}
            >
              {record.firstName} {record.lastName}
            </Typography.Text>
            <Tag
              color={record.status === "ACTIVE" ? "success" : "error"}
              bordered={false}
              style={{ fontSize: "10px", padding: "0 5px", margin: 0 }}
            >
              {record.status === "ACTIVE" ? "Active" : "Inactive"}
            </Tag>
          </Space>
        </Flex>
      ),
    },
    {
      title: (
        <Space size={4}>
          <MailOutlined style={{ color: cssVariables.colorMagenta }} />
          <span style={{ color: cssVariables.colorMagenta, fontWeight: 600 }}>
            Email
          </span>
        </Space>
      ),
      dataIndex: "email",
      key: "email",
      width: 220,
      render: (email) => (
        <Space size={4} align="center">
          <Badge status="success" />
          <Button
            type="link"
            size="small"
            icon={<MailOutlined />}
            onClick={() => window.open(`mailto:${email}`, "_blank")}
            style={{
              padding: 0,
              height: "auto",
              fontSize: "12px",
              color: cssVariables.colorLink,
            }}
          >
            <Typography.Text
              ellipsis={{ tooltip: email }}
              style={{
                fontSize: "12px",
                color: cssVariables.colorInfo,
                maxWidth: "160px",
              }}
            >
              {email}
            </Typography.Text>
          </Button>
        </Space>
      ),
      responsive: ["lg"],
    },
    {
      title: (
        <Space size={4}>
          <CrownOutlined style={{ color: cssVariables.colorSecondary }} />
          <span style={{ color: cssVariables.colorSecondary, fontWeight: 600 }}>
            Roles
          </span>
        </Space>
      ),
      dataIndex: "roles",
      render: (roles) => (
        <Space wrap size={[3, 3]}>
          {roles.map((role) => (
            <Tag
              key={role}
              color={getRoleColor(role)}
              style={{
                fontSize: "10px",
                fontWeight: 500,
              }}
            >
              {role.toUpperCase()}
            </Tag>
          ))}
        </Space>
      ),
      responsive: ["md"],
    },
    {
      title: (
        <Space size={4}>
          <IdcardOutlined style={{ color: cssVariables.colorInfo }} />
          <span style={{ color: cssVariables.colorInfo, fontWeight: 600 }}>
            Username
          </span>
        </Space>
      ),
      dataIndex: "username",
      render: (username) => (
        <Typography.Text
          code
          style={{
            fontSize: "13px",
            padding: "2px 6px",
          }}
        >
          @{username}
        </Typography.Text>
      ),
      responsive: ["lg"],
    },
    {
      title: (
        <Space size={4}>
          <PhoneOutlined style={{ color: cssVariables.colorWarning }} />
          <span style={{ color: cssVariables.colorWarning, fontWeight: 600 }}>
            Contact
          </span>
        </Space>
      ),
      dataIndex: "phoneNumber",
      render: (phoneNumber) =>
        phoneNumber ? (
          <Space size={3}>
            <PhoneOutlined
              style={{ fontSize: "11px", color: cssVariables.colorSuccess }}
            />
            <Typography.Text style={{ fontSize: "11px" }}>
              {phoneNumber}
            </Typography.Text>
          </Space>
        ) : (
          <Typography.Text type="secondary" style={{ fontSize: "11px" }}>
            Not provided
          </Typography.Text>
        ),
      responsive: ["xl"],
    },
    {
      title: (
        <Space size={4}>
          <SettingOutlined style={{ color: cssVariables.colorTextSecondary }} />
          <span
            style={{ color: cssVariables.colorTextSecondary, fontWeight: 600 }}
          >
            Actions
          </span>
        </Space>
      ),
      key: "actions",
      fixed: "right",
      width: 105,
      render: (_, record) => (
        <Space size={2}>
          <Tooltip title="Edit User">
            <ManageUser operation="UPDATE" user={record} />
          </Tooltip>
          <Tooltip title="Delete User">
            <DeleteUser id={record.keycloakId} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Space direction="vertical" size="small" style={{ width: "100%" }}>
      {/* Clean Table */}
      <Card
        style={{
          boxShadow: cssVariables.shadowSubtle,
          borderRadius: cssVariables.borderRadiusCard,
          border: `1px solid ${cssVariables.borderSubtle}`,
        }}
      >
        <Row gutter={[16, 12]} align="middle" style={{ marginBottom: 15 }}>
          <Col flex="auto">
            <Space align="center" size={12}>
              <Avatar
                size={36}
                style={{
                  backgroundColor: cssVariables.colorPrimary,
                  color: cssVariables.colorWhite,
                }}
                icon={<TeamOutlined />}
              />
              <Space direction="vertical" size={0}>
                <Title
                  level={4}
                  style={{
                    margin: 0,
                    fontSize: "16px",
                  }}
                >
                  Users Directory
                </Title>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  {totalElements || 0} users found
                </Text>
              </Space>
            </Space>
          </Col>
          <Col>
            <Search
              placeholder="Search users..."
              value={searchText}
              onChange={handleOnChange}
              style={{ width: 240 }}
              allowClear
              loading={isLoading || isFetching}
              onSearch={handleSearch}
              onClear={handleOnClear}
              enterButton
            />
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={content}
          loading={isLoading || isFetching}
          rowKey={(record) => record.id}
          scroll={{ x: 800 }}
          size="small"
          pagination={{
            pageSize,
            onChange: (page) => setCurrentPage(page),
            total: totalElements,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} users`,
            current: (data?.currentPage || 0) + 1,
            pageSizeOptions: ["5"],
            showSizeChanger: true,
            size: "default",
          }}
          locale={{
            emptyText: isError ? (
              <Result
                status="error"
                title="Failed to load users"
                subTitle="Something went wrong while fetching user data"
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
                  <Space direction="vertical" align="center">
                    <Typography.Text>No users found</Typography.Text>
                    <Typography.Text
                      type="secondary"
                      style={{ fontSize: "12px" }}
                    >
                      Try adjusting your search criteria
                    </Typography.Text>
                  </Space>
                }
              />
            ),
          }}
        />
      </Card>
    </Space>
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
