import { useState } from "react";
import {
  Typography,
  Carousel,
  Card,
  Button,
  Row,
  Col,
  Skeleton,
  Tag,
  Divider,
  Space,
  Badge,
  Statistic,
} from "antd";
import {
  RightOutlined,
  ShoppingCartOutlined,
  FireOutlined,
  StarOutlined,
  ThunderboltOutlined,
  HeartOutlined,
  EyeOutlined,
  TrophyOutlined,
  GiftOutlined,
  ShoppingOutlined,
  UserOutlined,
  AppstoreOutlined,
  CrownOutlined,
} from "@ant-design/icons";
import { Link } from "react-router";

const { Title, Text, Paragraph } = Typography;
const { Meta } = Card;

// Updated product data matching your structure
const featuredProducts = [
  {
    id: 1,
    title: "iPhone 14 Pro",
    description: "Latest Apple smartphone with A16 Bionic chip",
    price: 999.99,
    stock: 67,
    brand: "Apple",
    sku: "SKU101",
    isFeatured: true,
    totalSales: 909,
    categorySlug: "electronics",
    imageUrl: "https://m.media-amazon.com/images/I/71XyfJtHwDL._AC_SL1500_.jpg",
    rating: 4.8,
    discount: 10,
  },
  {
    id: 2,
    title: "Samsung Galaxy S23",
    description: "Flagship Android phone with advanced camera",
    price: 849.99,
    stock: 45,
    brand: "Samsung",
    sku: "SKU102",
    isFeatured: true,
    totalSales: 756,
    categorySlug: "electronics",
    imageUrl: "https://m.media-amazon.com/images/I/71XyfJtHwDL._AC_SL1500_.jpg",
    rating: 4.7,
    discount: 15,
  },
  {
    id: 3,
    title: "MacBook Pro M3",
    description: "Professional laptop with M3 chip",
    price: 1599.99,
    stock: 23,
    brand: "Apple",
    sku: "SKU103",
    isFeatured: true,
    totalSales: 432,
    categorySlug: "electronics",
    imageUrl: "https://m.media-amazon.com/images/I/61nVpf3GgxL._AC_SL1500_.jpg",
    rating: 4.9,
    discount: 8,
  },
  {
    id: 4,
    title: "AirPods Pro 2",
    description: "Wireless earbuds with active noise cancellation",
    price: 249.99,
    stock: 156,
    brand: "Apple",
    sku: "SKU104",
    isFeatured: true,
    totalSales: 1205,
    categorySlug: "electronics",
    imageUrl: "https://m.media-amazon.com/images/I/71bhWgQK-cL._AC_SL1500_.jpg",
    rating: 4.7,
    discount: 12,
  },
];

const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    description: "Gadgets, devices and more",
    imageUrl:
      "https://split-cart-bucket.s3.eu-north-1.amazonaws.com/Electronics.jpeg",
    productCount: 1240,
    color: "#1890ff",
  },
  {
    name: "Fashion",
    slug: "fashion",
    description: "Trending styles and apparel",
    imageUrl:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    productCount: 856,
    color: "#722ed1",
  },
  {
    name: "Home & Living",
    slug: "home",
    description: "Furniture and home decor",
    imageUrl:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    productCount: 654,
    color: "#52c41a",
  },
  {
    name: "Sports & Outdoors",
    slug: "sports",
    description: "Fitness and outdoor gear",
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    productCount: 423,
    color: "#fa8c16",
  },
];

