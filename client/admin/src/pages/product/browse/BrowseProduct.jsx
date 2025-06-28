import { useCallback, useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Empty,
  Flex,
  Result,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { RiRefreshFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { FcClearFilters } from "react-icons/fc";
import { useNavigate } from "react-router";
import { LuLassoSelect } from "react-icons/lu";

import { useGetProductsInfoMutation } from "../productApi";
import { setProductOperation, setSelectedProduct } from "../productSlice";
import DeleteProduct from "./DeleteProduct";
import { FaImage, FaPencilAlt } from "react-icons/fa";
import {
  getCategorySlugColor,
  getRandomTagColor,
  mapToSelect,
} from "../../../lib/utils";
import { setProductSku } from "../productImage/productImageSlice";
import { useGetCategoriesQuery } from "../../category/categoryApi";

const pageSize = 5;

const BrowseProduct = ({ onProductUpdate }) => {
  const [getProductsInfo, { data: productResponse = {}, isLoading, isError }] =
    useGetProductsInfoMutation();
  const categoryResponse = useGetCategoriesQuery();
  const { data: categories, isLoading: isCategoriesLoading } = categoryResponse;

  const [currentPage, setCurrentPage] = useState(1);
  const { content, totalElements } = productResponse;
  const [category, setCategory] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getProducts = useCallback(() => {
    getProductsInfo({ page: currentPage, pageSize, category: category || "" });
  }, [getProductsInfo, currentPage, category]);

  const handleUpdateProduct = useCallback(
    (selectedProduct) => {
      dispatch(setProductOperation("UPDATE"));
      dispatch(setSelectedProduct(selectedProduct));
      onProductUpdate();
    },
    [dispatch, onProductUpdate]
  );

  const handleOnDeleteProduct = useCallback(() => {
    getProducts();
  }, [getProducts]);

  const goToProductImages = useCallback(
    (sku) => {
      dispatch(setProductSku(sku));
      navigate("/products/images");
    },
    [dispatch, navigate]
  );

  const column = useMemo(
    () => [
      {
        title: "SKU",
        dataIndex: "sku",
        render: (sku) => (
          <Tag bordered={false} color={getRandomTagColor()}>
            {sku}
          </Tag>
        ),
        responsive: ["md"],
      },
      {
        title: "Title",
        dataIndex: "title",
        ellipsis: true,
      },
      {
        title: "Price",
        dataIndex: "price",
        responsive: ["md"],
        render: (price) => (
          <span className="font-semibold">
            ₹
            {Number(price).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}
          </span>
        ),
      },
      {
        title: "Stock",
        dataIndex: "stock",
        responsive: ["md"],
        render: (stock) => (
          <span
            className={`${
              stock > 0 ? "text-green-700 font-semibold" : "text-red-700"
            }`}
          >
            {stock > 0 ? stock : "Out of Stock"}
          </span>
        ),
      },
      {
        title: "Category",
        dataIndex: "categoryName",
        render: (_, record) => (
          <Tag color={getCategorySlugColor(record.categorySlug)}>
            {record.categoryName}
          </Tag>
        ),
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
              onClick={() => handleUpdateProduct(record)}
            />
            <DeleteProduct sku={record.sku} onDelete={handleOnDeleteProduct} />
            <Tooltip title="add images">
              <Button
                variant="text"
                shape="circle"
                color="cyan"
                icon={<FaImage />}
                onClick={() => goToProductImages(record.sku)}
              />
            </Tooltip>
          </Space>
        ),
      },
    ],
    [handleOnDeleteProduct, handleUpdateProduct, goToProductImages]
  );

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Flex vertical gap={16}>
      <Flex justify="end" gap={10}>
        <Select
          prefix={<LuLassoSelect />}
          loading={isLoading || isCategoriesLoading}
          value={category}
          onChange={(value) => {
            setCategory(value);
          }}
          style={{ width: 300 }}
          placeholder="select category"
          options={mapToSelect(categories, "name")}
        />
        <Button
          color="primary"
          variant="outlined"
          icon={<FcClearFilters />}
          onMouseUp={() => setCategory(null)}
          disabled={!category}
          loading={isLoading}
        >
          Clear
        </Button>
        <Button
          color="primary"
          variant="outlined"
          icon={<RiRefreshFill />}
          onClick={getProducts}
          loading={isLoading}
        >
          Refetch
        </Button>
      </Flex>
      <Table
        columns={column}
        dataSource={content}
        loading={isLoading}
        rowKey={(record) => record.sku}
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
              subTitle="Failed to fetch products, please try again"
            />
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_DEFAULT}
              description="No Products found"
            />
          ),
        }}
      />
    </Flex>
  );
};

BrowseProduct.propTypes = {
  onProductUpdate: PropTypes.func,
};

export default BrowseProduct;
