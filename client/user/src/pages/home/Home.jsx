import {
  Typography,
  Carousel,
  Card,
  Button,
  Row,
  Col,
  Space,
  Badge,
  Statistic,
  Avatar,
  Progress,
  Tooltip,
  Steps,
  Divider,
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
  SafetyOutlined,
  RocketOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  GlobalOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import { Link } from "react-router";
import ProductCard from "../../components/common/ProductCard";
import { cssVariables } from "../../config/themeConfig";

const { Title, Text, Paragraph } = Typography;

// Sample data matching your product structure
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
    category: "Electronics",
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
    imageUrl:
      "https://images.samsung.com/is/image/samsung/p6pim/us/2302/gallery/us-galaxy-s23-s911-446267-sm-s911uzaaxaa-534850016?$650_519_PNG$",
    rating: 4.7,
    category: "Electronics",
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
    imageUrl:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311054290",
    rating: 4.9,
    category: "Electronics",
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
    imageUrl:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1660803972361",
    rating: 4.7,
    category: "Electronics",
  },
];

const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    count: 1240,
    icon: AppstoreOutlined,
    gradient: cssVariables.headerGradientPrimary,
  },
  {
    name: "Fashion",
    slug: "fashion",
    count: 856,
    icon: HeartOutlined,
    gradient: `linear-gradient(135deg, ${cssVariables.colorMagenta} 0%, ${cssVariables.colorPurple} 100%)`,
  },
  {
    name: "Home & Living",
    slug: "home",
    count: 654,
    icon: GiftOutlined,
    gradient: `linear-gradient(135deg, ${cssVariables.colorSuccess} 0%, ${cssVariables.colorSecondary} 100%)`,
  },
  {
    name: "Sports",
    slug: "sports",
    count: 423,
    icon: TrophyOutlined,
    gradient: `linear-gradient(135deg, ${cssVariables.colorOrange} 0%, ${cssVariables.colorWarning} 100%)`,
  },
];