const heroBanners = [
  {
    id: 1,
    title: "Latest Electronics Collection",
    subtitle: "Discover cutting-edge technology",
    description: "Get up to 25% off on flagship smartphones and laptops",
    imageUrl:
      "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ctaText: "Shop Electronics",
    ctaLink: "/categories/electronics",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: 2,
    title: "iPhone 14 Pro Series",
    subtitle: "Pro. Beyond.",
    description: "Experience the most advanced iPhone with A16 Bionic chip",
    imageUrl:
      "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ctaText: "Explore iPhones",
    ctaLink: "/products/iphone-14-pro",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: 3,
    title: "Free Shipping",
    subtitle: "On All Orders",
    description: "Enjoy free delivery on orders over $50 worldwide",
    imageUrl:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ctaText: "Start Shopping",
    ctaLink: "/products",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
];

const ProductCard = ({ product }) => {
  const discountedPrice = product.price * (1 - product.discount / 100);

  return (
    <Card
      hoverable
      style={{
        height: "100%",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        border: "1px solid #f0f0f0",
      }}
      cover={
        <div
          style={{
            height: 220,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
            padding: 20,
            position: "relative",
          }}
        >
          {product.discount > 0 && (
            <Tag
              color="red"
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                borderRadius: 20,
                padding: "4px 12px",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              -{product.discount}%
            </Tag>
          )}
          <img
            alt={product.title}
            src={product.imageUrl}
            style={{
              objectFit: "contain",
              height: "100%",
              width: "100%",
              transition: "transform 0.3s ease",
            }}
          />
        </div>
      }
    >
      <div style={{ padding: "8px 0" }}>
        <Space direction="vertical" size={8} style={{ width: "100%" }}>
          <Text type="secondary" style={{ fontSize: 12, fontWeight: 500 }}>
            {product.brand}
          </Text>

          <Title level={5} style={{ margin: 0, lineHeight: 1.3 }}>
            {product.title}
          </Title>

          <Text type="secondary" style={{ fontSize: 13, lineHeight: 1.4 }}>
            {product.description}
          </Text>

          <Space
            align="center"
            style={{ width: "100%", justifyContent: "space-between" }}
          >
            <Space align="center">
              <StarOutlined style={{ color: "#faad14", fontSize: 14 }} />
              <Text style={{ fontSize: 14, fontWeight: 500 }}>
                {product.rating}
              </Text>
              <Text type="secondary" style={{ fontSize: 12 }}>
                ({product.totalSales} sold)
              </Text>
            </Space>
          </Space>

          <Space
            align="center"
            style={{ width: "100%", justifyContent: "space-between" }}
          >
            <Space direction="vertical" size={0}>
              <Space align="center">
                <Text
                  style={{ fontSize: 18, fontWeight: 700, color: "#10b981" }}
                >
                  ${discountedPrice.toFixed(2)}
                </Text>
                {product.discount > 0 && (
                  <Text delete type="secondary" style={{ fontSize: 14 }}>
                    ${product.price.toFixed(2)}
                  </Text>
                )}
              </Space>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Stock: {product.stock} units
              </Text>
            </Space>
          </Space>

          <Space style={{ width: "100%", marginTop: 12 }}>
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              size="middle"
              style={{
                backgroundColor: "#10b981",
                borderColor: "#10b981",
                borderRadius: 8,
                flex: 1,
                fontWeight: 600,
              }}
            >
              Add to Cart
            </Button>
            <Button
              type="text"
              icon={<HeartOutlined />}
              size="middle"
              style={{
                borderRadius: 8,
                color: "#666",
              }}
            />
          </Space>
        </Space>
      </div>
    </Card>
  );
};

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/categories/${category.slug}`}>
      <Card
        hoverable
        style={{
          overflow: "hidden",
          height: 180,
          borderRadius: 16,
          position: "relative",
          border: "1px solid #f0f0f0",
          transition: "all 0.3s ease",
        }}
        bodyStyle={{ padding: 0 }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <img
            src={category.imageUrl}
            alt={category.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(135deg, ${category.color}CC 0%, ${category.color}80 100%)`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: 20,
            }}
          >
            <Title
              level={4}
              style={{ color: "white", margin: 0, marginBottom: 4 }}
            >
              {category.name}
            </Title>
            <Text
              style={{
                color: "rgba(255,255,255,0.9)",
                fontSize: 13,
                marginBottom: 8,
              }}
            >
              {category.description}
            </Text>
            <Space align="center">
              <Badge
                count={category.productCount}
                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              />
              <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}>
                products
              </Text>
            </Space>
          </div>
        </div>
      </Card>
    </Link>
  );
};

