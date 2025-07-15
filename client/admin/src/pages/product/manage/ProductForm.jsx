import {
  LoadingOutlined,
  ProductFilled,
  DollarOutlined,
  SettingOutlined,
  ShoppingOutlined,
  FileTextOutlined,
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
  Steps,
  Flex,
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
      <Tag
        style={{
          backgroundColor: cssVariables.colorSecondary,
          color: cssVariables.colorWhite,
          border: "none",
        }}
      >
        optional
      </Tag>
    )}
    {label}
  </Text>
);

const ProductForm = ({
  defaultValues = {},
  isLoading = false,
  form,
  onSubmit,
  title,
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

  // Define required fields for each step
  const stepRequiredFields = {
    0: ["title", "categorySlug"], // Basic Info
    1: ["sku"], // Product Identifiers
    2: ["price"], // Pricing
    3: [], // Physical Properties (optional)
    4: ["stock", "minimumOrderQuantity", "availabilityStatus"], // Stock & Orders
    5: [], // Policies (optional)
  };

  const steps = [
    {
      title: "Basic Info",
      icon: <ProductFilled />,
      description: "Product details and category",
      color: cssVariables.colorPrimary,
      status: completedSteps.has(0)
        ? "finish"
        : currentStep === 0
        ? "process"
        : "wait",
    },
    {
      title: "Product Identifiers",
      icon: <LuLassoSelect />,
      description: "Unique identifiers of the product",
      color: cssVariables.colorTitle,
      status: completedSteps.has(1)
        ? "finish"
        : currentStep === 1
        ? "process"
        : "wait",
    },
    {
      title: "Pricing",
      icon: <DollarOutlined />,
      description: "Price and discount information",
      color: cssVariables.colorSecondary,
      status: completedSteps.has(2)
        ? "finish"
        : currentStep === 2
        ? "process"
        : "wait",
    },
    {
      title: "Physical",
      icon: <SettingOutlined />,
      description: "Dimensions and weight",
      color: cssVariables.colorPurple,
      status: completedSteps.has(3)
        ? "finish"
        : currentStep === 3
        ? "process"
        : "wait",
    },
    {
      title: "Stock & Orders",
      icon: <ShoppingOutlined />,
      description: "Inventory and ordering",
      color: cssVariables.colorOrange,
      status: completedSteps.has(4)
        ? "finish"
        : currentStep === 4
        ? "process"
        : "wait",
    },
    {
      title: "Policies",
      icon: <FileTextOutlined />,
      description: "Shipping and warranty",
      color: cssVariables.colorMagenta,
      status: completedSteps.has(5)
        ? "finish"
        : currentStep === 5
        ? "process"
        : "wait",
    },
  ];

  // Define badge colors for step cards (separate from steps configuration)
  const stepBadgeColors = [
    "blue",
    "purple",
    "green",
    "purple",
    "orange",
    "magenta",
  ];

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  // Validate current step before proceeding
  const validateCurrentStep = async () => {
    const fieldsToValidate = stepRequiredFields[currentStep];
    if (fieldsToValidate.length === 0) return true;

    try {
      await form.validateFields(fieldsToValidate);
      return true;
    } catch {
      return false;
    }
  };

  // Handle next step with validation
  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < steps.length - 1) {
      setCompletedSteps((prev) => new Set([...prev, currentStep]));
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle step click (allow navigation to completed steps)
  const handleStepClick = (step) => {
    if (step <= currentStep || completedSteps.has(step - 1)) {
      setCurrentStep(step);
    }
  };

  // Handle final form submission
  const handleFormSubmit = async () => {
    try {
      await form.validateFields();

      onSubmit();
    } catch (error) {
      // Navigate to the step with the first error
      const errorFields = error.errorFields || [];
      if (errorFields.length > 0) {
        const firstErrorField = errorFields[0].name[0];
        // Find which step contains this field
        for (const [stepIndex, fields] of Object.entries(stepRequiredFields)) {
          if (fields.includes(firstErrorField)) {
            setCurrentStep(parseInt(stepIndex));
            break;
          }
        }
      }
    }
  };

  const renderBasicInformation = () => (
    <Card
      title={
        <Space>
          <Badge status="processing" color={steps[0].color} />
          <ProductFilled style={{ color: steps[0].color }} />
          <span>Basic Information</span>
        </Space>
      }
      extra={<Tag color={stepBadgeColors[0]}>Step 1 of 6</Tag>}
      style={{ borderRadius: 8 }}
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
              placeholder="Describe your product in detail..."
              showCount
              maxLength={500}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
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

        <Col xs={24} md={12}>
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
          <Badge status="processing" color={steps[1].color} />
          <BiDetail style={{ color: steps[1].color }} />
          <span>Product Identifiers</span>
        </Space>
      }
      extra={<Tag color={stepBadgeColors[1]}>Step 2 of 6</Tag>}
      style={{ borderRadius: 8 }}
    >
      <Row gutter={[10, 5]}>
        <Col span={24}>
          <Form.Item name="thumbnail" label="Thumbnail URL">
            <Input
              prefix={<ProductFilled />}
              placeholder="Enter thumbnail URL"
              suffix={isLoading && <LoadingOutlined />}
              disabled={isLoading}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
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

        <Col xs={24} md={12}>
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
          <Badge status="processing" color={steps[2].color} />
          <DollarOutlined style={{ color: steps[2].color }} />
          <span>Pricing Information</span>
        </Space>
      }
      extra={<Tag color={stepBadgeColors[2]}>Step 3 of 6</Tag>}
      style={{ borderRadius: 8 }}
    >
      <Row gutter={[10, 5]}>
        <Col xs={24} md={12}>
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
        <Col xs={24} md={12}>
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
            style={{ padding: "10px 16px" }}
            message="💡 Pricing Tip"
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
          <Badge status="processing" color={steps[3].color} />
          <SettingOutlined style={{ color: steps[3].color }} />
          <span>Physical Properties</span>
        </Space>
      }
      extra={<Tag color={stepBadgeColors[3]}>Step 4 of 6</Tag>}
      style={{ borderRadius: 8 }}
    >
      <Row gutter={[10, 5]}>
        <Col xs={12} sm={6}>
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
        <Col xs={12} sm={6}>
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
        <Col xs={12} sm={6}>
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
        <Col xs={12} sm={6}>
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
          <Badge status="processing" color={steps[4].color} />
          <ShoppingOutlined style={{ color: steps[4].color }} />
          <span>Stock & Order Information</span>
        </Space>
      }
      extra={<Tag color={stepBadgeColors[4]}>Step 5 of 6</Tag>}
      style={{ borderRadius: 8 }}
    >
      <Row gutter={[10, 5]}>
        <Col xs={24} md={12}>
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
        <Col xs={24} md={12}>
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
          <Badge status="processing" color={steps[5].color} />
          <FileTextOutlined style={{ color: steps[5].color }} />
          <span>Product Policies</span>
        </Space>
      }
      extra={<Tag color={stepBadgeColors[5]}>Step 6 of 6</Tag>}
      style={{ borderRadius: 8 }}
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
    <div className="mt-5">
      {/* Enhanced Progress Header */}
      <Card
        size="small"
        style={{
          marginBottom: 16,
          background: `linear-gradient(135deg, ${cssVariables.colorPrimary} 0%, ${cssVariables.colorTitle} 100%)`,
          border: "none",
          boxShadow: `0 8px 24px ${cssVariables.colorPrimary}15`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${cssVariables.glassOverlay} 0%, ${cssVariables.glassOverlayLight} 100%)`,
            margin: "-16px -24px",
            padding: "16px 20px",
            backdropFilter: "blur(12px)",
          }}
        >
          <Flex justify="space-between" align="center" gap={16}>
            <Flex align="center" gap={12} flex={1}>
              {steps[currentStep].icon && (
                <div
                  style={{
                    background: cssVariables.whiteTransparent25,
                    borderRadius: 10,
                    padding: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 17,
                    color: cssVariables.colorWhite,
                    minWidth: 40,
                    height: 40,
                    boxShadow: cssVariables.boxShadowLight,
                    border: `1px solid ${cssVariables.whiteTransparent30}`,
                  }}
                >
                  {steps[currentStep].icon}
                </div>
              )}
              <Flex vertical gap={4} flex={1}>
                <Flex align="center" gap={10}>
                  <Title
                    level={4}
                    style={{
                      margin: 0,
                      color: cssVariables.colorWhite,
                      fontWeight: 600,
                      fontSize: "20px",
                      lineHeight: "24px",
                      letterSpacing: "-0.3px",
                      textShadow: cssVariables.textShadow,
                    }}
                  >
                    {title}
                  </Title>
                  <Tag
                    style={{
                      background: cssVariables.whiteTransparent25,
                      color: cssVariables.colorWhite,
                      fontSize: "11px",
                      fontWeight: 500,
                      borderRadius: 8,
                      padding: "3px 10px",
                      border: `1px solid ${cssVariables.whiteTransparent40}`,
                      boxShadow: cssVariables.boxShadowSoft,
                      textShadow: cssVariables.textShadow,
                    }}
                  >
                    Step {currentStep + 1} of {steps.length}
                  </Tag>
                </Flex>
                <Text
                  style={{
                    color: cssVariables.whiteTransparent90,
                    fontSize: "13px",
                    fontWeight: 400,
                    lineHeight: "18px",
                    letterSpacing: "0.1px",
                    textShadow: cssVariables.textShadow,
                  }}
                >
                  {steps[currentStep].description}
                </Text>
              </Flex>
            </Flex>

            <Flex justify="center" align="center">
              <Progress
                type="circle"
                percent={progressPercentage}
                size={56}
                strokeColor={{
                  "0%": cssVariables.colorSecondary,
                  "100%": cssVariables.colorProgressEnd,
                }}
                trailColor={cssVariables.whiteTransparent25}
                strokeWidth={7}
                format={() => (
                  <Text
                    style={{
                      color: cssVariables.colorWhite,
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: 1,
                    }}
                  >
                    {Math.round(progressPercentage)}%
                  </Text>
                )}
              />
            </Flex>
          </Flex>
        </div>
      </Card>

      {/* Enhanced Steps Navigation */}
      <Card
        size="small"
        style={{
          marginBottom: 16,
        }}
      >
        <Steps
          current={currentStep}
          onChange={handleStepClick}
          items={steps}
          size="small"
          responsive
        />
      </Card>

      {/* Form Content */}
      <Form
        form={form}
        layout="vertical"
        requiredMark={customizeRequiredMark}
        initialValues={defaultValues}
        scrollToFirstError
        preserve={true}
      >
        {/* All form sections - control visibility */}
        <div style={{ display: currentStep === 0 ? "block" : "none" }}>
          {renderBasicInformation()}
        </div>

        <div style={{ display: currentStep === 1 ? "block" : "none" }}>
          {renderProductIdentifiers()}
        </div>

        <div style={{ display: currentStep === 2 ? "block" : "none" }}>
          {renderPricing()}
        </div>

        <div style={{ display: currentStep === 3 ? "block" : "none" }}>
          {renderPhysicalProperties()}
        </div>

        <div style={{ display: currentStep === 4 ? "block" : "none" }}>
          {renderStockAndOrderInfo()}
        </div>

        <div style={{ display: currentStep === 5 ? "block" : "none" }}>
          {renderProductPolicies()}
        </div>

        {/* Navigation Footer */}
        <Card
          size="small"
          style={{
            marginTop: 16,
          }}
        >
          <Row justify="space-between" align="middle">
            <Col>
              <Button
                disabled={currentStep === 0 || isLoading}
                onClick={handlePrevious}
                icon={<FaArrowAltCircleLeft />}
              >
                Previous
              </Button>
            </Col>

            <Col>
              <Space>
                {currentStep === steps.length - 1 ? (
                  <Button
                    type="primary"
                    onClick={handleFormSubmit}
                    icon={<FaSave />}
                    loading={isLoading}
                  >
                    Save Product
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    onClick={handleNext}
                    icon={<FaArrowAltCircleRight />}
                    iconPosition="end"
                    loading={isLoading}
                  >
                    Next Step
                  </Button>
                )}
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Success message on final step */}
        {currentStep === steps.length - 1 && (
          <Alert
            message="🎉 Ready to Submit!"
            description="Review all information and click 'Save Product' to create your product."
            type="success"
            showIcon
            style={{ marginTop: 16, padding: "12px 16px" }}
          />
        )}
      </Form>
    </div>
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