const HeroSection = () => {
  const heroItems = [
    {
      title: "Premium Collection",
      subtitle: "Discover Latest Tech",
      description:
        "Get the best deals on cutting-edge technology with premium quality",
      background: cssVariables.headerGradientPrimary,
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
    },
    {
      title: "Summer Sale",
      subtitle: "Up to 50% Off",
      description: "Limited time offers on selected items - Don't miss out!",
      background: `linear-gradient(135deg, ${cssVariables.colorSecondary} 0%, ${cssVariables.colorSuccess} 100%)`,
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800",
    },
    {
      title: "New Arrivals",
      subtitle: "Fresh & Trending",
      description: "Explore the latest products that everyone is talking about",
      background: `linear-gradient(135deg, ${cssVariables.colorMagenta} 0%, ${cssVariables.colorPurple} 100%)`,
      image:
        "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800",
    },
  ];

  return (
    <Carousel
      autoplay
      effect="fade"
      autoplaySpeed={4000}
      style={{
        borderRadius: cssVariables.borderRadiusCard,
        overflow: "hidden",
        marginBottom: 40,
        boxShadow: cssVariables.shadowMedium,
      }}
    >
      {heroItems.map((item, index) => (
        <div key={index}>
          <div
            style={{
              height: 450,
              background: item.background,
              position: "relative",
              display: "flex",
              alignItems: "center",
              padding: "0 5%",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                width: "50%",
                height: "100%",
                background: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.2,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: cssVariables.glassOverlayLight,
                backdropFilter: "blur(1px)",
              }}
            />
            <div style={{ zIndex: 2, maxWidth: "60%" }}>
              <Title
                level={1}
                style={{
                  color: cssVariables.colorWhite,
                  fontSize: "clamp(32px, 5vw, 56px)",
                  fontWeight: cssVariables.fontWeightBold,
                  margin: 0,
                  textShadow: cssVariables.textShadow,
                  lineHeight: cssVariables.lineHeightCompact,
                }}
              >
                {item.title}
              </Title>
              <Title
                level={2}
                style={{
                  color: cssVariables.colorWhite,
                  fontSize: "clamp(20px, 3vw, 36px)",
                  fontWeight: cssVariables.fontWeightMedium,
                  margin: "12px 0",
                  textShadow: cssVariables.textShadow,
                }}
              >
                {item.subtitle}
              </Title>
              <Paragraph
                style={{
                  color: cssVariables.colorWhite,
                  fontSize: cssVariables.fontSizeLarge,
                  marginBottom: 32,
                  textShadow: cssVariables.textShadow,
                  maxWidth: "80%",
                }}
              >
                {item.description}
              </Paragraph>
              <Space size="large">
                <Button
                  type="primary"
                  size="large"
                  style={{
                    background: cssVariables.colorWhite,
                    color: cssVariables.colorPrimary,
                    border: "none",
                    borderRadius: cssVariables.borderRadiusButton,
                    fontWeight: cssVariables.fontWeightBold,
                    boxShadow: cssVariables.shadowLight,
                    padding: "0 32px",
                    height: 48,
                  }}
                >
                  Shop Now <RightOutlined />
                </Button>
                <Button
                  ghost
                  size="large"
                  style={{
                    color: cssVariables.colorWhite,
                    borderColor: cssVariables.colorWhite,
                    borderRadius: cssVariables.borderRadiusButton,
                    fontWeight: cssVariables.fontWeightMedium,
                    padding: "0 32px",
                    height: 48,
                  }}
                >
                  Learn More
                </Button>
              </Space>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/categories/${category.slug}`}>
      <Card
        hoverable
        style={{
          height: "100%",
          borderRadius: cssVariables.borderRadiusCard,
          overflow: "hidden",
          boxShadow: cssVariables.shadowSubtle,
          border: `1px solid ${cssVariables.borderSubtle}`,
          background: cssVariables.containerBackground,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = cssVariables.shadowMedium;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = cssVariables.shadowSubtle;
        }}
        cover={
          <div
            style={{
              height: 120,
              background: category.gradient,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: cssVariables.glassOverlay,
                backdropFilter: "blur(2px)",
              }}
            />
            <category.icon
              style={{
                fontSize: 40,
                color: cssVariables.colorWhite,
                zIndex: 1,
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
              }}
            />
          </div>
        }
        bodyStyle={{
          padding: 20,
          textAlign: "center",
        }}
      >
        <Title
          level={5}
          style={{
            margin: 0,
            color: cssVariables.colorText,
            fontWeight: cssVariables.fontWeightBold,
            marginBottom: 8,
          }}
        >
          {category.name}
        </Title>
        <Space>
          <Text
            type="secondary"
            style={{
              fontSize: cssVariables.fontSizeSmall,
            }}
          >
            {category.count} items
          </Text>
          <Badge
            count={category.count}
            style={{
              backgroundColor: cssVariables.colorPrimary,
              fontSize: "10px",
              height: "18px",
              lineHeight: "18px",
              borderRadius: "9px",
            }}
            showZero
          />
        </Space>
      </Card>
    </Link>
  );
};

const FeatureCard = ({ icon, title, description, color }) => {
  return (
    <Card
      style={{
        textAlign: "center",
        borderRadius: cssVariables.borderRadiusCard,
        border: `1px solid ${cssVariables.borderSubtle}`,
        boxShadow: cssVariables.shadowSubtle,
        background: cssVariables.containerBackground,
        height: "100%",
      }}
      bodyStyle={{ padding: 24 }}
    >
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 16px",
          boxShadow: `0 8px 24px ${color}30`,
        }}
      >
        {icon}
      </div>
      <Title
        level={5}
        style={{
          color: cssVariables.colorText,
          fontWeight: cssVariables.fontWeightBold,
          marginBottom: 8,
        }}
      >
        {title}
      </Title>
      <Text
        type="secondary"
        style={{
          fontSize: cssVariables.fontSizeSmall,
          lineHeight: 1.5,
        }}
      >
        {description}
      </Text>
    </Card>
  );
};

const StatCard = ({ icon, value, label, color }) => {
  return (
    <Card
      style={{
        textAlign: "center",
        borderRadius: cssVariables.borderRadiusCard,
        border: `1px solid ${cssVariables.borderSubtle}`,
        boxShadow: cssVariables.shadowSubtle,
        background: cssVariables.containerBackground,
      }}
      bodyStyle={{ padding: 24 }}
    >
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        <Avatar
          size={48}
          style={{
            background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`,
            color: cssVariables.colorWhite,
          }}
          icon={icon}
        />
        <Statistic
          value={value}
          valueStyle={{
            color: cssVariables.colorText,
            fontWeight: cssVariables.fontWeightBold,
            fontSize: "24px",
          }}
        />
        <Text
          type="secondary"
          style={{
            fontSize: cssVariables.fontSizeSmall,
            fontWeight: cssVariables.fontWeightMedium,
          }}
        >
          {label}
        </Text>
      </Space>
    </Card>
  );
};

const Home = () => {
  // const [loading, setLoading] = useState(false);

  const features = [
    {
      icon: (
        <RocketOutlined
          style={{ fontSize: 24, color: cssVariables.colorWhite }}
        />
      ),
      title: "Fast Delivery",
      description: "Get your orders delivered in 24-48 hours",
      color: cssVariables.colorInfo,
    },
    {
      icon: (
        <SafetyOutlined
          style={{ fontSize: 24, color: cssVariables.colorWhite }}
        />
      ),
      title: "Secure Payment",
      description: "100% secure payment with SSL encryption",
      color: cssVariables.colorSuccess,
    },
    {
      icon: (
        <CustomerServiceOutlined
          style={{ fontSize: 24, color: cssVariables.colorWhite }}
        />
      ),
      title: "24/7 Support",
      description: "Round the clock customer support",
      color: cssVariables.colorOrange,
    },
    {
      icon: (
        <GlobalOutlined
          style={{ fontSize: 24, color: cssVariables.colorWhite }}
        />
      ),
      title: "Worldwide Shipping",
      description: "We deliver to over 100 countries",
      color: cssVariables.colorPurple,
    },
  ];

  const stats = [
    {
      icon: <UserOutlined />,
      value: "50K+",
      label: "Happy Customers",
      color: cssVariables.colorPrimary,
    },
    {
      icon: <ShoppingOutlined />,
      value: "10K+",
      label: "Products Sold",
      color: cssVariables.colorSuccess,
    },
    {
      icon: <TrophyOutlined />,
      value: "99%",
      label: "Satisfaction Rate",
      color: cssVariables.colorWarning,
    },
    {
      icon: <GlobalOutlined />,
      value: "25+",
      label: "Countries Served",
      color: cssVariables.colorMagenta,
    },
  ];

  return (
    <div style={{ padding: "24px 0" }}>
      {/* Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <div style={{ marginBottom: 56 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Title
            level={2}
            style={{
              color: cssVariables.colorText,
              fontWeight: cssVariables.fontWeightBold,
              marginBottom: 8,
            }}
          >
            Shop by Category
          </Title>
          <Text
            type="secondary"
            style={{
              fontSize: cssVariables.fontSizeRegular,
              lineHeight: 1.6,
            }}
          >
            Discover our wide range of products across different categories
          </Text>
        </div>
        <Row gutter={[24, 24]}>
          {categories.map((category) => (
            <Col xs={12} sm={8} md={6} key={category.slug}>
              <CategoryCard category={category} />
            </Col>
          ))}
        </Row>
      </div>

      {/* Featured Products Section */}
      <div style={{ marginBottom: 56 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <div>
            <Title
              level={2}
              style={{
                color: cssVariables.colorText,
                fontWeight: cssVariables.fontWeightBold,
                marginBottom: 8,
              }}
            >
              <Space>
                <FireOutlined style={{ color: cssVariables.colorOrange }} />
                Featured Products
              </Space>
            </Title>
            <Text
              type="secondary"
              style={{
                fontSize: cssVariables.fontSizeRegular,
                lineHeight: 1.6,
              }}
            >
              Handpicked products just for you
            </Text>
          </div>
          <Link to="/products">
            <Button
              type="primary"
              style={{
                borderRadius: cssVariables.borderRadiusButton,
                background: cssVariables.headerGradientPrimary,
                border: "none",
                fontWeight: cssVariables.fontWeightMedium,
              }}
            >
              View All Products <RightOutlined />
            </Button>
          </Link>
        </div>
        <Row gutter={[24, 24]}>
          {featuredProducts.map((product) => (
            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </div>

      {/* Stats Section */}
      <div style={{ marginBottom: 56 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Title
            level={2}
            style={{
              color: cssVariables.colorText,
              fontWeight: cssVariables.fontWeightBold,
              marginBottom: 8,
            }}
          >
            Why Choose Us
          </Title>
          <Text
            type="secondary"
            style={{
              fontSize: cssVariables.fontSizeRegular,
              lineHeight: 1.6,
            }}
          >
            Numbers that speak for our excellence
          </Text>
        </div>
        <Row gutter={[24, 24]} justify="center">
          {stats.map((stat, index) => (
            <Col xs={12} sm={8} md={6} key={index}>
              <StatCard {...stat} />
            </Col>
          ))}
        </Row>
      </div>

      {/* Features Section */}
      <div style={{ marginBottom: 56 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Title
            level={2}
            style={{
              color: cssVariables.colorText,
              fontWeight: cssVariables.fontWeightBold,
              marginBottom: 8,
            }}
          >
            Our Promise to You
          </Title>
          <Text
            type="secondary"
            style={{
              fontSize: cssVariables.fontSizeRegular,
              lineHeight: 1.6,
            }}
          >
            We're committed to providing the best shopping experience
          </Text>
        </div>
        <Row gutter={[24, 24]}>
          {features.map((feature, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <FeatureCard {...feature} />
            </Col>
          ))}
        </Row>
      </div>

      {/* Call to Action Section */}
      <Card
        style={{
          background: cssVariables.headerGradientPrimary,
          border: "none",
          borderRadius: cssVariables.borderRadiusCard,
          textAlign: "center",
          boxShadow: cssVariables.shadowMedium,
        }}
        bodyStyle={{ padding: 48 }}
      >
        <Title
          level={2}
          style={{
            color: cssVariables.colorWhite,
            fontWeight: cssVariables.fontWeightBold,
            marginBottom: 16,
            textShadow: cssVariables.textShadow,
          }}
        >
          Ready to Start Shopping?
        </Title>
        <Paragraph
          style={{
            color: cssVariables.colorWhite,
            fontSize: cssVariables.fontSizeRegular,
            marginBottom: 32,
            textShadow: cssVariables.textShadow,
            maxWidth: 600,
            margin: "0 auto 32px",
          }}
        >
          Join thousands of satisfied customers and discover amazing products at
          unbeatable prices. Start your shopping journey today!
        </Paragraph>
        <Space size="large">
          <Button
            type="primary"
            size="large"
            style={{
              background: cssVariables.colorWhite,
              color: cssVariables.colorPrimary,
              border: "none",
              borderRadius: cssVariables.borderRadiusButton,
              fontWeight: cssVariables.fontWeightBold,
              boxShadow: cssVariables.shadowLight,
              padding: "0 40px",
              height: 48,
            }}
          >
            Start Shopping <ShoppingCartOutlined />
          </Button>
          <Button
            ghost
            size="large"
            style={{
              color: cssVariables.colorWhite,
              borderColor: cssVariables.colorWhite,
              borderRadius: cssVariables.borderRadiusButton,
              fontWeight: cssVariables.fontWeightMedium,
              padding: "0 40px",
              height: 48,
            }}
          >
            Learn More
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default Home;
