import { LoadingOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import {
  Col,
  Form,
  Input,
  Row,
  Tag,
  Typography,
  Card,
  Avatar,
  Flex,
  Divider,
  Space,
} from "antd";
import { MdCategory } from "react-icons/md";
import { FaCode, FaImage, FaFileAlt } from "react-icons/fa";

import { cssVariables } from "../../../config/themeConfig";

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

const CategoryForm = ({ form, defaultValues, isLoading, isUpdate }) => {
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
          icon={<MdCategory />}
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
            {isUpdate ? "Update Category Information" : "Create New Category"}
          </Title>
          <Text
            type="secondary"
            style={{
              fontSize: "11px",
              opacity: 0.8,
            }}
          >
            {isUpdate
              ? "Update category details below"
              : "Fill in the category details below"}
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
                name="name"
                label="Category Name"
                rules={[
                  {
                    required: true,
                    message: "Please input category name!",
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder="Enter category name"
                  prefix={
                    <MdCategory
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
              <Form.Item
                name="slug"
                label="Category Slug"
                rules={[
                  {
                    required: true,
                    message: "Please input category slug!",
                  },
                  {
                    pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                    message: "Slug must be lowercase and can contain hyphens.",
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder="Enter category slug"
                  prefix={
                    <FaCode
                      style={{
                        color: cssVariables.colorSecondary,
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
            </Col>
          </Row>

          <Form.Item name="imageUrl" label="Category Image URL" hasFeedback>
            <Input
              placeholder="Enter category image URL"
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

          <Form.Item label="Category Description" name="description">
            <Input.TextArea
              placeholder="Enter category description"
              disabled={isLoading}
              rows={3}
              style={{
                transition: "all 0.2s ease",
              }}
              showCount
              maxLength={500}
            />
          </Form.Item>
        </Space>
      </Form>
    </Card>
  );
};

CategoryForm.propTypes = {
  defaultValues: PropTypes.object,
  form: PropTypes.object,
  isLoading: PropTypes.bool,
  isUpdate: PropTypes.bool,
};

export default CategoryForm;
