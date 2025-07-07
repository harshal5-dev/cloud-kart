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
} from "antd";
import { FaCity, FaPhoneAlt, FaStreetView } from "react-icons/fa";
import { MdRealEstateAgent } from "react-icons/md";
import { LoadingOutlined } from "@ant-design/icons";
import { FaEarthAsia, FaSignsPost } from "react-icons/fa6";

const { Text } = Typography;
const { Option } = Select;

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

const AddressForm = ({ form, isLoading, addressTypes }) => {
  return (
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
      style={{ marginTop: "1.3rem" }}
    >
      <Form.Item
        label="Address Type"
        name="addressType"
        rules={[{ required: true, message: "Please select address type" }]}
        hasFeedback
      >
        <Select placeholder="Select address type" loading={isLoading}>
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
          prefix={<FaPhoneAlt />}
          suffix={isLoading && <LoadingOutlined />}
          disabled={isLoading}
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
          prefix={<FaStreetView />}
          suffix={isLoading && <LoadingOutlined />}
          disabled={isLoading}
        />
      </Form.Item>

      <Row gutter={24}>
        <Col span={24} xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Please enter city" }]}
            hasFeedback
          >
            <Input
              placeholder="Enter city"
              prefix={<FaCity />}
              suffix={isLoading && <LoadingOutlined />}
              disabled={isLoading}
            />
          </Form.Item>
        </Col>
        <Col span={24} xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label="State"
            name="state"
            rules={[{ required: true, message: "Please enter state" }]}
            hasFeedback
          >
            <Input
              placeholder="Enter state"
              prefix={<MdRealEstateAgent />}
              suffix={isLoading && <LoadingOutlined />}
              disabled={isLoading}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={24} xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label="Postal Code"
            name="postalCode"
            rules={[{ required: true, message: "Please enter Postal code" }]}
            hasFeedback
          >
            <Input
              placeholder="Enter Postal code"
              prefix={<FaSignsPost />}
              suffix={isLoading && <LoadingOutlined />}
              disabled={isLoading}
            />
          </Form.Item>
        </Col>
        <Col span={24} xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "Please enter country" }]}
            hasFeedback
          >
            <Input
              placeholder="Enter country"
              prefix={<FaEarthAsia />}
              suffix={isLoading && <LoadingOutlined />}
              disabled={isLoading}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="isDefault" valuePropName="checked">
        <Checkbox>Set as default address</Checkbox>
      </Form.Item>
    </Form>
  );
};

AddressForm.propTypes = {
  form: PropTypes.object,
  isLoading: PropTypes.bool,
  addressTypes: PropTypes.array,
};

export default AddressForm;
