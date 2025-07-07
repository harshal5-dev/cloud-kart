import { Button, Flex, Space } from "antd";

import { useGetProductImagesQuery } from "./productImageApi";
import BrowseProductImage from "./browse/BrowseProductImage";
import { RiRefreshFill } from "react-icons/ri";
import ManageProductImage from "./manage/ManageProductImage";

const ProductImages = ({ product }) => {
  const productImageResponse = useGetProductImagesQuery(product.sku);
  const { isLoading, refetch } = productImageResponse;

  return (
    <Space direction="vertical" size="large" className="w-full">
      <Flex justify="end" align="center" wrap gap={16}>
        <Button
          color="green"
          variant="filled"
          icon={<RiRefreshFill />}
          onClick={refetch}
          loading={isLoading}
        >
          Refresh
        </Button>
        <ManageProductImage operation="CREATE" productSku={product.sku} />
      </Flex>
      <BrowseProductImage
        productImageResponse={productImageResponse}
        productSku={product.sku}
      />
    </Space>
  );
};

export default ProductImages;
