import { useState } from "react";
import { Card, Button, Space, Typography, Flex } from "antd";
import { RiRefreshFill } from "react-icons/ri";

import BrowseUsers from "./browse/BrowseUsers";
import ManageUser from "./manage/ManageUser";
import { useGetUsersQuery } from "./adminApi";

const { Title } = Typography;

const pageSize = 5;

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersResponse = useGetUsersQuery({
    page: currentPage,
    pageSize,
    searchTerm,
  });
  const { refetch, isLoading } = usersResponse;

  return (
    <Space direction="vertical" size="large" className="w-full">
      <Card>
        <Flex justify="space-between" align="center" wrap="wrap" gap={16}>
          <Title level={3} style={{ margin: 0 }}>
            Users
          </Title>
          <Space>
            <Button
              color="green"
              variant="filled"
              icon={<RiRefreshFill />}
              onClick={refetch}
              loading={isLoading}
            >
              Refresh
            </Button>
            <ManageUser operation="CREATE" />
          </Space>
        </Flex>
      </Card>
      <BrowseUsers
        usersResponse={usersResponse}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setSearchTerm={setSearchTerm}
      />
    </Space>
  );
};

export default Users;
