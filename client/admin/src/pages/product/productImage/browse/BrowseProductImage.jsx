import { Button, Empty, Flex, Image, Result, Space, Table } from "antd";
import { useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { FaPencilAlt } from "react-icons/fa";
import { RiRefreshFill } from "react-icons/ri";
import { IoArrowBackCircle } from "react-icons/io5";

import { useGetProductImagesMutation } from "../productImageApi";
import DeleteProductImage from "./DeleteProductImage";
import { useDispatch, useSelector } from "react-redux";
import {
  setProductImageOperation,
  setSelectedProductImage,
} from "../productImageSlice";
import { useNavigate } from "react-router";

const BrowseProductImage = ({ onProductImageUpdate }) => {
  const [getProductImages, productImagesResponse] =
    useGetProductImagesMutation();
  const productSku = useSelector(
    (state) => state.productImage.selectedProductSku
  );

  const { data, isError, isLoading } = productImagesResponse;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdateProductImage = useCallback(
    (selectedProductImage) => {
      dispatch(setProductImageOperation("UPDATE"));
      dispatch(setSelectedProductImage(selectedProductImage));
      onProductImageUpdate();
    },
    [dispatch, onProductImageUpdate]
  );

  const handleOnRefresh = useCallback(() => {
    if (productSku) {
      getProductImages(productSku);
    }
  }, [productSku, getProductImages]);

  const handleProductsNavigation = () => {
    navigate("/products");
  };

  const column = useMemo(
    () => [
      {
        title: "Image URL",
        dataIndex: "imageUrl",
        render: (imageUrl) => (
          <Image
            width={80}
            className="border-1 border-slate-100 rounded-md bg-slate-50"
            src={imageUrl}
            fallback="/assets/images/fallbackImage.svg"
          />
        ),
      },
      {
        title: "Alt Text",
        dataIndex: "altText",
        responsive: ["md"],
      },
      {
        title: "Sort Order",
        dataIndex: "sortOrder",
        responsive: ["md"],
      },
      {
        title: "Action",
        align: "center",
        render: (_, record) => (
          <Space size={1}>
            <Button
              variant="text"
              shape="circle"
              color="gold"
              icon={<FaPencilAlt />}
              onClick={() => handleUpdateProductImage(record)}
            />
            <DeleteProductImage
              id={record.id}
              productSku={productSku}
              onDelete={handleOnRefresh}
            />
          </Space>
        ),
      },
    ],
    [handleOnRefresh, handleUpdateProductImage, productSku]
  );

  useEffect(() => {
    if (productSku) {
      getProductImages(productSku);
    }
  }, [productSku, getProductImages]);

  return (
    <Flex vertical gap={16}>
      <Flex justify="end" align="center" gap={15}>
        <Button
          color="primary"
          variant="outlined"
          icon={<RiRefreshFill />}
          onClick={() => handleOnRefresh()}
          loading={isLoading}
        >
          Refetch
        </Button>
        <Button
          color="primary"
          variant="outlined"
          icon={<IoArrowBackCircle />}
          onClick={() => handleProductsNavigation()}
          loading={isLoading}
        >
          Back to Products
        </Button>
      </Flex>
      <Flex justify="center" align="center" gap={15}>
        <div className="font-semibold">
          <span className="text-gray-400">Product SKU: </span>
          {productSku}
        </div>
      </Flex>
      <Table
        columns={column}
        dataSource={data}
        loading={isLoading}
        rowKey={(record) => record.id}
        scroll={{ x: "100%" }}
        size="middle"
        pagination={{
          pageSize: 7,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        locale={{
          emptyText: isError ? (
            <Result
              status="error"
              title="An error occurred"
              subTitle="Failed to fetch product images, please try again"
            />
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_DEFAULT}
              description="No Product Images found"
            />
          ),
        }}
      />
    </Flex>
  );
};

BrowseProductImage.propTypes = {
  onProductImageUpdate: PropTypes.func,
};

export default BrowseProductImage;
