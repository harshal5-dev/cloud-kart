import React from "react";
import {
  Layout,
  Row,
  Col,
  Typography,
  Input,
  Button,
  Divider,
  Space,
} from "antd";
import { Link } from "react-router";
import {
  SendOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

const { Text, Title, Paragraph } = Typography;
const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter className="bg-gray-900 text-white p-0 mt-12">
      <div className="container mx-auto px-4 pt-12 pb-6">
        {/* Newsletter */}
        <div className="bg-gray-800 rounded-lg p-6 mb-12">
          <Row gutter={[24, 24]} align="middle" justify="space-between">
            <Col xs={24} md={14}>
              <Title
                level={4}
                style={{ color: "#fff", marginTop: 0, marginBottom: 8 }}
              >
                Subscribe to our newsletter
              </Title>
              <Paragraph style={{ color: "#bbb", marginBottom: 0 }}>
                Get the latest updates, news and special offers sent directly to
                your inbox.
              </Paragraph>
            </Col>
            <Col xs={24} md={10}>
              <Input.Group compact>
                <Input
                  placeholder="Your email address"
                  className="rounded-l-lg"
                  style={{ width: "calc(100% - 50px)" }}
                />
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  className="rounded-r-lg"
                />
              </Input.Group>
            </Col>
          </Row>
        </div>

        <Row gutter={[48, 32]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="mb-6">
              <img src="/logo.svg" alt="Split Cart" className="h-8 mb-3" />
              <Paragraph style={{ color: "#bbb" }}>
                Your one-stop shop for all your shopping needs. Quality
                products, fast delivery, and excellent customer service.
              </Paragraph>
            </div>
            <Space size="large">
              <a href="#" className="text-gray-400 hover:text-white text-xl">
                <FacebookOutlined />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xl">
                <InstagramOutlined />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xl">
                <TwitterOutlined />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xl">
                <YoutubeOutlined />
              </a>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <Title level={5} style={{ color: "#fff" }}>
              Shop
            </Title>
            <ul className="list-none p-0 m-0">
              <li className="mb-2">
                <Link
                  to="/categories"
                  className="text-gray-400 hover:text-white"
                >
                  All Categories
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products" className="text-gray-400 hover:text-white">
                  Products
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/deals" className="text-gray-400 hover:text-white">
                  Deals & Offers
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/new-arrivals"
                  className="text-gray-400 hover:text-white"
                >
                  New Arrivals
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/best-sellers"
                  className="text-gray-400 hover:text-white"
                >
                  Best Sellers
                </Link>
              </li>
            </ul>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <Title level={5} style={{ color: "#fff" }}>
              Customer Service
            </Title>
            <ul className="list-none p-0 m-0">
              <li className="mb-2">
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/faq" className="text-gray-400 hover:text-white">
                  FAQs
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/shipping" className="text-gray-400 hover:text-white">
                  Shipping & Delivery
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/returns" className="text-gray-400 hover:text-white">
                  Returns & Exchanges
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/payment-methods"
                  className="text-gray-400 hover:text-white"
                >
                  Payment Methods
                </Link>
              </li>
            </ul>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <Title level={5} style={{ color: "#fff" }}>
              About Us
            </Title>
            <ul className="list-none p-0 m-0">
              <li className="mb-2">
                <Link to="/about" className="text-gray-400 hover:text-white">
                  Our Story
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/careers" className="text-gray-400 hover:text-white">
                  Careers
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/privacy-policy"
                  className="text-gray-400 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/terms" className="text-gray-400 hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/blog" className="text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </Col>
        </Row>

        <Divider style={{ borderColor: "#333", margin: "24px 0" }} />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <Text style={{ color: "#bbb" }}>
            &copy; {new Date().getFullYear()} Split Cart. All rights reserved.
          </Text>
          <div className="mt-4 md:mt-0">
            <Space size="middle">
              <img
                src="https://cdn-icons-png.flaticon.com/512/349/349221.png"
                alt="Visa"
                height="20"
                className="h-5"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/512/349/349228.png"
                alt="Mastercard"
                height="20"
                className="h-5"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/512/349/349230.png"
                alt="PayPal"
                height="20"
                className="h-5"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/512/349/349220.png"
                alt="American Express"
                height="20"
                className="h-5"
              />
            </Space>
          </div>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
