import { useState } from "react";
import { Card, Button, Space, Typography, Flex, Avatar } from "antd";
import { RiTeamLine } from "react-icons/ri";

import BrowseUsers from "./browse/BrowseUsers";
import ManageUser from "./manage/ManageUser";
import { useGetUsersQuery } from "./adminApi";
import { cssVariables } from "../../config/themeConfig";
import { ReloadOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

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
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      {/* Header Card */}
      <Card
        style={{
          border: "none",
          background: cssVariables.headerGradientPrimary,
          boxShadow: cssVariables.headerShadowPrimary,
          overflow: "hidden",
        }}
      >
        <Flex
          justify="space-between"
          align="center"
          wrap="wrap"
          gap={cssVariables.spacingLarge}
          style={{ position: "relative", zIndex: 2 }}
        >
          <Flex align="center" gap={cssVariables.spacingMedium}>
            <Avatar
              size={cssVariables.avatarSizeLarge}
              style={{
                background: cssVariables.whiteTransparent25,
                border: `3px solid ${cssVariables.whiteTransparent40}`,
                boxShadow: `0 8px 24px ${cssVariables.whiteTransparent40}`,
                color: cssVariables.colorWhite,
              }}
              icon={<RiTeamLine style={{ fontSize: "25px" }} />}
            />
            <Flex vertical>
              <Title
                level={3}
                style={{
                  margin: 0,
                  color: cssVariables.colorWhite,
                  fontSize: cssVariables.fontSizeLarge,
                  fontWeight: cssVariables.fontWeightBold,
                  lineHeight: cssVariables.lineHeightCompact,
                }}
              >
                User Management
              </Title>
              <Text
                style={{
                  color: cssVariables.whiteTransparent90,
                  fontSize: cssVariables.fontSizeRegular,
                  fontWeight: cssVariables.fontWeightMedium,
                  margin: 0,
                }}
              >
                Manage users, roles, and permissions with modern interface
              </Text>
            </Flex>
          </Flex>

          <Space size="middle">
            <Button
              icon={<ReloadOutlined />}
              onClick={refetch}
              style={{
                background: cssVariables.whiteTransparent25,
                border: `1px solid ${cssVariables.whiteTransparent40}`,
                color: cssVariables.colorWhite,
              }}
              loading={isLoading}
            >
              Refresh
            </Button>
            <ManageUser operation="CREATE" />
          </Space>
        </Flex>
      </Card>

      {/* Users Table */}
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
