import { useEffect, useState, useCallback } from "react";
import {
  Input,
  AutoComplete,
  Card,
  Typography,
  Space,
  Avatar,
  Tag,
  Flex,
  Spin,
  Badge,
  Divider,
  Button,
  Empty,
} from "antd";
import {
  ShoppingOutlined,
  LoadingOutlined,
  StarFilled,
  SearchOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useGetProductsInfoQuery } from "../../../pages/product/productApi";

const { Search } = Input;
const { Text } = Typography;

const SearchProduct = ({ placeholder = "Search products..." }) => {
  const [searchValue, setSearchValue] = useState("");
  const [options, setOptions] = useState([]);
  const [searchTrigger, setSearchTrigger] = useState("");
  const navigate = useNavigate();

  // Only trigger API call when user explicitly searches
  const productResponse = useGetProductsInfoQuery(
    {
      page: 1,
      pageSize: 8,
      keyword: searchTrigger,
    },
    {
      skip: !searchTrigger, // Skip query if no search term
    }
  );

  const { data, isFetching } = productResponse;
  const { content } = data || {};

  // Handle search button click or Enter key
  const handleSearch = useCallback(() => {
    if (searchValue.trim()) {
      setSearchTrigger(searchValue.trim());
    }
  }, [searchValue]);

  // Handle input change
  const handleInputChange = (value) => {
    setSearchValue(value);
    if (!value.trim()) {
      setOptions([]);
      setSearchTrigger("");
    }
  };

  // Handle option select
  const handleSelect = (value, option) => {
    if (option.key === "view-all") {
      navigate(`/search?q=${encodeURIComponent(searchTrigger)}`);
    } else if (option.productId) {
      navigate(`/product/${option.productId}`);
    }
    setSearchValue("");
    setOptions([]);
  };

  // Create enhanced product options
  const createProductOptions = useCallback(
    (products) => {
      if (!products || products.length === 0) return [];

      const productOptions = products.map((product) => ({
        value: product.title,
        label: (
          <div
            className="product-search-item"
            onClick={() => navigate(`/product/${product.id}`)}
            style={{
              padding: "12px 8px",
              borderRadius: "8px",
              transition: "all 0.2s ease",
              cursor: "pointer",
            }}
          >
            <Flex align="center" gap={12}>
              <div style={{ position: "relative" }}>
                <Avatar
                  src={
                    product.image ||
                    "https://via.placeholder.com/64x64/f0f0f0/666?text=No+Image"
                  }
                  size={56}
                  shape="square"
                  style={{
                    borderRadius: 8,
                    border: "1px solid #f0f0f0",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                />
                {product.discount && (
                  <Badge
                    count={`-${product.discount}%`}
                    style={{
                      position: "absolute",
                      top: -5,
                      right: -5,
                      backgroundColor: "#ff4d4f",
                      fontSize: "10px",
                      borderRadius: "4px",
                      padding: "0 4px",
                    }}
                  />
                )}
              </div>

              <Flex vertical flex={1} style={{ minWidth: 0 }}>
                <Text
                  strong
                  ellipsis
                  style={{
                    fontSize: "14px",
                    marginBottom: 4,
                    color: "#262626",
                    fontWeight: 600,
                  }}
                >
                  {product.title}
                </Text>

                <Space size={8} wrap style={{ marginBottom: 4 }}>
                  <Tag
                    color="processing"
                    style={{
                      borderRadius: 4,
                      fontSize: "11px",
                      margin: 0,
                      fontWeight: 500,
                    }}
                  >
                    {product.brand}
                  </Tag>
                  <Text
                    type="secondary"
                    style={{
                      fontSize: "11px",
                      color: "#8c8c8c",
                    }}
                  >
                    {product.category}
                  </Text>
                </Space>

                {product.rating && (
                  <Space size={4} align="center">
                    <StarFilled
                      style={{ color: "#faad14", fontSize: "12px" }}
                    />
                    <Text style={{ fontSize: "12px", color: "#666" }}>
                      {product.rating}
                    </Text>
                    {product.reviewCount && (
                      <Text style={{ fontSize: "11px", color: "#999" }}>
                        ({product.reviewCount})
                      </Text>
                    )}
                  </Space>
                )}
              </Flex>

              <Flex vertical align="end" style={{ minWidth: "80px" }}>
                <Space direction="vertical" size={2} align="end">
                  <Text
                    strong
                    style={{
                      color: "#52c41a",
                      fontSize: "15px",
                      fontWeight: 600,
                    }}
                  >
                    ${product.price}
                  </Text>
                  {product.originalPrice &&
                    product.originalPrice > product.price && (
                      <Text
                        delete
                        type="secondary"
                        style={{
                          fontSize: "12px",
                          color: "#999",
                        }}
                      >
                        ${product.originalPrice}
                      </Text>
                    )}
                  {product.inStock === false && (
                    <Tag
                      color="error"
                      size="small"
                      style={{ fontSize: "10px" }}
                    >
                      Out of Stock
                    </Tag>
                  )}
                </Space>
              </Flex>
            </Flex>
          </div>
        ),
        key: product.id,
      }));

      // Add "View All Results" option if there are results
      if (productOptions.length > 0 && searchTrigger) {
        productOptions.push({
          value: `View all results for "${searchTrigger}"`,
          label: (
            <div>
              <Divider style={{ margin: "8px 0" }} />
              <Card
                size="small"
                bodyStyle={{
                  padding: "12px",
                  textAlign: "center",
                  background:
                    "linear-gradient(135deg, #f6ffed 0%, #f0f9ff 100%)",
                }}
                style={{
                  border: "1px solid #b7eb8f",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                hoverable
                onClick={() =>
                  navigate(`/search?q=${encodeURIComponent(searchTrigger)}`)
                }
              >
                <Space>
                  <ShoppingOutlined
                    style={{ color: "#52c41a", fontSize: "16px" }}
                  />
                  <Text style={{ color: "#52c41a", fontWeight: 600 }}>
                    View all {products.length}+ results for "{searchTrigger}"
                  </Text>
                </Space>
              </Card>
            </div>
          ),
          key: "view-all",
        });
      }

      return productOptions;
    },
    [navigate, searchTrigger]
  );

  // Update options when API data changes
  useEffect(() => {
    if (content && content.length > 0 && searchTrigger) {
      setOptions(createProductOptions(content));
    } else if (!searchTrigger) {
      setOptions([]);
    }
  }, [content, searchTrigger, createProductOptions]);

  // Clear options when search is cleared
  useEffect(() => {
    if (!searchValue) {
      setOptions([]);
      setSearchTrigger("");
    }
  }, [searchValue]);

  return (
    <Flex gap="middle" align="center" justify="center">
      <AutoComplete
        value={searchValue}
        options={options}
        onSearch={handleInputChange}
        onSelect={handleSelect}
        className="w-1/2"
        notFoundContent={
          searchValue ? (
            <div style={{ padding: 16, textAlign: "center" }}>
              {isFetching ? (
                <Space direction="vertical" align="center">
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 24 }} spin />
                    }
                  />
                  <Text type="secondary">Searching products...</Text>
                </Space>
              ) : (
                <Space direction="vertical" align="center">
                  <Text type="secondary">
                    No products found for "{searchValue}"
                  </Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Try different keywords or check spelling
                  </Text>
                </Space>
              )}
            </div>
          ) : null
        }
        dropdownRender={(menu) => (
          <div
            style={{
              maxHeight: 400,
              overflowY: "auto",
              background: "white",
              borderRadius: 8,
              boxShadow: "0 6px 16px rgba(0, 0, 0, 0.12)",
              border: "1px solid #f0f0f0",
            }}
          >
            {isFetching && searchValue && (
              <div
                style={{
                  padding: 12,
                  textAlign: "center",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <Space>
                  <Spin size="small" />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Loading more results...
                  </Text>
                </Space>
              </div>
            )}
            {menu}
          </div>
        )}
      >
        <Search
          placeholder={placeholder}
          enterButton
          loading={isFetching && !!searchValue}
          onSearch={handleSearch}
          onPressEnter={() => {
            handleSearch();
          }}
          style={{
            "& .ant-input": {
              borderRadius: "8px",
              fontSize: "14px",
            },
            "& .ant-btn": {
              borderRadius: "0 8px 8px 0",
              background: "#52c41a",
              borderColor: "#52c41a",
            },
          }}
        />
      </AutoComplete>

      <style jsx>{`
        .product-search-item:hover {
          background-color: #f5f5f5 !important;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .ant-select-dropdown .ant-select-item-option-content {
          padding: 0 !important;
        }

        .ant-auto-complete-dropdown .ant-select-item {
          padding: 0 !important;
        }

        .ant-auto-complete-dropdown .ant-select-item:hover {
          background-color: transparent !important;
        }
      `}</style>
    </Flex>
  );
};

export default SearchProduct;
