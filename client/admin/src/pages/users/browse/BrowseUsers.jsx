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
} from "antd";
import { UserOutlined } from "@ant-design/icons";

import { getRoleColor } from "../../../lib/utils";
import ManageUser from "../manage/ManageUser";
import DeleteUser from "./DeleteUser";

const { Text } = Typography;
const { Search } = Input;

const BrowseUsers = ({
  usersResponse,
  setSearchTerm,
  setCurrentPage,
  pageSize,
}) => {
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
      title: "User",
      render: (_, record) => (
        <Space>
          <Avatar
            src="assets/images/avatarMan.svg"
            shape="square"
            icon={<UserOutlined />}
          />
          <div className="flex flex-col">
            <Text strong className="capitalize">
              {record.firstName} {record.lastName}
            </Text>
            <Text type="secondary">{record.email}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Role",
      dataIndex: "roles",
      render: (roles) =>
        roles.map((role) => (
          <Tag key={role} color={getRoleColor(role)} className="mr-2">
            {role}
          </Tag>
        )),
      responsive: ["md"],
    },
    {
      title: "Username",
      dataIndex: "username",
      responsive: ["md"],
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      render: (phoneNumber) => (
        <Text type={phoneNumber ? "secondary" : "danger"}>
          {phoneNumber || "Not provided"}
        </Text>
      ),
      responsive: ["md"],
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size={1}>
          <ManageUser operation="UPDATE" user={record} />
          <DeleteUser id={record.keycloakId} />
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Space direction="vertical" size="middle" className="w-full">
        <Flex align="center" wrap="wrap" gap={16} justify="right">
          <Search
            placeholder="Search users..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ maxWidth: 300 }}
            enterButton
            allowClear
            loading={isLoading}
            onSearch={(value) => handleSearch(value)}
            onClear={handleOnClear}
          />
        </Flex>

        <Table
          columns={columns}
          dataSource={content}
          loading={isLoading}
          rowKey={(record) => record.id}
          scroll={{ x: "100%" }}
          pagination={{
            pageSize,
            onChange: (page) => setCurrentPage(page),
            total: totalElements,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          locale={{
            emptyText: isError ? (
              <Result
                status="error"
                title="An error occurred"
                subTitle="Failed to fetch users, please try again"
              />
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_DEFAULT}
                description="No Users found"
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
