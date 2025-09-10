import { useState } from "react";
import { Card, Button, Space, Typography, Flex, Avatar } from "antd";

import BrowseProduct from "./browse/BrowseProduct";
import ManageProduct from "./manage/ManageProduct";
import { useGetProductsInfoQuery } from "./productApi";
import { cssVariables } from "../../config/themeConfig";
import { ReloadOutlined } from "@ant-design/icons";
import { FaShoppingBag } from "react-icons/fa";

const { Title, Text } = Typography;

const pageSize = 5;

const Product = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Custom function to handle search term change and reset page
  const handleSearchTermChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  const productResponse = useGetProductsInfoQuery({
    page: currentPage,
    pageSize,
    keyword: searchTerm,
  });
  const { refetch, isLoading, isFetching } = productResponse;

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
              icon={<FaShoppingBag style={{ fontSize: "25px" }} />}
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
                Product Management
              </Title>
              <Text
                style={{
                  color: cssVariables.whiteTransparent90,
                  fontSize: cssVariables.fontSizeRegular,
                  fontWeight: cssVariables.fontWeightMedium,
                  margin: 0,
                }}
              >
                Manage product inventory and details with modern interface
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
              loading={isLoading || isFetching}
            >
              Refresh
            </Button>
            <ManageProduct operation="CREATE" />
          </Space>
        </Flex>
      </Card>

      {/* Products Table */}
      <BrowseProduct
        productResponse={productResponse}
        setCurrentPage={setCurrentPage}
        setSearchTerm={handleSearchTermChange}
        pageSize={pageSize}
      />
    </Space>
  );
};

export default Product;