const Home = () => {
  const [loading] = useState(false);

  return (
    <div style={{ background: "#f5f6fa", padding: 24 }}>
      <section style={{ marginBottom: 40 }}>
        <Carousel autoplay style={{ borderRadius: 16, overflow: "hidden" }}>
          {heroBanners.map((banner, index) => (
            <div key={index}>
              <div style={{ position: "relative", height: 320 }}>
                <img
                  src={banner.image}
                  alt={banner.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.3), transparent)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "32px 64px",
                  }}
                >
                  <Title
                    level={1}
                    style={{ color: "white", margin: 0, marginBottom: 16 }}
                  >
                    {banner.title}
                  </Title>
                  <Paragraph
                    style={{ color: "white", fontSize: 18, marginBottom: 24 }}
                  >
                    {banner.description}
                  </Paragraph>
                  <Button
                    size="large"
                    type="primary"
                    style={{ backgroundColor: "#10b981", width: "fit-content" }}
                  >
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      <section style={{ marginBottom: 48 }}>
        <Row gutter={[24, 24]} style={{ textAlign: "center" }}>
          <Col xs={12} sm={6}>
            <Card
              style={{ height: "100%", border: "none", background: "#fff5f5" }}
            >
              <Statistic
                title="Products"
                value={50000}
                valueStyle={{ color: "#ff4d4f", fontWeight: "bold" }}
                prefix={<ShoppingOutlined />}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card
              style={{ height: "100%", border: "none", background: "#f6ffed" }}
            >
              <Statistic
                title="Happy Customers"
                value={125000}
                valueStyle={{ color: "#52c41a", fontWeight: "bold" }}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card
              style={{ height: "100%", border: "none", background: "#fff7e6" }}
            >
              <Statistic
                title="Categories"
                value={15}
                valueStyle={{ color: "#fa8c16", fontWeight: "bold" }}
                prefix={<AppstoreOutlined />}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card
              style={{ height: "100%", border: "none", background: "#f0f5ff" }}
            >
              <Statistic
                title="Brands"
                value={200}
                valueStyle={{ color: "#1890ff", fontWeight: "bold" }}
                prefix={<CrownOutlined />}
              />
            </Card>
          </Col>
        </Row>
      </section>

      <section style={{ marginBottom: 48 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <Title
            level={3}
            style={{ margin: 0, display: "flex", alignItems: "center" }}
          >
            <FireOutlined style={{ marginRight: 8, color: "#ff4d4f" }} />{" "}
            Trending Categories
          </Title>
          <Button type="link">
            View All <RightOutlined />
          </Button>
        </div>

        <Row gutter={[16, 16]}>
          {categories.slice(0, 4).map((category, index) => (
            <Col xs={12} sm={12} md={6} key={index}>
              <CategoryCard category={category} />
            </Col>
          ))}
        </Row>
      </section>

      <section style={{ marginBottom: 48 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <Title
            level={3}
            style={{ margin: 0, display: "flex", alignItems: "center" }}
          >
            <ThunderboltOutlined style={{ marginRight: 8, color: "#faad14" }} />{" "}
            Featured Products
          </Title>
          <Button type="link">
            View All <RightOutlined />
          </Button>
        </div>

        <Row gutter={[16, 24]}>
          {(loading ? Array(4).fill({}) : featuredProducts).map(
            (product, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                {loading ? (
                  <Card>
                    <Skeleton active avatar paragraph={{ rows: 2 }} />
                  </Card>
                ) : (
                  <ProductCard product={product} />
                )}
              </Col>
            )
          )}
        </Row>
      </section>

      <section
        style={{
          background: "#fafafa",
          margin: "0 -24px",
          padding: "48px 24px",
          marginTop: 32,
          marginBottom: 24,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Title level={2}>Why Choose CloudKart?</Title>
          <Text
            type="secondary"
            style={{ maxWidth: 600, margin: "0 auto", display: "block" }}
          >
            We make shopping simple, enjoyable and always at the best prices.
          </Text>
        </div>

        <Row gutter={[32, 32]} style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Col xs={24} md={8}>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 48,
                  marginBottom: 16,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                🚚
              </div>
              <Title level={4}>Fast Delivery</Title>
              <Text type="secondary">Free shipping on orders over $50</Text>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 48,
                  marginBottom: 16,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                🔒
              </div>
              <Title level={4}>Secure Payment</Title>
              <Text type="secondary">Multiple secure payment methods</Text>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 48,
                  marginBottom: 16,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                💯
              </div>
              <Title level={4}>Quality Guarantee</Title>
              <Text type="secondary">30-day money back guarantee</Text>
            </div>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default Home;
