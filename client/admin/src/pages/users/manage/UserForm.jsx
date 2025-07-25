import { LoadingOutlined } from "@ant-design/icons";
import {
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Tag,
  Typography,
  Card,
  Avatar,
  Flex,
  Divider,
} from "antd";
import { BsShop } from "react-icons/bs";
import {
  FaLink,
  FaPhoneAlt,
  FaRegUser,
  FaUser,
  FaUserTie,
} from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import { BiSolidRename } from "react-icons/bi";
import { SiMinutemailer } from "react-icons/si";
import { cssVariables } from "../../../config/themeConfig";

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

const userRoles = [
  { value: "USER", label: "User", icon: <FaUser /> },
  { value: "SELLER", label: "Seller", icon: <BsShop /> },
  { value: "MANAGER", label: "Manager", icon: <FaUserTie /> },
  { value: "SUPPORT", label: "Support", icon: <MdOutlineSupportAgent /> },
];

const UserForm = ({ form, defaultValues, isLoading, isUpdate }) => {
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
          icon={<FaUser />}
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
            {isUpdate ? "Update User Information" : "Create New User"}
          </Title>
          <Text
            type="secondary"
            style={{
              fontSize: "11px",
              opacity: 0.8,
            }}
          >
            {isUpdate
              ? "Update user details below"
              : "Fill in the user details below"}
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
            <Col xs={24} sm={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: "Please enter first name" }]}
                hasFeedback
              >
                <Input
                  placeholder="Enter First Name"
                  prefix={
                    <BiSolidRename
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
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Last Name" name="lastName" hasFeedback>
                <Input
                  placeholder="Enter Last Name"
                  prefix={
                    <BiSolidRename
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
          </Row>

          <Form.Item
            label="Profile Picture Url"
            name="profilePictureUrl"
            hasFeedback
          >
            <Input
              placeholder="Enter Profile Picture Url"
              prefix={
                <FaLink
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
              prefix={
                <FaRegUser
                  style={{
                    color: cssVariables.colorTitle,
                    fontSize: "12px",
                    opacity: 0.7,
                  }}
                />
              }
              suffix={isLoading && <LoadingOutlined />}
              disabled={isLoading || isUpdate}
              style={{
                transition: "all 0.2s ease",
              }}
            />
          </Form.Item>

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
              prefix={
                <SiMinutemailer
                  style={{
                    color: cssVariables.colorOrange,
                    fontSize: "12px",
                    opacity: 0.7,
                  }}
                />
              }
              suffix={isLoading && <LoadingOutlined />}
              disabled={isLoading || isUpdate}
              style={{
                transition: "all 0.2s ease",
              }}
            />
          </Form.Item>

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
              style={{
                transition: "all 0.2s ease",
              }}
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
              placeholder="Enter Phone Number (e.g., +91 12345 67890)"
              prefix={
                <FaPhoneAlt
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
        </Space>
      </Form>
    </Card>
  );
};

export default UserForm;
