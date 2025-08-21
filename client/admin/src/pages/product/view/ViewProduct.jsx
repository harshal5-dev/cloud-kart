import { useState } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Space,
  Divider,
  Avatar,
  Flex,
  Image,
  Descriptions,
  Badge,
} from "antd";
import {
  EyeOutlined,
  DollarOutlined,
  ShoppingOutlined,
  InfoCircleOutlined,
  AppstoreOutlined,
  SafetyCertificateTwoTone,
  ShoppingCartOutlined,
  BarcodeOutlined,
  EyeFilled,
} from "@ant-design/icons";
import { FaBox, FaRuler, FaWeight } from "react-icons/fa";
import { MdLocalShipping, MdSecurity } from "react-icons/md";
import { BsArrowReturnLeft } from "react-icons/bs";

import { cssVariables } from "../../../config/themeConfig";
import { getCategorySlugColor } from "../../../lib/utils";

const { Title, Text, Paragraph } = Typography;

const ViewProduct = ({ product, trigger = "icon" }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getAvailabilityStatus = (status) => {
    const statusConfig = {
      IN_STOCK: {
        color: "success",
        icon: <ShoppingOutlined />,
        text: "In Stock",
        badgeStatus: "success",
      },
      OUT_OF_STOCK: {
        color: "error",
        icon: <ShoppingCartOutlined />,
        text: "Out of Stock",
        badgeStatus: "error",
      },
      LOW_STOCK: {
        color: "warning",
        icon: <InfoCircleOutlined />,
        text: "Low Stock",
        badgeStatus: "warning",
      },
    };

    return statusConfig[status] || statusConfig.IN_STOCK;
  };

  const statusInfo = getAvailabilityStatus(product?.availabilityStatus);

  const renderTrigger = () => {
    if (trigger === "button") {
      return (
        <Button type="primary" icon={<EyeOutlined />} onClick={showModal}>
          View Details
        </Button>
      );
    }

    return (
      <Button
        variant="text"
        shape="circle"
        color="gold"
        icon={<EyeFilled />}
        onClick={showModal}
      />
    );
  };

  if (!product) return null;

  return (
    <>
      {renderTrigger()}

      <Modal
        title={
          <Flex align="center" gap={12}>
            <Avatar
              size={40}
              src={product.thumbnail}
              style={{
                backgroundColor: `${cssVariables.colorPrimary}15`,
                border: `2px solid ${cssVariables.colorPrimary}30`,
              }}
              shape="square"
              icon={<FaBox />}
            />
            <div>
              <Title level={4} style={{ margin: 0, fontSize: "16px" }}>
                Product Details
              </Title>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                Complete product information
              </Text>
            </div>
          </Flex>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>,
        ]}
        width="95%"
        style={{ maxWidth: 1000 }}
        centered
      >
        <Row gutter={[24, 24]}>
          {/* Basic Information */}
          <Col span={24}>
            <Card
              size="small"
              title={
                <Space>
                  <InfoCircleOutlined
                    style={{ color: cssVariables.colorPrimary }}
                  />
                  Basic Information
                </Space>
              }
              style={{ borderRadius: 8 }}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} md={16}>
                  <Space
                    direction="vertical"
                    size={8}
                    style={{ width: "100%" }}
                  >
                    <div>
                      <Text strong style={{ fontSize: "16px" }}>
                        {product.title}
                      </Text>
                      {product.featured && (
                        <Tag color="gold" style={{ marginLeft: 8 }}>
                          Featured
                        </Tag>
                      )}
                    </div>

                    <Descriptions column={1} size="small">
                      <Descriptions.Item
                        label={
                          <Space>
                            <BarcodeOutlined />
                            SKU
                          </Space>
                        }
                      >
                        <Text code>{product.sku}</Text>
                      </Descriptions.Item>

                      <Descriptions.Item
                        label={
                          <Space>
                            <AppstoreOutlined />
                            Category
                          </Space>
                        }
                      >
                        <Tag color={getCategorySlugColor(product.categorySlug)}>
                          {product.categoryName?.toUpperCase()}
                        </Tag>
                      </Descriptions.Item>

                      {product.brand && (
                        <Descriptions.Item label="Brand">
                          <Text>{product.brand}</Text>
                        </Descriptions.Item>
                      )}
                    </Descriptions>

                    {product.description && (
                      <div>
                        <Text strong>Description:</Text>
                        <Paragraph style={{ marginTop: 4, marginBottom: 0 }}>
                          {product.description}
                        </Paragraph>
                      </div>
                    )}
                  </Space>
                </Col>

                <Col xs={24} md={8}>
                  {product.thumbnail && (
                    <div style={{ textAlign: "center" }}>
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        style={{
                          borderRadius: 8,
                          border: `1px solid ${cssVariables.colorBorder}`,
                        }}
                        height={155}
                        fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN..."
                      />
                    </div>
                  )}
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Pricing & Stock */}
          <Col xs={24} md={12}>
            <Card
              size="small"
              title={
                <Space>
                  <DollarOutlined
                    style={{ color: cssVariables.colorSuccess }}
                  />
                  Pricing & Stock
                </Space>
              }
              style={{ borderRadius: 8 }}
            >
              <Space direction="vertical" size={12} style={{ width: "100%" }}>
                <div>
                  <Text type="secondary">Price:</Text>
                  <div>
                    <Text
                      strong
                      style={{
                        fontSize: "24px",
                        color: cssVariables.colorSuccess,
                      }}
                    >
                      ${Number(product.price || 0).toFixed(2)}
                    </Text>
                    {product.discountPercentage > 0 && (
                      <Tag color="red" style={{ marginLeft: 8 }}>
                        -{product.discountPercentage}%
                      </Tag>
                    )}
                  </div>
                </div>

                <Divider style={{ margin: "8px 0" }} />

                <Descriptions column={1} size="small">
                  <Descriptions.Item
                    label={
                      <Space>
                        <Badge status={statusInfo.badgeStatus} />
                        Stock Status
                      </Space>
                    }
                  >
                    <Tag color={statusInfo.color} icon={statusInfo.icon}>
                      {statusInfo.text}
                    </Tag>
                  </Descriptions.Item>

                  <Descriptions.Item label="Stock Quantity">
                    <Text strong>{product.stock || 0} units</Text>
                  </Descriptions.Item>

                  <Descriptions.Item label="Minimum Order">
                    <Text>{product.minimumOrderQuantity || 1} units</Text>
                  </Descriptions.Item>
                </Descriptions>
              </Space>
            </Card>
          </Col>

          {/* Physical Properties */}
          <Col xs={24} md={12}>
            <Card
              size="small"
              title={
                <Space>
                  <FaRuler style={{ color: cssVariables.colorInfo }} />
                  Physical Properties
                </Space>
              }
              style={{ borderRadius: 8 }}
            >
              <Descriptions column={1} size="small">
                {product.weight && (
                  <Descriptions.Item
                    label={
                      <Space>
                        <FaWeight />
                        Weight
                      </Space>
                    }
                  >
                    {product.weight} kg
                  </Descriptions.Item>
                )}

                {(product.width || product.height || product.depth) && (
                  <Descriptions.Item label="Dimensions">
                    <Text>
                      {product.width || "N/A"} × {product.height || "N/A"} ×{" "}
                      {product.depth || "N/A"} cm
                    </Text>
                  </Descriptions.Item>
                )}

                {!product.weight &&
                  !product.width &&
                  !product.height &&
                  !product.depth && (
                    <Text type="secondary" style={{ fontStyle: "italic" }}>
                      No physical properties specified
                    </Text>
                  )}
              </Descriptions>
            </Card>
          </Col>

          {/* Policies */}
          <Col span={24}>
            <Card
              size="small"
              title={
                <Space>
                  <SafetyCertificateTwoTone />
                  Policies & Information
                </Space>
              }
              style={{ borderRadius: 8 }}
            >
              <Row gutter={[16, 16]}>
                {product.shippingDetails && (
                  <Col xs={24} md={8}>
                    <div>
                      <Text strong>
                        <Space>
                          <MdLocalShipping
                            style={{ color: cssVariables.colorInfo }}
                          />
                          Shipping Details
                        </Space>
                      </Text>
                      <Paragraph style={{ marginTop: 4 }}>
                        {product.shippingDetails}
                      </Paragraph>
                    </div>
                  </Col>
                )}

                {product.warrantyDetails && (
                  <Col xs={24} md={8}>
                    <div>
                      <Text strong>
                        <Space>
                          <MdSecurity
                            style={{ color: cssVariables.colorSuccess }}
                          />
                          Warranty
                        </Space>
                      </Text>
                      <Paragraph style={{ marginTop: 4 }}>
                        {product.warrantyDetails}
                      </Paragraph>
                    </div>
                  </Col>
                )}

                {product.returnPolicy && (
                  <Col xs={24} md={8}>
                    <div>
                      <Text strong>
                        <Space>
                          <BsArrowReturnLeft
                            style={{ color: cssVariables.colorWarning }}
                          />
                          Return Policy
                        </Space>
                      </Text>
                      <Paragraph style={{ marginTop: 4 }}>
                        {product.returnPolicy}
                      </Paragraph>
                    </div>
                  </Col>
                )}
              </Row>

              {!product.shippingDetails &&
                !product.warrantyDetails &&
                !product.returnPolicy && (
                  <Text type="secondary" style={{ fontStyle: "italic" }}>
                    No policies specified for this product
                  </Text>
                )}
            </Card>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

ViewProduct.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    sku: PropTypes.string,
    description: PropTypes.string,
    categoryName: PropTypes.string,
    categorySlug: PropTypes.string,
    brand: PropTypes.string,
    thumbnail: PropTypes.string,
    featured: PropTypes.bool,
    price: PropTypes.number,
    discountPercentage: PropTypes.number,
    stock: PropTypes.number,
    minimumOrderQuantity: PropTypes.number,
    availabilityStatus: PropTypes.string,
    weight: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    depth: PropTypes.number,
    shippingDetails: PropTypes.string,
    warrantyDetails: PropTypes.string,
    returnPolicy: PropTypes.string,
  }).isRequired,
  trigger: PropTypes.oneOf(["icon", "button"]),
};

export default ViewProduct;
