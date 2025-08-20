import {
  LoadingOutlined,
  ProductFilled,
  DollarOutlined,
  SettingOutlined,
  ShoppingOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
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
  Avatar,
  Divider,
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
  FaBox,
  FaImage,
} from "react-icons/fa";
import { TbBrandBootstrap } from "react-icons/tb";
import { BiDetail } from "react-icons/bi";

import { mapToSelect } from "../../../lib/utils";
import { useGetCategoriesQuery } from "../../category/categoryApi";
import { cssVariables } from "../../../config/themeConfig";
import { MdLocalMall } from "react-icons/md";

const { Text, Title } = Typography;

const customizeRequiredMark = (label, { required }) => (
  <Flex align="center" gap={5}>
    {required ? (
      <Tag
        style={{
          fontSize: "10px",
          borderRadius: 12,
          padding: "2px 8px",
          background: cssVariables.colorError + "15",
          color: cssVariables.colorError,
          border: "1px solid " + cssVariables.colorError + "30",
        }}
      >
        Required
      </Tag>
    ) : (
      <Tag
        style={{
          fontSize: "10px",
          borderRadius: 12,
          padding: "2px 8px",
          background: cssVariables.colorSecondary + "15",
          color: cssVariables.colorSecondary,
          border: "1px solid " + cssVariables.colorSecondary + "30",
        }}
      >
        Optional
      </Tag>
    )}
    <Text style={{ fontWeight: 500, color: "inherit" }}>{label}</Text>
  </Flex>
);

