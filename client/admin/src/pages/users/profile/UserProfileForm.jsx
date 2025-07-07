import PropTypes from "prop-types";
import { BiSolidRename } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";
import { LoadingOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import { Col, Form, Input, Row, Typography } from "antd";

const { Text } = Typography;

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

const UserProfileForm = ({ form, isEditProfileLoading }) => {
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        firstName: "",
        lastName: "",
        phoneNumber: "",
      }}
      requiredMark={customizeRequiredMark}
    >
      <Row gutter={24} style={{ marginTop: "1.3rem" }}>
        <Col span={24}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "Please enter first name" }]}
            hasFeedback
          >
            <Input
              placeholder="Enter First Name"
              prefix={<BiSolidRename />}
              suffix={isEditProfileLoading && <LoadingOutlined />}
              disabled={isEditProfileLoading}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Last Name" name="lastName" hasFeedback>
            <Input
              placeholder="Enter Last Name"
              suffix={isEditProfileLoading && <LoadingOutlined />}
              disabled={isEditProfileLoading}
              prefix={<BiSolidRename />}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please enter your phone number",
              },
              {
                pattern: /^[+]?[0-9\-() ]{7,20}$/,
                message: "Please enter a valid phone number",
              },
            ]}
            hasFeedback
          >
            <Input
              placeholder="Enter Phone Number"
              prefix={<FaPhoneAlt />}
              suffix={isEditProfileLoading && <LoadingOutlined />}
              disabled={isEditProfileLoading}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

UserProfileForm.propTypes = {
  form: PropTypes.object,
  isEditProfileLoading: PropTypes.bool,
};

export default UserProfileForm;
