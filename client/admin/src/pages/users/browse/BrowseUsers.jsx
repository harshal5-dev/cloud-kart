import { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Avatar,
  Input,
  Typography,
  Result,
  Empty,
} from "antd";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";

import { useGetUsersMutation } from "../adminApi";
import { getRoleColor } from "../../../lib/utils";
import ManageUser from "../manage/ManageUser";
import DeleteUser from "./DeleteUser";

const { Text } = Typography;
const { Search } = Input;

const pageSize = 5;

const BrowseUsers = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersResponse = useGetUsersMutation();
  const [getUsers, { isLoading, data, isError }] = usersResponse;
  const { totalElements, content } = data || {};

  const handleOnDelete = () => {
    getUsers({ page: currentPage, pageSize, searchTerm: searchText });
  };

  const handleOnUpdate = () => {
    getUsers({ page: currentPage, pageSize, searchTerm: searchText });
  };

  const columns = [
    {
      title: "User",
      render: (_, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
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
    },
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      render: (phoneNumber) => (
        <Text type={phoneNumber ? "secondary" : "danger"}>
          {phoneNumber || "Not provided"}
        </Text>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size={1}>
          <ManageUser
            operation="UPDATE"
            user={record}
            onSuccess={handleOnUpdate}
          />
          <DeleteUser id={record.keycloakId} onDelete={handleOnDelete} />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getUsers({ page: currentPage, pageSize, searchTerm: searchText });
  }, [searchText, currentPage, getUsers]);

  return (
    <Card>
      <Space direction="vertical" size="middle" className="w-full">
        <Search
          placeholder="Search users..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ maxWidth: 300 }}
        />
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

export default BrowseUsers;
