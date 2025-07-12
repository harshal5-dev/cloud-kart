import { Card, Typography, Tag, Button, Rate, Badge, Skeleton } from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Link } from "react-router";
import PropTypes from "prop-types";

const { Meta } = Card;
const { Text } = Typography;

const ProductCard = ({ product, loading, size = "default" }) => {
  if (loading) {
    return (
      <Card className="h-full">
        <Skeleton.Image
          className={size === "small" ? "w-full h-32" : "w-full h-48"}
          active
        />
        <Skeleton active paragraph={{ rows: 2 }} className="mt-4" />
      </Card>
    );
  }

  const isDiscounted =
    product.discountPrice && product.discountPrice < product.price;
  const discountPercentage = isDiscounted
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100
      )
    : 0;

  const imageHeight = size === "small" ? "h-32" : "h-48";

  return (
    <Badge.Ribbon
      text={`${discountPercentage}% OFF`}
      color="red"
      style={{ display: isDiscounted ? "block" : "none" }}
    >
      <Card
        hoverable
        cover={
          <Link to={`/products/${product.id || product.sku}`}>
            <div
              className={`overflow-hidden flex items-center justify-center bg-gray-50 ${imageHeight} relative group`}
            >
              <img
                alt={product.name || product.title}
                src={
                  product.image ||
                  product.imageUrl ||
                  "https://via.placeholder.com/300x200?text=No+Image"
                }
                className="object-contain h-full w-full p-4 transition-transform duration-500 group-hover:scale-110"
              />
              {/* Quick actions overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex gap-2">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<EyeOutlined />}
                    className="transform transition-transform hover:scale-110"
                  />
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<ShoppingCartOutlined />}
                    className="transform transition-transform hover:scale-110"
                  />
                </div>
              </div>
            </div>
          </Link>
        }
        actions={
          size === "small"
            ? undefined
            : [
                <Button type="text" icon={<EyeOutlined />} />,
                <Button type="text" icon={<HeartOutlined />} />,
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  className="hover:animate-pulse"
                  ghost
                />,
              ]
        }
        className="h-full transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
        bodyStyle={{ padding: size === "small" ? 12 : 24 }}
      >
        <Link to={`/products/${product.id || product.sku}`}>
          <Meta
            title={
              <div className="truncate">{product.name || product.title}</div>
            }
            description={
              <div>
                <div className="flex items-center mt-1 mb-2">
                  {product.rating && (
                    <>
                      <Rate
                        disabled
                        defaultValue={product.rating}
                        allowHalf
                        className="text-xs"
                      />
                      <Text className="ml-1 text-xs">({product.rating})</Text>
                    </>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    {isDiscounted && (
                      <Text delete type="secondary" className="mr-2">
                        ${product.price.toFixed(2)}
                      </Text>
                    )}
                    <Text
                      strong
                      className={`text-lg ${
                        isDiscounted ? "text-red-600" : ""
                      }`}
                    >
                      ${(product.discountPrice || product.price).toFixed(2)}
                    </Text>
                  </div>

                  {product.category && (
                    <Tag
                      color={product.categoryColor || "#3B82F6"}
                      className="ml-1 uppercase text-xs font-semibold"
                    >
                      {product.category}
                    </Tag>
                  )}
                </div>

                {size === "small" && (
                  <div className="mt-2">
                    <Button
                      type="primary"
                      icon={<ShoppingCartOutlined />}
                      size="small"
                      className="w-full hover:animate-pulse transition-all duration-300"
                    >
                      Add to Cart
                    </Button>
                  </div>
                )}
              </div>
            }
          />
        </Link>
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
  }),
  loading: PropTypes.bool,
  size: PropTypes.oneOf(["small", "default", "large"]),
};

export default ProductCard;
