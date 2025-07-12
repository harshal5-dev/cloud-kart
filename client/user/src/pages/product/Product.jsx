import { useState } from "react";
import {
  Typography,
  Row,
  Col,
  Image,
  Button,
  InputNumber,
  Rate,
  Tabs,
  Descriptions,
  Divider,
  Tag,
  Breadcrumb,
  Card,
  List,
  Skeleton,
  Affix,
  Space,
  Tooltip,
} from "antd";
import {
  ShoppingCartOutlined,
  CheckCircleOutlined,
  ShareAltOutlined,
  ShoppingOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Link } from "react-router";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

// Mock product data
const product = {
  id: 101,
  name: "iPhone 14 Pro",
  description:
    "Latest Apple smartphone with A16 Bionic chip and Pro camera system.",
  price: 999.99,
  discountPrice: 949.99,
  rating: 4.8,
  stock: 67,
  brand: "Apple",
  sku: "SKU101",
  isFeatured: true,
  category: "electronics",
  categorySlug: "electronics",
  images: [
    "https://m.media-amazon.com/images/I/61cwywLIfYL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/61QRgV4MDaL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/51VuVU94lnL._AC_SL1500_.jpg",
  ],
  specs: [
    {
      key: "Display",
      value: "6.1-inch Super Retina XDR display with ProMotion",
    },
    { key: "Processor", value: "A16 Bionic chip" },
    {
      key: "Camera",
      value: "Pro camera system (48MP main, 12MP ultra wide, 12MP telephoto)",
    },
    { key: "Battery", value: "Up to 29 hours video playback" },
    { key: "Storage", value: "128GB, 256GB, 512GB, 1TB" },
    {
      key: "Water Resistance",
      value: "IP68 (maximum depth of 6 meters up to 30 minutes)",
    },
  ],
  variants: [
    { id: 1, name: "128GB", price: 999.99 },
    { id: 2, name: "256GB", price: 1099.99 },
    { id: 3, name: "512GB", price: 1299.99 },
    { id: 4, name: "1TB", price: 1499.99 },
  ],
  colors: [
    { id: 1, name: "Deep Purple", value: "#5C5470" },
    { id: 2, name: "Gold", value: "#F9E5C9" },
    { id: 3, name: "Silver", value: "#F5F5F7" },
    { id: 4, name: "Space Black", value: "#505050" },
  ],
};

// Mock related products
const relatedProducts = [
  {
    id: 102,
    name: "Samsung Galaxy S23",
    price: 849.99,
    image: "https://m.media-amazon.com/images/I/61VuytXZcXL._AC_SL1500_.jpg",
    rating: 4.7,
  },
  {
    id: 103,
    name: "Google Pixel 7",
    price: 599.99,
    image: "https://m.media-amazon.com/images/I/71geVdy6-OS._AC_SL1500_.jpg",
    rating: 4.5,
  },
  {
    id: 104,
    name: "Apple AirPods Pro",
    price: 249.99,
    image: "https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SL1500_.jpg",
    rating: 4.8,
  },
  {
    id: 105,
    name: "Apple Watch Series 9",
    price: 399.99,
    image: "https://m.media-amazon.com/images/I/71nVpf3GgxL._AC_SL1500_.jpg",
    rating: 4.9,
  },
];

