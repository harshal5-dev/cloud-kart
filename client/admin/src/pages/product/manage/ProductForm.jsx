import {
  LoadingOutlined,
  ProductFilled,
  DollarOutlined,
  SettingOutlined,
  ShoppingOutlined,
  FileTextOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import {
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Tag,
  Typography,
  Card,
  Switch,
  Button,
  Space,
  Alert,
  Progress,
  Badge,
  Statistic,
} from "antd";
import PropTypes from "prop-types";
import { useState } from "react";
import { LuLassoSelect } from "react-icons/lu";
import { AiFillDollarCircle } from "react-icons/ai";
import { GoNumber } from "react-icons/go";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaCode,
  FaSave,
} from "react-icons/fa";
import { TbBrandBootstrap } from "react-icons/tb";
import { BiDetail } from "react-icons/bi";

import { mapToSelect } from "../../../lib/utils";
import { useGetCategoriesQuery } from "../../category/categoryApi";
import { cssVariables } from "../../../config/themeConfig";

const { Text, Title } = Typography;

const customizeRequiredMark = (label, { required }) => (
  <Text>
    {required ? (
      <Tag color="error">Required</Tag>
    ) : (
      <Tag color="warning">optional</Tag>
    )}
    {label}
  </Text>
);

const ProductForm = ({
  defaultValues = {},
  isLoading = false,
  form,
  onSubmit,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const categoryResponse = useGetCategoriesQuery();
  const { data: categories, isLoading: isCategoryLoading } = categoryResponse;

  const availabilityStatusOptions = [
    { label: "In Stock", value: "IN_STOCK" },
    { label: "Out of Stock", value: "OUT_OF_STOCK" },
    { label: "Low Stock", value: "LOW_STOCK" },
  ];

  const steps = [
    {
      title: "Basic Info",
      icon: <ProductFilled />,
      description: "Product details and category",
    },
    {
      title: "Product Identifiers",
      icon: <LuLassoSelect />,
      description: "Unique identifiers of the product",
    },
    {
      title: "Pricing",
      icon: <DollarOutlined />,
      description: "Price and discount information",
    },
    {
      title: "Physical",
      icon: <SettingOutlined />,
      description: "Dimensions and weight",
    },
    {
      title: "Stock & Orders",
      icon: <ShoppingOutlined />,
      description: "Inventory and ordering",
    },
    {
      title: "Policies",
      icon: <FileTextOutlined />,
      description: "Shipping and warranty",
    },
  ];

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps((prev) => new Set([...prev, currentStep]));
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return renderBasicInformation();
      case 1:
        return renderProductIdentifiers();
      case 2:
        return renderPricing();
      case 3:
        return renderPhysicalProperties();
      case 4:
        return renderStockAndOrderInfo();
      case 5:
        return renderProductPolicies();
      default:
        return null;
    }
  };

  const renderBasicInformation = () => (
    <Card
      title={
        <Space>
          <Badge status="processing" color="#1890ff" />
          <ProductFilled />
          <span>Basic Information</span>
        </Space>
      }
      extra={<Tag color="blue">Step 1 of 6</Tag>}
    >
      <Row gutter={[10, 5]}>
        <Col span={24}>
          <Form.Item
            name="title"
            label="Product Title"
            rules={[{ required: true, message: "Please input product title!" }]}
          >
            <Input
              prefix={<ProductFilled />}
              placeholder="Enter product title"
              suffix={isLoading && <LoadingOutlined />}
              disabled={isLoading}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Product Description" name="description">
            <Input.TextArea
              disabled={isLoading}
              rows={3}
              placeholder="Describe your product in detail"
              showCount
              maxLength={500}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12}>
          <Form.Item
            label="Product Category"
            name="categorySlug"
            rules={[{ required: true, message: "Please select category!" }]}
          >
            <Select
              loading={isLoading || isCategoryLoading}
              placeholder="Select product category"
              options={mapToSelect(categories, "slug", "name")}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12}>
          <Form.Item name="brand" label="Brand">
            <Input
              prefix={<TbBrandBootstrap />}
              placeholder="Enter brand name"
              suffix={isLoading && <LoadingOutlined />}
              disabled={isLoading}
            />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );

  const renderProductIdentifiers = () => (
    <Card
      title={
        <Space>
          <Badge status="processing" color="#7c3aed" />
          <BiDetail />
          <span>Product Identifiers</span>
        </Space>
      }
      extra={<Tag color="blue">Step 2 of 6</Tag>}
    >
      <Row gutter={[10, 5]}>
        <Col span={24}>
          <Form.Item name="thumbnail" label="Thumbnail">
            <Input
              prefix={<ProductFilled />}
              placeholder="Enter thumbnail URL"
              suffix={isLoading && <LoadingOutlined />}
              disabled={isLoading}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12}>
          <Form.Item
            name="sku"
            label="SKU (Stock Keeping Unit)"
            rules={[
              { required: true, message: "Please input product SKU!" },
              {
                pattern: /^[a-zA-Z0-9-]+$/,
                message: "SKU must be alphanumeric or hyphenated!",
              },
            ]}
          >
            <Input
              prefix={<FaCode />}
              placeholder="Enter unique SKU"
              suffix={isLoading && <LoadingOutlined />}
              disabled={isLoading}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12}>
          <Form.Item
            name="featured"
            label="Featured Product"
            valuePropName="checked"
          >
            <Space direction="vertical">
              <Switch
                checkedChildren="Featured"
                unCheckedChildren="Regular"
                disabled={isLoading}
              />
              <Text type="secondary" style={{ fontSize: "12px" }}>
                Featured products appear prominently
              </Text>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );

  const renderPricing = () => (
    <Card
      title={
        <Space>
          <Badge status="processing" color="#52c41a" />
          <DollarOutlined />
          <span>Pricing Information</span>
        </Space>
      }
      extra={<Tag color="green">Step 3 of 6</Tag>}
    >
      <Row gutter={[10, 5]}>
        <Col xs={24} sm={24} md={12}>
          <Form.Item
            name="price"
            label="Product Price"
            rules={[{ required: true, message: "Please input product price!" }]}
          >
            <InputNumber
              prefix={<AiFillDollarCircle />}
              placeholder="0.00"
              min={0}
              step={0.01}
              precision={2}
              disabled={isLoading}
              style={{ width: "100%" }}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Form.Item name="discountPercentage" label="Discount Percentage">
            <InputNumber
              placeholder="0.00"
              min={0}
              max={100}
              step={0.01}
              precision={2}
              addonAfter="%"
              disabled={isLoading}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Alert
            style={{ padding: "10px 14px" }}
            message="Pricing Tip"
            description="Consider market research and competitor pricing when setting your product price."
            type="info"
            showIcon
          />
        </Col>
      </Row>
    </Card>
  );

  const renderPhysicalProperties = () => (
    <Card
      title={
        <Space>
          <Badge status="processing" color="#722ed1" />
          <SettingOutlined />
          <span>Physical Properties</span>
        </Space>
      }
      extra={<Tag color="purple">Step 4 of 6</Tag>}
    >
      <Row gutter={[10, 5]}>
        <Col xs={24} sm={12}>
          <Form.Item name="weight" label="Weight">
            <InputNumber
              placeholder="0.00"
              min={0}
              step={0.01}
              precision={2}
              disabled={isLoading}
              addonAfter="kg"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item name="width" label="Width">
            <InputNumber
              placeholder="0.00"
              min={0}
              step={0.01}
              precision={2}
              disabled={isLoading}
              addonAfter="cm"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item name="height" label="Height">
            <InputNumber
              placeholder="0.00"
              min={0}
              step={0.01}
              precision={2}
              disabled={isLoading}
              addonAfter="cm"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item name="depth" label="Depth">
            <InputNumber
              placeholder="0.00"
              min={0}
              step={0.01}
              precision={2}
              disabled={isLoading}
              addonAfter="cm"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );

  const renderStockAndOrderInfo = () => (
    <Card
      title={
        <Space>
          <Badge status="processing" color="#fa8c16" />
          <ShoppingOutlined />
          <span>Stock & Order Information</span>
        </Space>
      }
      extra={<Tag color="orange">Step 5 of 6</Tag>}
    >
      <Row gutter={[10, 5]}>
        <Col xs={24} sm={24} md={12}>
          <Form.Item
            name="stock"
            label="Stock Quantity"
            rules={[{ required: true, message: "Please input product stock!" }]}
          >
            <InputNumber
              prefix={<GoNumber />}
              placeholder="Enter stock quantity"
              min={0}
              disabled={isLoading}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Form.Item
            name="minimumOrderQuantity"
            label="Minimum Order Quantity"
            rules={[
              {
                required: true,
                message: "Please input minimum order quantity!",
              },
            ]}
          >
            <InputNumber
              placeholder="Minimum order qty"
              min={1}
              disabled={isLoading}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="availabilityStatus"
            label="Availability Status"
            rules={[
              { required: true, message: "Please select availability status!" },
            ]}
          >
            <Select
              placeholder="Select availability status"
              options={availabilityStatusOptions}
              disabled={isLoading}
            />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );

  const renderProductPolicies = () => (
    <Card
      title={
        <Space>
          <Badge status="processing" color="#eb2f96" />
          <FileTextOutlined />
          <span>Product Policies</span>
        </Space>
      }
      extra={<Tag color="magenta">Step 6 of 6</Tag>}
    >
      <Row gutter={[10, 5]}>
        <Col span={24}>
          <Form.Item name="shippingDetails" label="Shipping Details">
            <Input.TextArea
              disabled={isLoading}
              placeholder="Describe shipping options, delivery time, and any special shipping requirements..."
              showCount
              maxLength={500}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="warrantyDetails" label="Warranty Details">
            <Input.TextArea
              disabled={isLoading}
              placeholder="Specify warranty period, coverage details, and claim process..."
              showCount
              maxLength={500}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="returnPolicy" label="Return Policy">
            <Input.TextArea
              disabled={isLoading}
              placeholder="Define return conditions, timeframe, and process for customers..."
              showCount
              maxLength={500}
            />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );

  return (
    <Space direction="vertical" className="mt-5" size="large">
      {/* Modern Progress Header */}
      <Card className="shadow-sm" size="small">
        <Row justify="space-between" align="middle">
          <Col>
            <Title
              level={4}
              style={{ margin: 0, color: cssVariables.colorTitle }}
            >
              Create New Product
            </Title>
            <Text type="secondary">
              Step {currentStep + 1} of {steps.length} -{" "}
              {steps[currentStep].description}
            </Text>
          </Col>
          <Col>
            <Space align="center">
              <Statistic
                title="Progress"
                value={progressPercentage}
                precision={0}
                suffix="%"
                valueStyle={{ color: "#3f8600", fontSize: "18px" }}
              />
              <Progress
                type="circle"
                percent={progressPercentage}
                size={65}
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
                format={() => (
                  <CheckCircleFilled
                    style={{ color: "#52c41a", fontSize: "16px" }}
                  />
                )}
              />
            </Space>
          </Col>
        </Row>

        <Progress
          percent={progressPercentage}
          showInfo={false}
          strokeColor={{
            from: "#108ee9",
            to: "#87d068",
          }}
          size="small"
          style={{ marginTop: 16 }}
        />
      </Card>

      {/* Form Content */}
      <Form
        form={form}
        layout="vertical"
        requiredMark={customizeRequiredMark}
        initialValues={defaultValues}
        scrollToFirstError
      >
        {renderStepContent(currentStep)}

        {/* Navigation Buttons */}
        <Card style={{ marginTop: 16 }} size="small">
          <Row justify="space-between" align="middle">
            <Col>
              <Button
                disabled={currentStep === 0 || isLoading}
                onClick={handlePrevious}
                icon={<FaArrowAltCircleLeft />}
              >
                Prev
              </Button>
            </Col>

            <Col>
              <Button
                type="primary"
                disabled={currentStep === steps.length - 1 || isLoading}
                onClick={handleNext}
                icon={<FaArrowAltCircleRight />}
                iconPosition="end"
              >
                Next
              </Button>
            </Col>
          </Row>
        </Card>

        {/* Completion Message */}
        {currentStep === steps.length - 1 && (
          <Card style={{ marginTop: 16 }} size="small">
            <Alert
              message="🎉 Form Complete!"
              style={{ padding: "15px 18px" }}
              description={
                <Space direction="vertical" size="small">
                  <Text>
                    All sections completed! Review your information and submit
                    when ready.
                  </Text>
                  <Text type="secondary">
                    {completedSteps.size + 1} of {steps.length} sections
                    completed
                  </Text>
                </Space>
              }
              type="success"
              showIcon
              action={
                <Button
                  type="primary"
                  size="large"
                  icon={<FaSave />}
                  onClick={onSubmit}
                  loading={isLoading}
                >
                  Save
                </Button>
              }
            />
          </Card>
        )}
      </Form>
    </Space>
  );
};

ProductForm.propTypes = {
  defaultValues: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    categoryId: PropTypes.string,
    brand: PropTypes.string,
    sku: PropTypes.string,
    featured: PropTypes.bool,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
    discountPercentage: PropTypes.number,
    weight: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    depth: PropTypes.number,
    stock: PropTypes.number,
    minimumOrderQuantity: PropTypes.number,
    availabilityStatus: PropTypes.oneOf([
      "IN_STOCK",
      "OUT_OF_STOCK",
      "LOW_STOCK",
    ]),
    shippingDetails: PropTypes.string,
    warrantyDetails: PropTypes.string,
    returnPolicy: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
  form: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default ProductForm;
