import { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  Drawer,
  Empty,
  Flex,
  Input,
  Result,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { FaImages } from "react-icons/fa";

import DeleteProduct from "./DeleteProduct";
import { getCategorySlugColor, getRandomTagColor } from "../../../lib/utils";
import ManageProduct from "../manage/ManageProduct";
import ProductImages from "../productImage/ProductImages";

const { Search } = Input;

const BrowseProduct = ({
  productResponse,
  setSearchTerm,
  setCurrentPage,
  pageSize,
}) => {
  const [searchText, setSearchText] = useState("");
  const [imageDrawerOpen, setImageDrawerOpen] = useState(false);
  const [product, setProduct] = useState(null);

  const { isLoading, data, isError } = productResponse;
  const { totalElements, content } = data || {};

  const handleSearch = (value) => {
    const trimmedValue = value.trim();

    if (trimmedValue !== "") {
      setSearchTerm(trimmedValue);
      setCurrentPage(1);
    }
  };

  const handleOnClear = () => {
    setSearchText("");
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleEditImages = (record) => {
    setImageDrawerOpen(true);
    setProduct(record);
  };

  const column = [
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
          $
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
          <ManageProduct product={record} operation="UPDATE" />
          <DeleteProduct sku={record.sku} />
          <Tooltip title="Images">
            <Button
              type="text"
              shape="circle"
              icon={<FaImages />}
              onClick={() => handleEditImages(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Space direction="vertical" size="middle" className="w-full">
        <Flex align="center" wrap="wrap" gap={16} justify="right">
          <Search
            placeholder="Search products..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ maxWidth: 300 }}
            enterButton
            allowClear
            loading={isLoading}
            onSearch={(value) => handleSearch(value)}
            onClear={handleOnClear}
          />
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

        {/* Image Gallery Drawer */}
        <Drawer
          title={(product ? product.title : "Product") + " Images"}
          open={imageDrawerOpen}
          onClose={() => setImageDrawerOpen(false)}
          width={555}
        >
          <ProductImages product={product} />
        </Drawer>
      </Space>
    </Card>
  );
};

BrowseProduct.propTypes = {
  productResponse: PropTypes.object,
  setSearchTerm: PropTypes.func,
  setCurrentPage: PropTypes.func,
  pageSize: PropTypes.number,
};

export default BrowseProduct;
