import { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  Table,
  Space,
  Tag,
  Avatar,
  Input,
  Typography,
  Result,
  Empty,
  Flex,
  Button,
  Tooltip,
  Row,
  Col,
  Drawer,
} from "antd";
import {
  SettingOutlined,
  DollarOutlined,
  AppstoreOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { FaBarcode, FaImages, FaShoppingBag } from "react-icons/fa";

import DeleteProduct from "./DeleteProduct";
import { getCategorySlugColor } from "../../../lib/utils";
import ManageProduct from "../manage/ManageProduct";
import ProductImages from "../productImage/ProductImages";
import ViewProduct from "../view/ViewProduct";
import { cssVariables } from "../../../config/themeConfig";
import { AiOutlineProduct } from "react-icons/ai";
import { RiShoppingBag3Fill } from "react-icons/ri";

const { Text, Title } = Typography;
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

  const columns = [
    {
      title: (
        <Space size={4} style={{ margin: "0.6rem 0.4rem" }}>
          <AiOutlineProduct style={{ color: cssVariables.colorPrimary }} />
          <span style={{ color: cssVariables.colorPrimary, fontWeight: 600 }}>
            Product
          </span>
        </Space>
      ),
      key: "product",
      render: (_, record) => (
        <Flex align="flex-start" gap={12} style={{ minWidth: 0 }}>
          <Avatar
            size={48}
            {...(record.thumbnail &&
              record.thumbnail.trim() !== "" && { src: record.thumbnail })}
            style={{
              backgroundColor: `${cssVariables.colorPrimary}15`,
              color: cssVariables.colorPrimary,
              border: `2px solid ${cssVariables.colorPrimary}30`,
              flexShrink: 0,
            }}
            shape="square"
          >
            {!record.thumbnail || record.thumbnail.trim() === "" ? (
              <RiShoppingBag3Fill />
            ) : null}
          </Avatar>
          <Space direction="vertical" size={2} style={{ minWidth: 0, flex: 1 }}>
            <Typography.Text
              strong
              style={{
                fontSize: "13px",
                margin: 0,
                lineHeight: "16px",
                display: "block",
              }}
              ellipsis={{ tooltip: record.title }}
            >
              {record.title}
            </Typography.Text>
            <div style={{ marginTop: 2 }}>
              <Tag
                color={record.stock > 0 ? "purple" : "error"}
                bordered={false}
                style={{
                  fontSize: "10px",
                  padding: "1px 6px",
                  margin: 0,
                  lineHeight: "16px",
                  borderRadius: "4px",
                }}
              >
                {record.stock > 0 ? `${record.stock} in stock` : "Out of Stock"}
              </Tag>
            </div>
          </Space>
        </Flex>
      ),
    },
    {
      title: (
        <Space size={4}>
          <DollarOutlined style={{ color: cssVariables.colorSecondary }} />
          <span style={{ color: cssVariables.colorSecondary, fontWeight: 600 }}>
            Price
          </span>
        </Space>
      ),
      dataIndex: "price",
      align: "left",
      render: (price) => (
        <Typography.Text
          strong
          style={{
            fontSize: "14px",
            color: cssVariables.colorSuccess,
            fontWeight: 600,
            lineHeight: "20px",
          }}
        >
          $
          {Number(price).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Typography.Text>
      ),
      responsive: ["md"],
    },
    {
      title: (
        <Space size={4}>
          <FileTextOutlined style={{ color: cssVariables.colorMagenta }} />
          <span style={{ color: cssVariables.colorMagenta, fontWeight: 600 }}>
            Description
          </span>
        </Space>
      ),
      dataIndex: "description",
      width: "35%",
      ellipsis: true,
      render: (description) => (
        <Typography.Text
          style={{
            fontSize: "12px",
            lineHeight: "18px",
            color: cssVariables.colorTextSecondary,
          }}
          ellipsis={{ tooltip: description }}
        >
          {description || "No description provided"}
        </Typography.Text>
      ),
      responsive: ["lg"],
    },
    {
      title: (
        <Space size={4} style={{ margin: "0.6rem 0.4rem" }}>
          <FaBarcode style={{ color: cssVariables.colorPurple }} />
          <span style={{ color: cssVariables.colorPurple, fontWeight: 600 }}>
            SKU
          </span>
        </Space>
      ),
      dataIndex: "sku",
      key: "sku",
      render: (sku) => (
        <Typography.Text
          code
          style={{
            color: cssVariables.colorPurple,
            fontSize: "12px",
          }}
          strong
        >
          {sku}
        </Typography.Text>
      ),
      responsive: ["md"],
    },
    {
      title: (
        <Space size={4}>
          <AppstoreOutlined style={{ color: cssVariables.colorInfo }} />
          <span style={{ color: cssVariables.colorInfo, fontWeight: 600 }}>
            Category
          </span>
        </Space>
      ),
      dataIndex: "categoryName",
      render: (_, record) => (
        <Tag
          color={getCategorySlugColor(record.categorySlug)}
          style={{
            fontSize: "10px",
            fontWeight: 500,
            padding: "2px 8px",
            borderRadius: "4px",
            lineHeight: "16px",
          }}
        >
          {record.categoryName?.toUpperCase()}
        </Tag>
      ),
      responsive: ["lg"],
    },
    {
      title: (
        <Space size={4}>
          <SettingOutlined style={{ color: cssVariables.colorTextSecondary }} />
          <span
            style={{ color: cssVariables.colorTextSecondary, fontWeight: 600 }}
          >
            Actions
          </span>
        </Space>
      ),
      key: "actions",
      fixed: "right",
      width: 160,
      render: (_, record) => (
        <Space size={1}>
          <Tooltip title="View Product">
            <ViewProduct product={record} />
          </Tooltip>
          <Tooltip title="Edit Product">
            <ManageProduct product={record} operation="UPDATE" />
          </Tooltip>
          <Tooltip title="Delete Product">
            <DeleteProduct sku={record.sku} />
          </Tooltip>
          <Tooltip title="Manage Images">
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
    <Space direction="vertical" size="small" style={{ width: "100%" }}>
      {/* Clean Table */}
      <Card
        style={{
          boxShadow: cssVariables.shadowSubtle,
          borderRadius: cssVariables.borderRadiusCard,
          border: `1px solid ${cssVariables.borderSubtle}`,
        }}
      >
        <Row gutter={[16, 12]} align="middle" style={{ marginBottom: 15 }}>
          <Col flex="auto">
            <Space align="center" size={12}>
              <Avatar
                size={36}
                style={{
                  backgroundColor: cssVariables.colorPrimary,
                  color: cssVariables.colorWhite,
                }}
                icon={<FaShoppingBag />}
              />
              <Space direction="vertical" size={0}>
                <Title
                  level={4}
                  style={{
                    margin: 0,
                    fontSize: "16px",
                  }}
                >
                  Products Directory
                </Title>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  {totalElements || 0} products found
                </Text>
              </Space>
            </Space>
          </Col>
          <Col>
            <Search
              placeholder="Search products..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 240 }}
              allowClear
              loading={isLoading}
              onSearch={handleSearch}
              onClear={handleOnClear}
              enterButton
            />
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={content}
          loading={isLoading}
          rowKey={(record) => record.sku}
          scroll={{ x: 800 }}
          size="small"
          pagination={{
            pageSize,
            onChange: (page) => setCurrentPage(page),
            total: totalElements,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} products`,
            current: (data?.currentPage || 0) + 1,
            pageSizeOptions: ["5"],
            showSizeChanger: true,
            size: "default",
          }}
          locale={{
            emptyText: isError ? (
              <Result
                status="error"
                title="Failed to load products"
                subTitle="Something went wrong while fetching product data"
                extra={
                  <Button
                    type="primary"
                    onClick={() => window.location.reload()}
                  >
                    Retry
                  </Button>
                }
              />
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <Space direction="vertical" align="center">
                    <Typography.Text>No products found</Typography.Text>
                    <Typography.Text
                      type="secondary"
                      style={{ fontSize: "12px" }}
                    >
                      Try adjusting your search criteria
                    </Typography.Text>
                  </Space>
                }
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
      </Card>
    </Space>
  );
};

BrowseProduct.propTypes = {
  productResponse: PropTypes.object,
  setSearchTerm: PropTypes.func,
  setCurrentPage: PropTypes.func,
  pageSize: PropTypes.number,
};

export default BrowseProduct;
