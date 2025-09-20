import { useState, useEffect } from "react";
import {
  AutoComplete,
  Input,
  Avatar,
  Typography,
  Space,
  Tag,
  Spin,
  Badge,
  Button,
  Divider,
  Card,
  Flex,
} from "antd";
import {
  SearchOutlined,
  LoadingOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useGetProductsInfoQuery } from "../../../pages/product/productApi";

const { Search } = Input;
const { Text } = Typography;

const SearchProduct = ({
  placeholder = "Search for products, brands, categories...",
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [options, setOptions] = useState([]);
  const [searchTrigger, setSearchTrigger] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null);
  const navigate = useNavigate();

  const { data, isFetching } = useGetProductsInfoQuery(
    {
      page: 1,
      pageSize: 3,
      keyword: searchTrigger,
    },
    {
      skip: !searchTrigger,
    }
  );

  const handleSearch = (value) => {
    setSearchValue(value);

    // Clear existing timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    if (!value.trim()) {
      setSearchTrigger("");
      setOptions([]);
      return;
    }

    // Only search if more than 2 characters are typed
    if (value.trim().length <= 2) {
      setSearchTrigger("");
      setOptions([]);
      return;
    }

    // Set new timer for debounced search
    const newTimer = setTimeout(() => {
      setSearchTrigger(value.trim());
    }, 555);

    setDebounceTimer(newTimer);
  };

  const handleSelect = (value, option) => {
    if (option.key === "view-all") {
      navigate(`/search?q=${encodeURIComponent(searchTrigger || searchValue)}`);
    } else if (option.productId) {
      navigate(`/product/${option.productId}`);
    }
    setSearchValue("");
    setOptions([]);
    setSearchTrigger("");
  };

  const handleClear = () => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
      setDebounceTimer(null);
    }
    setSearchValue("");
    setOptions([]);
    setSearchTrigger("");
  };

  const handleSearchSubmit = (value) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
      setDebounceTimer(null);
    }

    // Only search if more than 2 characters are entered
    if (value.trim() && value.trim().length > 2) {
      setSearchTrigger(value.trim());
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  useEffect(() => {
    const { content: products = [], totalElements = 0 } = data || {};
    console.log("Products from search:", data);

    if (products.length > 0 && searchTrigger) {
      const productOptions = products.map((product) => {
        const discountedPrice = (
          product.price -
          (product.price * (product.discountPercentage || 0)) / 100
        ).toFixed(2);

        return {
          value: product.title,
          label: (
            <div
              style={{
                padding: "8px 12px",
                margin: "2px 0",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                border: "1px solid transparent",
                background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f8f9ff";
                e.currentTarget.style.borderColor = "#e6f4ff";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(24, 144, 255, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Flex align="center" gap={12}>
                <div style={{ position: "relative" }}>
                  {product.discountPercentage > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: -6,
                        right: -6,
                        background:
                          "linear-gradient(135deg, #ff4757 0%, #ff3742 100%)",
                        color: "white",
                        fontSize: "9px",
                        fontWeight: "bold",
                        padding: "2px 5px",
                        borderRadius: "8px",
                        zIndex: 1,
                        boxShadow: "0 2px 4px rgba(255, 71, 87, 0.3)",
                      }}
                    >
                      {Math.round(product.discountPercentage)}% OFF
                    </div>
                  )}
                  <Avatar
                    src={
                      product.thumbnail ||
                      product.productImages?.[0]?.imageUrl ||
                      "/assets/images/fallbackImage.svg"
                    }
                    size={48}
                    shape="square"
                    style={{
                      borderRadius: "10px",
                      border: "2px solid #f0f2f5",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                    }}
                  />
                </div>

                <Flex vertical style={{ flex: 1, minWidth: 0 }}>
                  <Text
                    strong
                    ellipsis
                    style={{
                      fontSize: "13px",
                      color: "#1f2937",
                      marginBottom: "4px",
                      lineHeight: "1.3",
                      fontWeight: 600,
                    }}
                  >
                    {product.title}
                  </Text>

                  <Flex align="center" gap={6} style={{ marginBottom: "4px" }}>
                    <Tag
                      style={{
                        fontSize: "10px",
                        margin: 0,
                        padding: "1px 6px",
                        borderRadius: "6px",
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        border: "none",
                        color: "white",
                        fontWeight: 500,
                      }}
                    >
                      {product.brand}
                    </Tag>
                    <Text
                      type="secondary"
                      style={{
                        fontSize: "10px",
                        color: "#6b7280",
                        background: "#f1f5f9",
                        padding: "1px 4px",
                        borderRadius: "4px",
                        fontWeight: 500,
                      }}
                    >
                      {product.categoryName}
                    </Text>
                  </Flex>

                  <Flex align="center" gap={6}>
                    <Text
                      strong
                      style={{
                        color: "#10b981",
                        fontSize: "15px",
                        fontWeight: 700,
                        background: "linear-gradient(135deg, #10b981, #059669)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      ${discountedPrice}
                    </Text>
                    {product.discountPercentage > 0 && (
                      <Text
                        delete
                        style={{
                          fontSize: "11px",
                          color: "#9ca3af",
                          fontWeight: 500,
                        }}
                      >
                        ${product.price}
                      </Text>
                    )}
                  </Flex>
                </Flex>
              </Flex>
            </div>
          ),
          key: product.id,
          productId: product.id,
        };
      });

      // Add "View All Results" option
      if (totalElements > 5) {
        productOptions.push({
          value: `View all results for "${searchTrigger}"`,
          label: (
            <div style={{ marginTop: "6px" }}>
              <Divider style={{ margin: "6px 0", borderColor: "#e5e7eb" }}>
                <Text
                  type="secondary"
                  style={{ fontSize: "10px", color: "#9ca3af" }}
                >
                  {totalElements - 3} more results
                </Text>
              </Divider>
              <div
                style={{
                  padding: "10px 12px",
                  textAlign: "center",
                  background:
                    "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
                  border: "1px dashed #38bdf8",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)";
                  e.currentTarget.style.borderColor = "#2563eb";
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)";
                  e.currentTarget.style.borderColor = "#38bdf8";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <Flex justify="center" align="center" gap={6}>
                  <ShoppingOutlined
                    style={{
                      color: "#2563eb",
                      fontSize: "14px",
                    }}
                  />
                  <Text
                    strong
                    style={{
                      color: "#2563eb",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    View all {totalElements} results
                  </Text>
                </Flex>
              </div>
            </div>
          ),
          key: "view-all",
        });
      }

      setOptions(productOptions);
    } else {
      setOptions([]);
    }
  }, [data, searchTrigger]);

  return (
    <Flex justify="center" align="center">
      <AutoComplete
        style={{ width: "50%" }}
        value={searchValue}
        options={options}
        onSearch={handleSearch}
        onSelect={handleSelect}
        notFoundContent={
          searchTrigger.length ? (
            <Flex justify="center" align="center" style={{ padding: 16 }}>
              {isFetching ? (
                <Space direction="vertical" align="center">
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 20 }} spin />
                    }
                  />
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    Searching products...
                  </Text>
                </Space>
              ) : (
                <Space direction="vertical" align="center">
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    No products found for "{searchValue}"
                  </Text>
                </Space>
              )}
            </Flex>
          ) : (
            <Flex justify="center" align="center" style={{ padding: 16 }}>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                Please press enter or click the search icon to search products.
              </Text>
            </Flex>
          )
        }
      >
        <Search
          placeholder={placeholder}
          enterButton
          onSearch={handleSearchSubmit}
          loading={isFetching}
          allowClear
          onClear={handleClear}
        />
      </AutoComplete>
    </Flex>
  );
};

export default SearchProduct;
