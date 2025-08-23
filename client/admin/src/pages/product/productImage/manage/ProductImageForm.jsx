import { LoadingOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import {
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Tag,
  Typography,
  Card,
  Avatar,
  Flex,
  Divider,
  Space,
} from "antd";
import { FaCode, FaImage } from "react-icons/fa";
import { TbListNumbers } from "react-icons/tb";

import { cssVariables } from "../../../../config/themeConfig";

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

const ProductImageForm = ({ form, defaultValues, isLoading, isUpdate }) => {
  return (
    <Card
      style={{
        boxShadow: cssVariables.shadowSubtle,
        margin: "1.6rem 0 0.5rem 0",
      }}
      styles={{ body: { padding: "15px" } }}
    >
      {/* Form Header */}
      <Flex align="center" gap={8} style={{ marginBottom: 16 }}>
        <Avatar
          size={35}
          style={{
            backgroundColor: cssVariables.colorPrimary + "10",
            color: cssVariables.colorPrimary,
            border: `2px solid ${cssVariables.colorPrimary}20`,
          }}
          icon={<FaImage />}
        />
        <Flex vertical gap={2}>
          <Title
            level={5}
            style={{
              margin: 0,
              color: cssVariables.colorPrimary,
              fontSize: "14px",
            }}
          >
            {isUpdate ? "Update Product Image" : "Add New Product Image"}
          </Title>
          <Text
            type="secondary"
            style={{
              fontSize: "11px",
              opacity: 0.8,
            }}
          >
            {isUpdate
              ? "Update image details below"
              : "Upload a new product image with details"}
          </Text>
        </Flex>
      </Flex>

      <Divider
        style={{
          margin: "12px 0 16px 0",
          borderColor: cssVariables.colorPrimary + "25",
        }}
      />

      <Form
        form={form}
        layout="vertical"
        initialValues={defaultValues}
        requiredMark={customizeRequiredMark}
      >
        <Space direction="vertical" size={5} style={{ width: "100%" }}>
          <Row gutter={[10, 0]}>
            <Col span={24}>
              <Form.Item
                name="imageUrl"
                label="Image URL"
                rules={[
                  {
                    required: true,
                    message: "Please input product image URL!",
                  },
                  {
                    type: "url",
                    message: "Please enter a valid URL!",
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder="Enter product image URL"
                  prefix={
                    <FaImage
                      style={{
                        color: cssVariables.colorMagenta,
                        fontSize: "12px",
                        opacity: 0.7,
                      }}
                    />
                  }
                  suffix={isLoading && <LoadingOutlined />}
                  disabled={isLoading}
                  style={{
                    transition: "all 0.2s ease",
                  }}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="sortOrder"
                label="Sort Order"
                rules={[
                  {
                    required: true,
                    message: "Please input image sort order!",
                  },
                ]}
                hasFeedback
              >
                <InputNumber
                  placeholder="Enter sort order"
                  prefix={
                    <TbListNumbers
                      style={{
                        color: cssVariables.colorSecondary,
                        fontSize: "12px",
                        opacity: 0.7,
                      }}
                    />
                  }
                  style={{
                    width: "100%",
                    transition: "all 0.2s ease",
                  }}
                  min={0}
                  step={1}
                  suffix={isLoading && <LoadingOutlined />}
                  disabled={isLoading}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="altText" label="Alternate Text" hasFeedback>
            <Input
              placeholder="Enter alternate text for accessibility"
              prefix={
                <FaCode
                  style={{
                    color: cssVariables.colorPrimary,
                    fontSize: "12px",
                    opacity: 0.7,
                  }}
                />
              }
              suffix={isLoading && <LoadingOutlined />}
              disabled={isLoading}
              style={{
                transition: "all 0.2s ease",
              }}
            />
          </Form.Item>
        </Space>
      </Form>
    </Card>
  );
};

ProductImageForm.propTypes = {
  defaultValues: PropTypes.object,
  form: PropTypes.object,
  isLoading: PropTypes.bool,
  isUpdate: PropTypes.bool,
};

export default ProductImageForm;