const Product = () => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Add product to cart logic would go here
      console.log("Adding to cart:", {
        ...product,
        quantity,
        variant: selectedVariant,
        color: selectedColor,
      });
    }, 1000);
  };

  return (
    <div style={{ background: "#f5f6fa", minHeight: "100vh", padding: 24 }}>
      <Breadcrumb
        items={[
          { title: <Link to="/">Home</Link> },
          { title: <Link to="/categories">Categories</Link> },
          {
            title: (
              <Link to={`/categories/${product.categorySlug}`}>
                {product.category}
              </Link>
            ),
          },
          { title: product.name },
        ]}
        style={{ marginBottom: 24 }}
      />
      <Row gutter={[40, 40]} align="top">
        {/* Product Images */}
        <Col xs={24} md={12}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              boxShadow: "0 2px 16px #0001",
              background: "#fff",
            }}
          >
            <Image.PreviewGroup>
              <Image
                src={selectedImage}
                alt={product.name}
                style={{
                  height: 400,
                  width: "100%",
                  objectFit: "contain",
                  borderRadius: 12,
                  background: "#fff",
                }}
                preview={{
                  src: selectedImage,
                }}
              />
              <Space style={{ marginTop: 16 }}>
                {product.images.map((img, idx) => (
                  <Image
                    key={idx}
                    src={img}
                    alt={`${product.name} - view ${idx + 1}`}
                    width={64}
                    height={64}
                    style={{
                      objectFit: "contain",
                      borderRadius: 8,
                      border:
                        selectedImage === img
                          ? "2px solid #10b981"
                          : "1px solid #eee",
                      cursor: "pointer",
                      boxShadow:
                        selectedImage === img
                          ? "0 0 0 2px #10b98133"
                          : undefined,
                    }}
                    preview={false}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </Space>
            </Image.PreviewGroup>
          </Card>
        </Col>
        {/* Product Details */}
        <Col xs={24} md={12}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              boxShadow: "0 2px 16px #0001",
              background: "#fff",
            }}
          >
            <Space
              direction="vertical"
              size="large"
              style={{ width: "100%" }}
              align="start"
            >
              <Space align="center">
                <Tag
                  color={product.stock > 0 ? "success" : "error"}
                  icon={product.stock > 0 ? <CheckCircleOutlined /> : undefined}
                >
                  {product.stock > 0
                    ? `In Stock (${product.stock} available)`
                    : "Out of Stock"}
                </Tag>
                {product.isFeatured && <Tag color="warning">Featured</Tag>}
              </Space>
              <Title level={2} style={{ margin: 0 }}>
                {product.name}
              </Title>
              <Space align="center" size="middle">
                <Rate disabled defaultValue={product.rating} allowHalf />
                <Text>({product.rating} ratings)</Text>
                <Divider type="vertical" />
                <Text type="secondary">SKU: {product.sku}</Text>
              </Space>
              <Space align="baseline" size="large">
                {product.discountPrice ? (
                  <>
                    <Text delete type="secondary" style={{ fontSize: 18 }}>
                      ${product.price.toFixed(2)}
                    </Text>
                    <Title level={2} style={{ color: "#10b981", margin: 0 }}>
                      ${product.discountPrice.toFixed(2)}
                    </Title>
                    <Tag color="success" style={{ fontWeight: 600 }}>
                      {Math.round(
                        ((product.price - product.discountPrice) /
                          product.price) *
                          100
                      )}
                      % OFF
                    </Tag>
                  </>
                ) : (
                  <Title level={2} style={{ margin: 0 }}>
                    ${product.price.toFixed(2)}
                  </Title>
                )}
              </Space>
              <Paragraph>{product.description}</Paragraph>
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <Text strong>Storage Capacity</Text>
                <Space wrap>
                  {product.variants.map((variant) => (
                    <Button
                      key={variant.id}
                      type={
                        selectedVariant.id === variant.id
                          ? "primary"
                          : "default"
                      }
                      shape="round"
                      size="large"
                      style={
                        selectedVariant.id === variant.id
                          ? {
                              backgroundColor: "#10b981",
                              borderColor: "#10b981",
                            }
                          : {}
                      }
                      onClick={() => setSelectedVariant(variant)}
                    >
                      {variant.name}
                      {selectedVariant.id === variant.id &&
                        variant.price !== product.price && (
                          <span style={{ marginLeft: 4, fontSize: 12 }}>
                            (+${(variant.price - product.price).toFixed(2)})
                          </span>
                        )}
                    </Button>
                  ))}
                </Space>
                <Text type="secondary">
                  Selected:{" "}
                  <span style={{ fontWeight: 500 }}>
                    {selectedVariant.name}
                  </span>
                  {selectedVariant.price !== product.price && (
                    <span style={{ marginLeft: 4 }}>
                      (+${(selectedVariant.price - product.price).toFixed(2)})
                    </span>
                  )}
                </Text>
              </Space>
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <Text strong>Color</Text>
                <Space>
                  {product.colors.map((color) => (
                    <Tooltip title={color.name} key={color.id}>
                      <Button
                        shape="circle"
                        size="large"
                        style={{
                          backgroundColor: color.value,
                          border:
                            selectedColor.id === color.id
                              ? "2px solid #10b981"
                              : "1px solid #eee",
                          boxShadow:
                            selectedColor.id === color.id
                              ? "0 0 0 2px #10b98133"
                              : undefined,
                        }}
                        onClick={() => setSelectedColor(color)}
                      />
                    </Tooltip>
                  ))}
                </Space>
                <Text>Color: {selectedColor.name}</Text>
              </Space>
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <Text strong>Quantity</Text>
                <InputNumber
                  min={1}
                  max={product.stock}
                  value={quantity}
                  onChange={setQuantity}
                  size="large"
                  style={{ width: 140 }}
                />
                <Text type="secondary">
                  <CheckCircleOutlined
                    style={{ color: "#10b981", marginRight: 4 }}
                  />
                  {product.stock} items available
                </Text>
              </Space>
              <Affix offsetBottom={24} style={{ width: "100%" }}>
                <Space style={{ width: "100%" }}>
                  <Button
                    type="primary"
                    size="large"
                    icon={<ShoppingCartOutlined />}
                    onClick={handleAddToCart}
                    loading={loading}
                    style={{ backgroundColor: "#10b981", flex: 1 }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    size="large"
                    icon={<ShareAltOutlined />}
                    style={{
                      flex: 1,
                      borderColor: "#10b981",
                      color: "#10b981",
                    }}
                  >
                    Share
                  </Button>
                </Space>
              </Affix>
              <Card
                bordered={false}
                style={{
                  background: "#f6ffed",
                  borderRadius: 12,
                  padding: 16,
                }}
              >
                <Space direction="vertical" size={4}>
                  <Space align="center">
                    <ShoppingOutlined
                      style={{ color: "#10b981", fontSize: 18 }}
                    />
                    <Text>Free shipping on orders over $50</Text>
                  </Space>
                  <Space align="center">
                    <CheckCircleOutlined
                      style={{ color: "#10b981", fontSize: 18 }}
                    />
                    <Text>30-day money-back guarantee</Text>
                  </Space>
                  <Space align="center">
                    <Text>Secure payment & 2-year warranty</Text>
                  </Space>
                </Space>
              </Card>
            </Space>
          </Card>
        </Col>
      </Row>
      <Divider />
      {/* Product Tabs */}
      <Tabs defaultActiveKey="specifications" style={{ marginTop: 32 }}>
        <TabPane tab="Specifications" key="specifications">
          <Descriptions bordered column={{ xs: 1, sm: 2 }}>
            {product.specs.map((spec, index) => (
              <Descriptions.Item key={index} label={spec.key}>
                {spec.value}
              </Descriptions.Item>
            ))}
          </Descriptions>
        </TabPane>
        <TabPane tab="Reviews" key="reviews">
          <Space align="center" style={{ marginBottom: 24 }}>
            <Title level={1} style={{ margin: 0 }}>
              {product.rating}
            </Title>
            <div>
              <Rate disabled defaultValue={product.rating} allowHalf />
              <Text type="secondary">Based on 245 reviews</Text>
            </div>
          </Space>
          <Button
            type="primary"
            icon={<StarOutlined />}
            style={{ backgroundColor: "#10b981" }}
          >
            Write a Review
          </Button>
          <div style={{ marginTop: 24 }}>
            <Skeleton active avatar paragraph={{ rows: 2 }} />
            <Skeleton
              active
              avatar
              paragraph={{ rows: 2 }}
              style={{ marginTop: 24 }}
            />
          </div>
        </TabPane>
        <TabPane tab="Shipping & Returns" key="shipping">
          <div style={{ maxWidth: 700 }}>
            <Title level={4}>Shipping Policy</Title>
            <Paragraph>
              We offer free standard shipping on all orders over $50. For orders
              under $50, standard shipping is $5.99. Express shipping is
              available for an additional fee. Most orders are processed and
              shipped within 1-2 business days.
            </Paragraph>
            <Title level={4} style={{ marginTop: 24 }}>
              Return Policy
            </Title>
            <Paragraph>
              We offer a 30-day return policy for most items. To be eligible for
              a return, your item must be unused and in the same condition that
              you received it. It must also be in the original packaging. To
              complete your return, we require a receipt or proof of purchase.
            </Paragraph>
            <Title level={4} style={{ marginTop: 24 }}>
              Refunds
            </Title>
            <Paragraph>
              Once your return is received and inspected, we will send you an
              email to notify you that we have received your returned item. We
              will also notify you of the approval or rejection of your refund.
              If you are approved, then your refund will be processed, and a
              credit will automatically be applied to your credit card or
              original method of payment.
            </Paragraph>
          </div>
        </TabPane>
      </Tabs>
      {/* Related Products */}
      <div style={{ marginTop: 64 }}>
        <Title level={3} style={{ marginBottom: 24 }}>
          You May Also Like
        </Title>
        <List
          grid={{ gutter: 24, xs: 2, sm: 3, md: 4, lg: 4, xl: 4, xxl: 6 }}
          dataSource={relatedProducts}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                cover={
                  <div
                    style={{
                      height: 180,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#fafafa",
                      padding: 16,
                    }}
                  >
                    <img
                      alt={item.name}
                      src={item.image}
                      style={{
                        height: "100%",
                        objectFit: "contain",
                        maxWidth: "100%",
                      }}
                    />
                  </div>
                }
                actions={[
                  <Rate
                    disabled
                    defaultValue={item.rating}
                    allowHalf
                    style={{ fontSize: 14 }}
                  />,
                  <Button type="text" icon={<ShoppingOutlined />} />,
                ]}
              >
                <Card.Meta
                  title={item.name}
                  description={`$${item.price.toFixed(2)}`}
                />
              </Card>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Product;
