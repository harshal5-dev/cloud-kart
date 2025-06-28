import { Card, Button, Space, Typography, Flex } from "antd";
import { BsPersonAdd } from "react-icons/bs";

import BrowseUsers from "./browse/BrowseUsers";
import ManageUser from "./manage/ManageUser";

const { Title } = Typography;

const Users = () => {
  return (
    <div>
      <Space direction="vertical" size="large" className="w-full">
        <Card>
          <Flex justify="space-between" align="center">
            <Title level={3} style={{ margin: 0 }}>
              Users Management
            </Title>
            <ManageUser operation="CREATE" />
          </Flex>
        </Card>
        <BrowseUsers />
      </Space>
    </div>
  );
};

export default Users;
