import { useState } from "react";
import {
  Badge,
  Button,
  Dropdown,
  Card,
  Space,
  Typography,
  Avatar,
  Divider,
  InputNumber,
  Empty,
  Row,
  Col,
} from "antd";
import {
  ShoppingCartOutlined,
  DeleteOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";

const { Text, Title } = Typography;

// Mock cart data
const mockCartItems = [
  {
    id: 1,
    title: "iPhone 14 Pro",
    brand: "Apple",
    price: 999.99,
    quantity: 1,
    image: "https://m.media-amazon.com/images/I/61cwywLIfYL._AC_SL1500_.jpg",
    variant: "128GB, Deep Purple",
  },
  {
    id: 2,
    title: "Samsung Galaxy S23",
    brand: "Samsung",
    price: 849.99,
    quantity: 2,
    image: "https://m.media-amazon.com/images/I/61VuytXZcXL._AC_SL1500_.jpg",
    variant: "256GB, Phantom Black",
  },
  {
    id: 3,
    title: "Sony WH-1000XM5",
    brand: "Sony",
    price: 399.99,
    quantity: 1,
    image: "https://m.media-amazon.com/images/I/61NNEiM5BuL._AC_SL1500_.jpg",
    variant: "Black",
  },
];

const HeaderCart = ({ style = {} }) => {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const navigate = useNavigate();

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const cartDropdown = (
    <Card
      style={{
        width: 380,
        maxHeight: 480,
        overflow: "hidden",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
      }}
      bodyStyle={{ padding: 0 }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 20px",
          background: "#fafafa",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Space
          align="center"
          style={{ width: "100%", justifyContent: "space-between" }}
        >
          <Title level={5} style={{ margin: 0, color: "#262626" }}>
            Shopping Cart ({getTotalItems()})
          </Title>
          <Button
            type="text"
            size="small"
            onClick={() => navigate("/cart")}
            style={{ color: "#10b981", fontWeight: "500" }}
          >
            View All
          </Button>
        </Space>
      </div>

      {/* Cart Items */}
      <div style={{ maxHeight: 320, overflow: "auto" }}>
        {cartItems.length === 0 ? (
          <div style={{ padding: "40px 20px", textAlign: "center" }}>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Your cart is empty"
            >
              <Button type="primary" onClick={() => navigate("/")}>
                Start Shopping
              </Button>
            </Empty>
          </div>
        ) : (
          cartItems.map((item, index) => (
            <div key={item.id}>
              <div style={{ padding: "16px 20px" }}>
                <Row gutter={12} align="middle">
                  <Col flex="none">
                    <Avatar
                      src={item.image}
                      size={56}
                      shape="square"
                      style={{ borderRadius: "8px" }}
                    />
                  </Col>
                  <Col flex="auto">
                    <div>
                      <Text
                        strong
                        style={{
                          display: "block",
                          marginBottom: 4,
                          fontSize: "14px",
                          lineHeight: "1.4",
                        }}
                        ellipsis
                      >
                        {item.title}
                      </Text>
                      <Text
                        type="secondary"
                        style={{
                          fontSize: "12px",
                          marginBottom: 8,
                          display: "block",
                        }}
                      >
                        {item.variant}
                      </Text>
                      <Space
                        align="center"
                        style={{
                          width: "100%",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          strong
                          style={{ color: "#10b981", fontSize: "16px" }}
                        >
                          ${(item.price * item.quantity).toFixed(2)}
                        </Text>
                        <Space size={4}>
                          <Button
                            type="text"
                            size="small"
                            icon={<MinusOutlined />}
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: "4px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          />
                          <InputNumber
                            size="small"
                            min={1}
                            value={item.quantity}
                            onChange={(value) => updateQuantity(item.id, value)}
                            style={{
                              width: 50,
                              textAlign: "center",
                            }}
                            controls={false}
                          />
                          <Button
                            type="text"
                            size="small"
                            icon={<PlusOutlined />}
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: "4px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          />
                          <Button
                            type="text"
                            size="small"
                            icon={<DeleteOutlined />}
                            onClick={() => removeItem(item.id)}
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: "4px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#ff4d4f",
                            }}
                          />
                        </Space>
                      </Space>
                    </div>
                  </Col>
                </Row>
              </div>
              {index < cartItems.length - 1 && (
                <Divider style={{ margin: 0 }} />
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {cartItems.length > 0 && (
        <>
          <Divider style={{ margin: 0 }} />
          <div style={{ padding: "16px 20px", background: "#fafafa" }}>
            <Space direction="vertical" style={{ width: "100%" }} size={12}>
              <Row justify="space-between" align="middle">
                <Text style={{ fontSize: "16px", fontWeight: "500" }}>
                  Total:
                </Text>
                <Text
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#10b981",
                  }}
                >
                  ${getTotalPrice().toFixed(2)}
                </Text>
              </Row>
              <Space style={{ width: "100%" }} size={8}>
                <Button style={{ flex: 1 }} onClick={() => navigate("/cart")}>
                  View Cart
                </Button>
                <Button
                  type="primary"
                  style={{
                    flex: 1,
                    backgroundColor: "#10b981",
                    borderColor: "#10b981",
                  }}
                  onClick={() => navigate("/checkout")}
                >
                  Checkout
                </Button>
              </Space>
            </Space>
          </div>
        </>
      )}
    </Card>
  );

  return (
    <Dropdown
      overlay={cartDropdown}
      trigger={["click"]}
      placement="bottomRight"
      arrow
    >
      <Button
        type="text"
        style={{
          color: "#666",
          height: "40px",
          width: "40px",
          borderRadius: "8px",
          position: "relative",
          ...style,
        }}
      >
        <Badge
          count={getTotalItems()}
          size="small"
          style={{
            backgroundColor: "#10b981",
            border: "2px solid white",
            boxShadow: "0 0 0 1px #10b981",
          }}
        >
          <ShoppingCartOutlined style={{ fontSize: "18px" }} />
        </Badge>
      </Button>
    </Dropdown>
  );
};

export default HeaderCart;
