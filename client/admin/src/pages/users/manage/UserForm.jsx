import { LoadingOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row, Select, Space, Tag, Typography } from "antd";
import { BsShop } from "react-icons/bs";
import { FaPhoneAlt, FaRegUser, FaUser, FaUserTie } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import { RiCharacterRecognitionFill } from "react-icons/ri";
import { SiMinutemailer } from "react-icons/si";

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

const userRoles = [
  { value: "USER", label: "User", icon: <FaUser /> },
  { value: "SELLER", label: "Seller", icon: <BsShop /> },
  { value: "MANAGER", label: "Manager", icon: <FaUserTie /> },
  { value: "SUPPORT", label: "Support", icon: <MdOutlineSupportAgent /> },
];

const UserForm = ({ form, defaultValues, isLoading, isUpdate }) => {
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={defaultValues}
      requiredMark={customizeRequiredMark}
    >
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "Please enter first name" }]}
            hasFeedback
          >
            <Input
              placeholder="Enter First Name"
              prefix={<RiCharacterRecognitionFill />}
              suffix={isLoading && <LoadingOutlined />}
              disabled={isLoading}
              count={{ max: 55, show: true }}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Last Name" name="lastName" hasFeedback>
            <Input
              placeholder="Enter Last Name"
              suffix={isLoading && <LoadingOutlined />}
              disabled={isLoading}
              prefix={<RiCharacterRecognitionFill />}
              count={{ max: 55, show: true }}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Please enter username" },
              {
                min: 3,
                max: 20,
                message: "Username must be between 3 and 20 characters",
              },
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message:
                  "Username can only contain letters, numbers, and underscores",
              },
            ]}
            hasFeedback
          >
            <Input
              placeholder="Enter username"
              prefix={<FaRegUser />}
              suffix={isLoading && <LoadingOutlined />}
              disabled={isLoading || isUpdate}
              count={{ max: 55, show: true }}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              {
                type: "email",
                message: "Please enter a valid email address",
              },
            ]}
            hasFeedback
          >
            <Input
              placeholder="Enter email"
              prefix={<SiMinutemailer />}
              suffix={isLoading && <LoadingOutlined />}
              disabled={isLoading || isUpdate}
              count={{ max: 150, show: true }}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Roles"
            name="roles"
            rules={[{ required: true, message: "Please select roles" }]}
            hasFeedback
          >
            <Select
              placeholder="Select roles"
              loading={isLoading}
              mode="tags"
              disabled={isUpdate}
            >
              {userRoles.map((type) => (
                <Option key={type.value} value={type.value}>
                  <span className="flex justify-start items-center gap-1.5">
                    {type.icon}
                    {type.label}
                  </span>
                </Option>
              ))}
            </Select>
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
              suffix={isLoading && <LoadingOutlined />}
              disabled={isLoading}
              count={{ max: 20, show: true }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default UserForm;