const ProductForm = ({
  defaultValues = {},
  isLoading = false,
  form,
  onSubmit,
  isUpdate = false,
  currentStep,
  setCurrentStep,
}) => {
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const categoryResponse = useGetCategoriesQuery();
  const { data: categories, isLoading: isCategoryLoading } = categoryResponse;

  const availabilityStatusOptions = [
    {
      label: (
        <Space>
          <CheckCircleOutlined style={{ color: "#52c41a" }} />
          In Stock
        </Space>
      ),
      value: "IN_STOCK",
    },
    {
      label: (
        <Space>
          <CloseCircleOutlined style={{ color: "#ff4d4f" }} />
          Out of Stock
        </Space>
      ),
      value: "OUT_OF_STOCK",
    },
    {
      label: (
        <Space>
          <ExclamationCircleOutlined style={{ color: "#faad14" }} />
          Low Stock
        </Space>
      ),
      value: "LOW_STOCK",
    },
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
      // size="small"
      style={{
        background: `linear-gradient(135deg, ${cssVariables.colorPrimary}03 0%, ${cssVariables.colorSecondary}03 100%)`,
        border: `1px solid ${cssVariables.colorBorder}`,
        marginBottom: 16,
      }}
      styles={{ body: { padding: "20px" } }}
      title={
        <Flex align="center" gap={8}>
          <Avatar
            size={28}
            style={{
              backgroundColor: cssVariables.colorPrimary + "15",
              color: cssVariables.colorPrimary,
              fontSize: "14px",
            }}
            icon={<ProductFilled />}
          />
          <Text
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: cssVariables.colorTextHeading,
            }}
          >
            Basic Information
          </Text>
        </Flex>
      }
    >
      <Row gutter={[16, 12]}>
        <Col span={24}>
          <Form.Item
            name="title"
            label="Product Title"
            rules={[{ required: true, message: "Please input product title!" }]}
          >
            <Input
              prefix={
                <ProductFilled style={{ color: cssVariables.colorPrimary }} />
              }
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
              suffixIcon={
                <LuLassoSelect style={{ color: cssVariables.colorPrimary }} />
              }
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item name="brand" label="Brand">
            <Input
              prefix={
                <TbBrandBootstrap
                  style={{ color: cssVariables.colorPrimary }}
                />
              }
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
      size="small"
      style={{
        background: `linear-gradient(135deg, ${cssVariables.colorSecondary}03 0%, ${cssVariables.colorPrimary}03 100%)`,
        border: `1px solid ${cssVariables.colorBorder}`,
        borderRadius: 8,
        marginBottom: 16,
      }}
      styles={{ body: { padding: "20px" } }}
      title={
        <Flex align="center" gap={8}>
          <Avatar
            size={28}
            style={{
              backgroundColor: cssVariables.colorSecondary + "15",
              color: cssVariables.colorSecondary,
              fontSize: "14px",
            }}
            icon={<BiDetail />}
          />
          <Text
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: cssVariables.colorTextHeading,
            }}
          >
            Product Identifiers
          </Text>
        </Flex>
      }
    >
      <Row gutter={[16, 12]}>
        <Col span={24}>
          <Form.Item name="thumbnail" label="Thumbnail URL">
            <Input
              prefix={
                <FaImage style={{ color: cssVariables.colorSecondary }} />
              }
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
              prefix={<FaCode style={{ color: cssVariables.colorSecondary }} />}
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
            extra="Featured products appear prominently"
          >
            <Switch
              checkedChildren="Featured"
              unCheckedChildren="Regular"
              loading={isLoading}
            />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );

  const renderPricing = () => (
    <Card
      size="small"
      style={{
        background: `linear-gradient(135deg, ${cssVariables.colorSecondary}03 0%, ${cssVariables.colorPrimary}03 100%)`,
        border: `1px solid ${cssVariables.colorBorder}`,
        borderRadius: 8,
        marginBottom: 16,
      }}
      styles={{ body: { padding: "20px" } }}
      title={
        <Flex align="center" gap={8}>
          <Avatar
            size={28}
            style={{
              backgroundColor: cssVariables.colorPrimary + "15",
              color: cssVariables.colorPrimary,
              fontSize: "14px",
            }}
            icon={<DollarOutlined />}
          />
          <Text
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: cssVariables.colorTextHeading,
            }}
          >
            Pricing Information
          </Text>
        </Flex>
      }
    >
      <Row gutter={[16, 12]}>
        <Col xs={24} md={12}>
          <Form.Item
            name="price"
            label="Product Price"
            rules={[{ required: true, message: "Please input product price!" }]}
          >
            <InputNumber
              prefix={
                <AiFillDollarCircle
                  style={{ color: cssVariables.colorPrimary }}
                />
              }
              placeholder="0.00"
              min={0}
              step={0.01}
              precision={2}
              disabled={isLoading}
              style={{
                width: "100%",
              }}
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
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Alert
            style={{
              padding: "10px 16px",
              background: `${cssVariables.colorPrimary}08`,
              border: `1px solid ${cssVariables.colorPrimary}20`,
            }}
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
      size="small"
      style={{
        background: `linear-gradient(135deg, ${cssVariables.colorPrimary}03 0%, ${cssVariables.colorSecondary}03 100%)`,
        border: `1px solid ${cssVariables.colorBorder}`,
        borderRadius: 8,
        marginBottom: 16,
      }}
      styles={{ body: { padding: "20px" } }}
      title={
        <Flex align="center" gap={8}>
          <Avatar
            size={28}
            style={{
              backgroundColor: cssVariables.colorSecondary + "15",
              color: cssVariables.colorSecondary,
              fontSize: "14px",
            }}
            icon={<SettingOutlined />}
          />
          <Text
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: cssVariables.colorTextHeading,
            }}
          >
            Physical Properties
          </Text>
        </Flex>
      }
    >
      <Row gutter={[16, 12]}>
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
        <Col xs={24}>
          <Form.Item name="shippingDetails" label="Shipping Details">
            <Input.TextArea
              disabled={isLoading}
              placeholder="Describe shipping options, delivery time, and any special shipping requirements..."
              showCount
              maxLength={500}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="warrantyDetails" label="Warranty Details">
            <Input.TextArea
              disabled={isLoading}
              placeholder="Specify warranty period, coverage details, and claim process..."
              showCount
              maxLength={500}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
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
    <Card
      style={{
        boxShadow: cssVariables.shadowSubtle,
        margin: "1.5rem 0 0",
        overflow: "hidden",
      }}
      styles={{ body: { padding: "24px" } }}
    >
      {/* Form Header */}
      <Flex align="center" gap={12} style={{ marginBottom: 24 }}>
        <Avatar
          size={42}
          style={{
            backgroundColor: cssVariables.colorPrimary + "10",
            color: cssVariables.colorPrimary,
            border: `2px solid ${cssVariables.colorPrimary}20`,
            fontSize: "18px",
          }}
          icon={<MdLocalMall />}
        />
        <Flex vertical gap={2}>
          <Title
            level={4}
            style={{
              margin: 0,
              color: cssVariables.colorPrimary,
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            {isUpdate ? "Update Product Information" : "Create New Product"}
          </Title>
          <Text
            type="secondary"
            style={{
              fontSize: "12px",
              opacity: 0.8,
              lineHeight: "16px",
            }}
          >
            {isUpdate
              ? "Modify product details and inventory settings"
              : "Fill in the product details below to add to catalog"}
          </Text>
        </Flex>
      </Flex>

      <Divider style={{ margin: "0 0 24px 0" }} />

      {/* Compact Steps Progress */}
      <Card
        size="small"
        style={{
          marginBottom: 20,
          background: `linear-gradient(135deg, ${cssVariables.colorPrimary}08 0%, ${cssVariables.colorSecondary}08 100%)`,
          border: `1px solid ${cssVariables.colorBorder}`,
          borderRadius: 8,
        }}
        styles={{ body: { padding: "12px 16px" } }}
      >
        <Flex justify="space-between" align="center">
          <Flex align="center" gap={8}>
            <Avatar
              size={34}
              style={{
                backgroundColor: cssVariables.colorPrimary,
                color: cssVariables.colorWhite,
                fontSize: "16px",
                fontWeight: 600,
              }}
            >
              {currentStep + 1}
            </Avatar>
            <div>
              <Text
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: cssVariables.colorTextHeading,
                }}
              >
                {steps[currentStep].title}
              </Text>
              <br />
              <Text
                style={{
                  fontSize: "11px",
                  color: cssVariables.colorTextSecondary,
                }}
              >
                {steps[currentStep].description}
              </Text>
            </div>
          </Flex>
          <Progress
            percent={Math.round(((currentStep + 1) / steps.length) * 100)}
            size="small"
            showInfo={false}
            strokeColor={{
              "0%": cssVariables.colorPrimary,
              "100%": cssVariables.colorSecondary,
            }}
            style={{ width: 120 }}
          />
        </Flex>
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
            marginTop: 20,
            background: `linear-gradient(135deg, ${cssVariables.colorPrimary}05 0%, ${cssVariables.colorSecondary}05 100%)`,
            border: `1px solid ${cssVariables.colorBorder}`,
            borderRadius: 8,
          }}
          styles={{ body: { padding: "16px 20px" } }}
        >
          <Row justify="space-between" align="middle">
            <Col>
              <Button
                onClick={handlePrevious}
                icon={<FaArrowAltCircleLeft />}
                loading={isLoading}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
            </Col>

            <Col>
              <Flex align="center" gap={8} wrap="nowrap">
                <Text
                  style={{
                    fontSize: "12px",
                    color: cssVariables.colorTextSecondary,
                  }}
                >
                  Step {currentStep + 1} of {steps.length}
                </Text>
                {currentStep < steps.length - 1 && (
                  <Button
                    type="primary"
                    onClick={handleNext}
                    icon={<FaArrowAltCircleRight />}
                    iconPosition="end"
                    loading={isLoading}
                    style={{
                      fontWeight: 500,
                      background: `linear-gradient(135deg, ${cssVariables.colorPrimary}, ${cssVariables.colorSecondary})`,
                      border: "none",
                    }}
                  >
                    Next
                  </Button>
                )}
                {(currentStep === steps.length - 1 || isUpdate) && (
                  <Button
                    type="primary"
                    onClick={handleFormSubmit}
                    icon={<FaSave />}
                    loading={isLoading}
                    style={{
                      fontWeight: 500,
                      background: `linear-gradient(135deg, ${cssVariables.colorPrimary}, ${cssVariables.colorSecondary})`,
                      border: "none",
                    }}
                  >
                    Save
                  </Button>
                )}
              </Flex>
            </Col>
          </Row>
        </Card>
      </Form>
    </Card>
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
  isUpdate: PropTypes.bool,
};

export default ProductForm;
