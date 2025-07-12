import { useState } from "react";
import {
  Badge,
  Button,
  Drawer,
  Empty,
  List,
  Avatar,
  Typography,
  Divider,
} from "antd";
import { ShoppingOutlined, DeleteOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const mockCartItems = [
  {
    id: 1,
    name: "iPhone 14 Pro",
    price: 999.99,
    quantity: 1,
    image: "https://m.media-amazon.com/images/I/61cwywLIfYL._AC_SL1500_.jpg",
  },
  // For testing only, remove in production
  {
    id: 2,
    name: "Samsung Galaxy S23",
    price: 849.99,
    quantity: 1,
    image: "https://m.media-amazon.com/images/I/61VuytXZcXL._AC_SL1500_.jpg",
  },
];

const ShoppingCart = () => {
  const [open, setOpen] = useState(false);
  // In a real app, this would come from your cart state/API
  const [cartItems, setCartItems] = useState(mockCartItems);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Badge count={totalItems} size="small" offset={[-5, 3]}>
        <Button
          type="text"
          icon={<ShoppingOutlined className="text-xl" />}
          onClick={showDrawer}
          className="flex items-center justify-center"
        />
      </Badge>

      <Drawer
        title="Your Cart"
        placement="right"
        onClose={onClose}
        open={open}
        width={380}
        footer={
          cartItems.length > 0 ? (
            <div>
              <div className="flex justify-between mb-4">
                <Text>
                  Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
                </Text>
                <Text strong>${subtotal.toFixed(2)}</Text>
              </div>
              <Button type="primary" block size="large">
                Proceed to Checkout
              </Button>
              <div className="text-center mt-3">
                <Button type="link" onClick={onClose}>
                  Continue Shopping
                </Button>
              </div>
            </div>
          ) : null
        }
      >
        {cartItems.length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={cartItems}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveItem(item.id)}
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar shape="square" size={64} src={item.image} />}
                  title={<Text strong>{item.name}</Text>}
                  description={
                    <div className="flex flex-col">
                      <Text>${item.price.toFixed(2)}</Text>
                      <div className="flex items-center mt-1">
                        <Button size="small">-</Button>
                        <Text className="mx-2">{item.quantity}</Text>
                        <Button size="small">+</Button>
                      </div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <Empty
            description="Your cart is empty"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </Drawer>
    </>
  );
};

export default ShoppingCart;
