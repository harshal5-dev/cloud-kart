import { useState } from "react";
import {
  Typography,
  Card,
  Row,
  Col,
  Space,
  Button,
  InputNumber,
  Image,
  Divider,
  Empty,
  Tag,
  Breadcrumb,
  Steps,
  Statistic,
  Alert,
  Tooltip,
  Modal,
  message,
} from "antd";
import {
  DeleteOutlined,
  ShoppingOutlined,
  HeartOutlined,
  GiftOutlined,
  SafetyOutlined,
  TruckOutlined,
  ArrowRightOutlined,
  ExclamationCircleOutlined,
  ShoppingCartOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router";

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;
const { confirm } = Modal;

// Mock cart data - this would come from your state management
const initialCartItems = [
  {
    id: 1,
    title: "iPhone 14 Pro",
    brand: "Apple",
    price: 999.99,
    originalPrice: 1099.99,
    quantity: 1,
    image: "https://m.media-amazon.com/images/I/61cwywLIfYL._AC_SL1500_.jpg",
    variant: "128GB, Deep Purple",
    sku: "APL-IP14P-128-DP",
    inStock: true,
    stockCount: 67,
    discount: 9,
  },
  {
    id: 2,
    title: "Samsung Galaxy S23",
    brand: "Samsung",
    price: 849.99,
    originalPrice: 949.99,
    quantity: 2,
    image: "https://m.media-amazon.com/images/I/61VuytXZcXL._AC_SL1500_.jpg",
    variant: "256GB, Phantom Black",
    sku: "SAM-GS23-256-PB",
    inStock: true,
    stockCount: 23,
    discount: 11,
  },
  {
    id: 3,
    title: "Sony WH-1000XM5",
    brand: "Sony",
    price: 399.99,
    originalPrice: 449.99,
    quantity: 1,
    image: "https://m.media-amazon.com/images/I/61NNEiM5BuL._AC_SL1500_.jpg",
    variant: "Midnight Black",
    sku: "SNY-WH1000XM5-BK",
    inStock: true,
    stockCount: 45,
    discount: 11,
  },
  {
    id: 4,
    title: "MacBook Pro 14-inch",
    brand: "Apple",
    price: 1999.99,
    originalPrice: 2199.99,
    quantity: 1,
    image: "https://m.media-amazon.com/images/I/61GTWA1Z8FL._AC_SL1500_.jpg",
    variant: "M2, 512GB, Space Gray",
    sku: "APL-MBP14-M2-512-SG",
    inStock: false,
    stockCount: 0,
    discount: 9,
  },
];

const ViewCart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const navigate = useNavigate();

  // Cart calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const originalTotal = cartItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );
  const savings = originalTotal - subtotal;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const promoDiscount = appliedPromo ? subtotal * 0.1 : 0; // 10% promo discount
  const total = subtotal + shipping + tax - promoDiscount;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      showDeleteConfirm(id);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(newQuantity, item.stockCount || 99) }
          : item
      )
    );
    message.success("Quantity updated");
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    message.success("Item removed from cart");
  };

  const showDeleteConfirm = (id) => {
    const item = cartItems.find((item) => item.id === id);
    confirm({
      title: "Remove Item",
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to remove "${item?.title}" from your cart?`,
      okText: "Remove",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        removeItem(id);
      },
    });
  };

  const moveToWishlist = (id) => {
    const item = cartItems.find((item) => item.id === id);
    removeItem(id);
    message.success(`"${item?.title}" moved to wishlist`);
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      setAppliedPromo({ code: "WELCOME10", discount: 0.1 });
      message.success("Promo code applied! 10% discount");
    } else {
      message.error("Invalid promo code");
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoCode("");
    message.info("Promo code removed");
  };

  const handleCheckout = () => {
    const outOfStockItems = cartItems.filter((item) => !item.inStock);
    if (outOfStockItems.length > 0) {
      message.error("Please remove out of stock items before checkout");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/checkout");
    }, 1000);
  };

  const clearCart = () => {
    confirm({
      title: "Clear Cart",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to remove all items from your cart?",
      okText: "Clear All",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        setCartItems([]);
        message.success("Cart cleared");
      },
    });
  };

  if (cartItems.length === 0) {
    return (
      <div
        style={{ background: "#f5f6fa", minHeight: "100vh", padding: "24px" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Breadcrumb
            items={[
              { title: <Link to="/">Home</Link> },
              { title: "Shopping Cart" },
            ]}
            style={{ marginBottom: 24 }}
          />

          <Card style={{ textAlign: "center", padding: "60px 20px" }}>
            <Empty
              image={
                <ShoppingCartOutlined
                  style={{ fontSize: 80, color: "#d9d9d9", marginBottom: 16 }}
                />
              }
              description={
                <div>
                  <Title level={3} style={{ color: "#666", marginBottom: 8 }}>
                    Your cart is empty
                  </Title>
                  <Paragraph style={{ color: "#999", fontSize: 16 }}>
                    Looks like you haven't added anything to your cart yet.
                  </Paragraph>
                </div>
              }
            >
              <Space size="middle">
                <Button
                  type="primary"
                  size="large"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </Button>
                <Button size="large" onClick={() => navigate("/wishlist")}>
                  View Wishlist
                </Button>
              </Space>
            </Empty>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#f5f6fa", minHeight: "100vh", padding: "24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Breadcrumb
          items={[
            { title: <Link to="/">Home</Link> },
            { title: "Shopping Cart" },
          ]}
          style={{ marginBottom: 24 }}
        />

        {/* Progress Steps */}
        <Card style={{ marginBottom: 24 }}>
          <Steps current={0} size="small">
            <Step title="Shopping Cart" icon={<ShoppingCartOutlined />} />
            <Step title="Checkout" icon={<CreditCardOutlined />} />
            <Step title="Payment" icon={<SafetyOutlined />} />
            <Step title="Delivery" icon={<TruckOutlined />} />
          </Steps>
        </Card>

        <Row gutter={[24, 24]}>
          {/* Cart Items */}
          <Col xs={24} lg={16}>
            <Card
              title={
                <Space
                  style={{ width: "100%", justifyContent: "space-between" }}
                >
                  <span>Shopping Cart ({totalItems} items)</span>
                  <Button
                    type="text"
                    size="small"
                    onClick={clearCart}
                    style={{ color: "#ff4d4f" }}
                  >
                    Clear Cart
                  </Button>
                </Space>
              }
              style={{ marginBottom: 24 }}
            >
              <Space
                direction="vertical"
                style={{ width: "100%" }}
                size="large"
              >
                {cartItems.map((item, index) => (
                  <div key={item.id}>
                    <Row gutter={[16, 16]} align="middle">
                      <Col xs={24} sm={6} md={4}>
                        <Image
                          src={item.image}
                          alt={item.title}
                          style={{
                            width: "100%",
                            height: 120,
                            objectFit: "contain",
                            borderRadius: 8,
                          }}
                          preview={{
                            mask: <div>Preview</div>,
                          }}
                        />
                      </Col>

                      <Col xs={24} sm={18} md={20}>
                        <Row gutter={[16, 8]}>
                          <Col xs={24} md={12}>
                            <Space
                              direction="vertical"
                              size="small"
                              style={{ width: "100%" }}
                            >
                              <div>
                                <Title
                                  level={5}
                                  style={{ margin: 0, marginBottom: 4 }}
                                >
                                  {item.title}
                                </Title>
                                <Text type="secondary" style={{ fontSize: 12 }}>
                                  Brand: {item.brand} | SKU: {item.sku}
                                </Text>
                              </div>

                              <Tag
                                color="blue"
                                style={{ width: "fit-content" }}
                              >
                                {item.variant}
                              </Tag>

                              {!item.inStock && (
                                <Alert
                                  message="Out of Stock"
                                  type="error"
                                  size="small"
                                  showIcon
                                />
                              )}

                              {item.inStock && item.stockCount < 10 && (
                                <Alert
                                  message={`Only ${item.stockCount} left in stock`}
                                  type="warning"
                                  size="small"
                                  showIcon
                                />
                              )}
                            </Space>
                          </Col>

                          <Col xs={24} md={6}>
                            <Space
                              direction="vertical"
                              align="center"
                              style={{ width: "100%" }}
                            >
                              <div style={{ textAlign: "center" }}>
                                <Space direction="vertical" size={0}>
                                  <Text
                                    strong
                                    style={{ fontSize: 18, color: "#10b981" }}
                                  >
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </Text>
                                  {item.discount > 0 && (
                                    <Text
                                      delete
                                      type="secondary"
                                      style={{ fontSize: 14 }}
                                    >
                                      $
                                      {(
                                        item.originalPrice * item.quantity
                                      ).toFixed(2)}
                                    </Text>
                                  )}
                                  {item.discount > 0 && (
                                    <Tag color="success" size="small">
                                      {item.discount}% OFF
                                    </Tag>
                                  )}
                                </Space>
                              </div>

                              <InputNumber
                                min={1}
                                max={item.stockCount || 99}
                                value={item.quantity}
                                onChange={(value) =>
                                  updateQuantity(item.id, value)
                                }
                                disabled={!item.inStock}
                                style={{ width: 80 }}
                              />

                              <Space size="small">
                                <Tooltip title="Move to Wishlist">
                                  <Button
                                    type="text"
                                    icon={<HeartOutlined />}
                                    size="small"
                                    onClick={() => moveToWishlist(item.id)}
                                  />
                                </Tooltip>
                                <Tooltip title="Remove Item">
                                  <Button
                                    type="text"
                                    icon={<DeleteOutlined />}
                                    size="small"
                                    danger
                                    onClick={() => showDeleteConfirm(item.id)}
                                  />
                                </Tooltip>
                              </Space>
                            </Space>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    {index < cartItems.length - 1 && <Divider />}
                  </div>
                ))}
              </Space>

              <Divider />

              <Space style={{ width: "100%", justifyContent: "space-between" }}>
                <Button
                  icon={<ShoppingOutlined />}
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </Button>
                <Space>
                  <Text strong>Total Items: {totalItems}</Text>
                  <Text strong style={{ color: "#10b981", fontSize: 16 }}>
                    Subtotal: ${subtotal.toFixed(2)}
                  </Text>
                </Space>
              </Space>
            </Card>

            {/* Promo Code */}
            <Card title="Promo Code" size="small">
              {appliedPromo ? (
                <Space
                  style={{ width: "100%", justifyContent: "space-between" }}
                >
                  <Space>
                    <GiftOutlined style={{ color: "#10b981" }} />
                    <Text strong>"{appliedPromo.code}" applied</Text>
                    <Tag color="success">-${promoDiscount.toFixed(2)}</Tag>
                  </Space>
                  <Button size="small" onClick={removePromoCode}>
                    Remove
                  </Button>
                </Space>
              ) : (
                <Space.Compact style={{ width: "100%" }}>
                  <input
                    placeholder="Enter promo code (try: WELCOME10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "6px 0 0 6px",
                      outline: "none",
                    }}
                  />
                  <Button onClick={applyPromoCode}>Apply</Button>
                </Space.Compact>
              )}
            </Card>
          </Col>

          {/* Order Summary */}
          <Col xs={24} lg={8}>
            <Card title="Order Summary" style={{ position: "sticky", top: 24 }}>
              <Space
                direction="vertical"
                style={{ width: "100%" }}
                size="middle"
              >
                <div>
                  <Space
                    style={{ width: "100%", justifyContent: "space-between" }}
                  >
                    <Text>Subtotal ({totalItems} items):</Text>
                    <Text>${subtotal.toFixed(2)}</Text>
                  </Space>

                  {savings > 0 && (
                    <Space
                      style={{ width: "100%", justifyContent: "space-between" }}
                    >
                      <Text style={{ color: "#10b981" }}>You save:</Text>
                      <Text style={{ color: "#10b981" }}>
                        -${savings.toFixed(2)}
                      </Text>
                    </Space>
                  )}

                  <Space
                    style={{ width: "100%", justifyContent: "space-between" }}
                  >
                    <Text>Shipping:</Text>
                    <Text>
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </Text>
                  </Space>

                  <Space
                    style={{ width: "100%", justifyContent: "space-between" }}
                  >
                    <Text>Tax:</Text>
                    <Text>${tax.toFixed(2)}</Text>
                  </Space>

                  {appliedPromo && (
                    <Space
                      style={{ width: "100%", justifyContent: "space-between" }}
                    >
                      <Text style={{ color: "#10b981" }}>
                        Promo ({appliedPromo.code}):
                      </Text>
                      <Text style={{ color: "#10b981" }}>
                        -${promoDiscount.toFixed(2)}
                      </Text>
                    </Space>
                  )}
                </div>

                <Divider style={{ margin: "12px 0" }} />

                <Space
                  style={{ width: "100%", justifyContent: "space-between" }}
                >
                  <Title level={4} style={{ margin: 0 }}>
                    Total:
                  </Title>
                  <Title level={4} style={{ margin: 0, color: "#10b981" }}>
                    ${total.toFixed(2)}
                  </Title>
                </Space>

                <Button
                  type="primary"
                  size="large"
                  block
                  loading={loading}
                  onClick={handleCheckout}
                  style={{
                    backgroundColor: "#10b981",
                    borderColor: "#10b981",
                    height: 48,
                  }}
                  icon={<ArrowRightOutlined />}
                >
                  Proceed to Checkout
                </Button>

                <div style={{ textAlign: "center", marginTop: 16 }}>
                  <Space direction="vertical" size="small">
                    <Space>
                      <SafetyOutlined style={{ color: "#10b981" }} />
                      <Text style={{ fontSize: 12 }}>Secure Checkout</Text>
                    </Space>
                    <Space>
                      <TruckOutlined style={{ color: "#10b981" }} />
                      <Text style={{ fontSize: 12 }}>
                        {shipping === 0
                          ? "Free shipping included"
                          : "Free shipping on orders over $50"}
                      </Text>
                    </Space>
                  </Space>
                </div>
              </Space>
            </Card>

            {/* Quick Stats */}
            <Card style={{ marginTop: 16 }}>
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic
                    title="Items"
                    value={totalItems}
                    prefix={<ShoppingCartOutlined />}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="Savings"
                    value={savings + promoDiscount}
                    prefix="$"
                    precision={2}
                    valueStyle={{ color: "#10b981" }}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ViewCart;
