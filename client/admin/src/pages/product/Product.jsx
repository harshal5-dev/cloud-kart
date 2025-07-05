import { useState } from "react";
import { Button, Card, Flex, Space, Typography } from "antd";
import { RiRefreshFill } from "react-icons/ri";

import ManageProduct from "./manage/ManageProduct";
import { useGetProductsInfoQuery } from "./productApi";
import BrowseProduct from "./browse/BrowseProduct";

const { Title } = Typography;

const pageSize = 5;

const Product = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productResponse = useGetProductsInfoQuery({
    page: currentPage,
    pageSize,
    keyword: searchTerm,
  });
  const { refetch, isLoading } = productResponse;

  return (
    <Space direction="vertical" size="large" className="w-full">
      <Card>
        <Flex justify="space-between" align="center" wrap="wrap" gap={16}>
          <Title level={3} style={{ margin: 0 }}>
            Products
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
            <ManageProduct operation="CREATE" />
          </Space>
        </Flex>
      </Card>
      <BrowseProduct
        productResponse={productResponse}
        setCurrentPage={setCurrentPage}
        setSearchTerm={setSearchTerm}
        pageSize={pageSize}
      />
    </Space>
  );
};

export default Product;
