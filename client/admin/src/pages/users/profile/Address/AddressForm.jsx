import PropTypes from "prop-types";
import {
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Tag,
  Typography,
  Flex,
  Card,
  Avatar,
  Divider,
} from "antd";
import {
  FaCity,
  FaPhoneAlt,
  FaStreetView,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdRealEstateAgent } from "react-icons/md";
import { LoadingOutlined } from "@ant-design/icons";
import { FaEarthAsia, FaSignsPost } from "react-icons/fa6";

import { cssVariables } from "../../../../config/themeConfig";

const { Text, Title } = Typography;
const { Option } = Select;

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

const AddressForm = ({ form, isLoading, addressTypes, title }) => {
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
          icon={<FaMapMarkerAlt />}
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
            {title}
          </Title>
          <Text
            type="secondary"
            style={{
              fontSize: "11px",
              opacity: 0.8,
            }}
          >
            Enter address details below
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
        initialValues={{
          addressType: "HOME",
          country: "India",
          streetAddress: "",
          city: "",
          state: "",
          postalCode: "",
          phoneNumber: null,
          isDefault: false,
        }}
        requiredMark={customizeRequiredMark}
      >
        <Space direction="vertical" size={5} style={{ width: "100%" }}>
          <Form.Item
            label="Address Type"
            name="addressType"
            rules={[{ required: true, message: "Please select address type" }]}
            hasFeedback
          >
            <Select
              placeholder="Select address type"
              loading={isLoading}
              style={{
                transition: "all 0.2s ease",
              }}
            >
              {addressTypes.map((type) => (
                <Option key={type.value} value={type.value}>
                  <Space>
                    {type.icon}
                    {type.label}
                  </Space>
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              {
                pattern: /^[+]?[0-9\-() ]{7,20}$/,
                message: "Please enter a valid phone number",
              },
            ]}
            hasFeedback
          >
            <Input
              placeholder="e.g. +91 12345 67890"
              prefix={
                <FaPhoneAlt
                  style={{
                    color: cssVariables.colorTitle,
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

          <Form.Item
            label="Street Address"
            name="streetAddress"
            rules={[{ required: true, message: "Please enter street address" }]}
            hasFeedback
          >
            <Input
              placeholder="Enter street address"
              prefix={
                <FaStreetView
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

          <Row gutter={[10, 0]}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: "Please enter city" }]}
                hasFeedback
              >
                <Input
                  placeholder="Enter city"
                  prefix={
                    <FaCity
                      style={{
                        color: cssVariables.colorSecondary,
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
            <Col xs={24} sm={12}>
              <Form.Item
                label="State"
                name="state"
                rules={[{ required: true, message: "Please enter state" }]}
                hasFeedback
              >
                <Input
                  placeholder="Enter state"
                  prefix={
                    <MdRealEstateAgent
                      style={{
                        color: cssVariables.colorTitle,
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
          </Row>

          <Row gutter={[10, 0]}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Postal Code"
                name="postalCode"
                rules={[
                  { required: true, message: "Please enter Postal code" },
                ]}
                hasFeedback
              >
                <Input
                  placeholder="Enter Postal code"
                  prefix={
                    <FaSignsPost
                      style={{
                        color: cssVariables.colorOrange,
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
            <Col xs={24} sm={12}>
              <Form.Item
                label="Country"
                name="country"
                rules={[{ required: true, message: "Please enter country" }]}
                hasFeedback
              >
                <Input
                  placeholder="Enter country"
                  prefix={
                    <FaEarthAsia
                      style={{
                        color: cssVariables.colorSuccess,
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
          </Row>

          <Form.Item name="isDefault" valuePropName="checked">
            <Checkbox
              style={{
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Set as default address
            </Checkbox>
          </Form.Item>
        </Space>
      </Form>
    </Card>
  );
};

AddressForm.propTypes = {
  form: PropTypes.object,
  isLoading: PropTypes.bool,
  addressTypes: PropTypes.array,
};

export default AddressForm;
