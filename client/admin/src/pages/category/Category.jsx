import { Card, Button, Space, Typography, Flex, Avatar } from "antd";
import { RiFolderLine } from "react-icons/ri";

import BrowseCategory from "./browse/BrowseCategory";
import ManageCategory from "./manage/ManageCategory";
import { useGetCategoriesQuery } from "./categoryApi";
import { cssVariables } from "../../config/themeConfig";
import { ReloadOutlined } from "@ant-design/icons";
import { MdCategory } from "react-icons/md";

const { Title, Text } = Typography;

const Category = () => {
  const categoryResponse = useGetCategoriesQuery();
  const { refetch, isLoading } = categoryResponse;

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      {/* Header Card */}
      <Card
        style={{
          border: "none",
          background: `linear-gradient(135deg, ${cssVariables.colorPrimary}, ${cssVariables.colorSecondary})`,
          boxShadow: `0 4px 20px ${cssVariables.colorPrimary}25`,
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
              icon={<MdCategory style={{ fontSize: "25px" }} />}
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
                Category Management
              </Title>
              <Text
                style={{
                  color: cssVariables.whiteTransparent90,
                  fontSize: cssVariables.fontSizeRegular,
                  fontWeight: cssVariables.fontWeightMedium,
                  margin: 0,
                }}
              >
                Organize and manage product categories with modern interface
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
            <ManageCategory operation="CREATE" />
          </Space>
        </Flex>
      </Card>

      {/* Categories Table */}
      <BrowseCategory categoryResponse={categoryResponse} />
    </Space>
  );
};

export default Category;
