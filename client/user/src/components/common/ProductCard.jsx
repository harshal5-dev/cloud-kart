import {
  Card,
  Button,
  Tag,
  Typography,
  Space,
  Badge,
  Tooltip,
  Rate,
  Divider,
  Progress,
  Avatar,
  Skeleton,
} from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  EyeOutlined,
  FireOutlined,
  CrownOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Link } from "react-router";
import PropTypes from "prop-types";
import { cssVariables } from "../../config/themeConfig";

const { Text, Title } = Typography;

const ProductCard = ({ product, loading, size = "default" }) => {
  if (loading) {
    return (
      <Card
        style={{
          borderRadius: cssVariables.borderRadiusCard,
          boxShadow: cssVariables.shadowSubtle,
          height: "100%",
        }}
      >
        <Skeleton.Image
          style={{
            width: "100%",
            height: size === "small" ? 128 : 200,
          }}
          active
        />
        <Skeleton active paragraph={{ rows: 3 }} style={{ marginTop: 16 }} />
      </Card>
    );
  }

  const isCompact = size === "small";
  const isFeatured = product.isFeatured;
  const isDiscounted =
    product.discountPrice && product.discountPrice < product.price;
  const discountPercentage = isDiscounted
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100
      )
    : 0;

  const stockPercentage = Math.min((product.stock / 100) * 100, 100);
  const finalPrice = product.discountPrice || product.price;

  const cardStyle = {
    borderRadius: cssVariables.borderRadiusCard,
    boxShadow: cssVariables.shadowSubtle,
    border: `1px solid ${cssVariables.borderSubtle}`,
    overflow: "hidden",
    background: cssVariables.containerBackground,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    height: "100%",
  };

  const imageStyle = {
    height: isCompact ? 140 : 200,
    objectFit: "contain",
    background: `linear-gradient(135deg, ${cssVariables.glassOverlayLight}, ${cssVariables.whiteTransparent25})`,
    padding: "16px",
    transition: "transform 0.5s ease",
  };

  const priceStyle = {
    color: cssVariables.colorPrimary,
    fontSize: isCompact ? "14px" : "18px",
    fontWeight: cssVariables.fontWeightBold,
  };

  const actions = !isCompact
    ? [
        <Tooltip title="Quick View" key="view">
          <Button
            type="text"
            icon={<EyeOutlined />}
            style={{
              color: cssVariables.colorInfo,
              borderRadius: cssVariables.borderRadiusButton,
            }}
          />
        </Tooltip>,
        <Tooltip title="Add to Wishlist" key="wishlist">
          <Button
            type="text"
            icon={<HeartOutlined />}
            style={{
              color: cssVariables.colorMagenta,
              borderRadius: cssVariables.borderRadiusButton,
            }}
          />
        </Tooltip>,
        <Tooltip title="Add to Cart" key="cart">
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            style={{
              borderRadius: cssVariables.borderRadiusButton,
              background: cssVariables.headerGradientPrimary,
              border: "none",
              boxShadow: cssVariables.shadowLight,
            }}
          />
        </Tooltip>,
      ]
    : undefined;

  return (
    <Badge.Ribbon
      text={
        isDiscounted
          ? `${discountPercentage}% OFF`
          : isFeatured
          ? "Featured"
          : product.stock && product.stock < 10
          ? "Low Stock"
          : null
      }
      color={
        isDiscounted
          ? cssVariables.colorError
          : isFeatured
          ? cssVariables.colorSecondary
          : cssVariables.colorWarning
      }
      style={{
        display:
          isDiscounted || isFeatured || (product.stock && product.stock < 10)
            ? "block"
            : "none",
      }}
    >
      <Card
        hoverable
        style={cardStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = cssVariables.shadowMedium;
          e.currentTarget.style.borderColor = cssVariables.colorPrimary;
          const img = e.currentTarget.querySelector("img");
          if (img) img.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = cssVariables.shadowSubtle;
          e.currentTarget.style.borderColor = cssVariables.borderSubtle;
          const img = e.currentTarget.querySelector("img");
          if (img) img.style.transform = "scale(1)";
        }}
        cover={
          <Link to={`/products/${product.id || product.sku}`}>
            <div style={{ position: "relative", overflow: "hidden" }}>
              <img
                alt={product.name || product.title}
                src={
                  product.image ||
                  product.imageUrl ||
                  "https://via.placeholder.com/300x200?text=No+Image"
                }
                style={imageStyle}
              />

              {isFeatured && (
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    background: cssVariables.headerGradientPrimary,
                    borderRadius: "50%",
                    padding: "8px",
                    boxShadow: cssVariables.shadowLight,
                    zIndex: 2,
                  }}
                >
                  <CrownOutlined
                    style={{
                      color: cssVariables.colorWhite,
                      fontSize: "14px",
                    }}
                  />
                </div>
              )}

              {product.rating && (
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    background: cssVariables.whiteTransparent90,
                    borderRadius: cssVariables.borderRadiusButton,
                    padding: "4px 8px",
                    backdropFilter: "blur(8px)",
                    border: `1px solid ${cssVariables.borderSubtle}`,
                    zIndex: 2,
                  }}
                >
                  <Space size="small">
                    <StarFilled
                      style={{
                        color: cssVariables.colorWarning,
                        fontSize: "12px",
                      }}
                    />
                    <Text
                      style={{
                        fontSize: "12px",
                        fontWeight: cssVariables.fontWeightMedium,
                        color: cssVariables.colorText,
                      }}
                    >
                      {product.rating}
                    </Text>
                  </Space>
                </div>
              )}
            </div>
          </Link>
        }
        actions={actions}
        bodyStyle={{ padding: isCompact ? 12 : 16 }}
      >
        <div>
          <Space wrap style={{ marginBottom: 8 }}>
            {product.category && (
              <Tag
                color={product.categoryColor || cssVariables.colorInfo}
                style={{
                  borderRadius: cssVariables.borderRadiusButton,
                  fontSize: "11px",
                  fontWeight: cssVariables.fontWeightMedium,
                  textTransform: "uppercase",
                }}
              >
                {product.category}
              </Tag>
            )}
            {product.brand && (
              <Tag
                color={cssVariables.colorPurple}
                style={{
                  borderRadius: cssVariables.borderRadiusButton,
                  fontSize: "11px",
                  fontWeight: cssVariables.fontWeightMedium,
                }}
              >
                {product.brand}
              </Tag>
            )}
          </Space>

          <Link to={`/products/${product.id || product.sku}`}>
            <Title
              level={isCompact ? 5 : 4}
              style={{
                margin: "8px 0",
                color: cssVariables.colorText,
                fontWeight: cssVariables.fontWeightBold,
                lineHeight: cssVariables.lineHeightCompact,
              }}
              ellipsis={{ rows: 2 }}
            >
              {product.name || product.title}
            </Title>
          </Link>

          {product.description && !isCompact && (
            <Text
              type="secondary"
              style={{
                fontSize: cssVariables.fontSizeSmall,
                lineHeight: 1.4,
                display: "block",
                marginBottom: 12,
              }}
              ellipsis={{ rows: 2 }}
            >
              {product.description}
            </Text>
          )}

          {product.stock && product.stock <= 50 && !isCompact && (
            <div style={{ marginBottom: 12 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 4,
                }}
              >
                <Text
                  style={{
                    fontSize: "11px",
                    color: cssVariables.colorTextSecondary,
                    fontWeight: cssVariables.fontWeightMedium,
                  }}
                >
                  Stock Level
                </Text>
                <Text
                  style={{
                    fontSize: "11px",
                    color:
                      product.stock < 10
                        ? cssVariables.colorError
                        : cssVariables.colorSuccess,
                    fontWeight: cssVariables.fontWeightBold,
                  }}
                >
                  {product.stock} left
                </Text>
              </div>
              <Progress
                percent={stockPercentage}
                size="small"
                strokeColor={{
                  "0%":
                    product.stock < 10
                      ? cssVariables.colorError
                      : cssVariables.colorSuccess,
                  "100%":
                    product.stock < 10
                      ? cssVariables.colorWarning
                      : cssVariables.colorProgressEnd,
                }}
                showInfo={false}
                style={{ margin: 0 }}
              />
            </div>
          )}

          {!isCompact && <Divider style={{ margin: "12px 0" }} />}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: isCompact ? 8 : 0,
            }}
          >
            <Space direction="vertical" size="small">
              <div>
                {isDiscounted && (
                  <Text
                    delete
                    type="secondary"
                    style={{
                      marginRight: 8,
                      fontSize: cssVariables.fontSizeSmall,
                    }}
                  >
                    ${product.price.toFixed(2)}
                  </Text>
                )}
                <Text style={priceStyle}>${finalPrice.toFixed(2)}</Text>
              </div>

              {product.totalSales && !isCompact && (
                <Space size="small">
                  <FireOutlined
                    style={{
                      color: cssVariables.colorOrange,
                      fontSize: "12px",
                    }}
                  />
                  <Text
                    style={{
                      fontSize: "11px",
                      color: cssVariables.colorTextSecondary,
                    }}
                  >
                    {product.totalSales} sold
                  </Text>
                </Space>
              )}
            </Space>

            {product.sku && !isCompact && (
              <Tooltip title={`SKU: ${product.sku}`}>
                <Avatar
                  size="small"
                  style={{
                    background: cssVariables.glassOverlay,
                    color: cssVariables.colorPrimary,
                    fontSize: "10px",
                    fontWeight: cssVariables.fontWeightBold,
                    border: `1px solid ${cssVariables.borderSubtle}`,
                  }}
                >
                  {product.sku.replace(/SKU/i, "")}
                </Avatar>
              </Tooltip>
            )}
          </div>

          {isCompact && (
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              size="small"
              style={{
                width: "100%",
                marginTop: 12,
                borderRadius: cssVariables.borderRadiusButton,
                background: cssVariables.headerGradientPrimary,
                border: "none",
              }}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </Card>
    </Badge.Ribbon>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sku: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number.isRequired,
    discountPrice: PropTypes.number,
    rating: PropTypes.number,
    image: PropTypes.string,
    imageUrl: PropTypes.string,
    category: PropTypes.string,
    categoryColor: PropTypes.string,
    brand: PropTypes.string,
    description: PropTypes.string,
    stock: PropTypes.number,
    isFeatured: PropTypes.bool,
    totalSales: PropTypes.number,
  }),
  loading: PropTypes.bool,
  size: PropTypes.oneOf(["small", "default", "large"]),
};

export default ProductCard;
