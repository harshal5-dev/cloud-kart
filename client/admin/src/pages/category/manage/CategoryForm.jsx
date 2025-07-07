import { LoadingOutlined, ProductFilled } from "@ant-design/icons";
import PropTypes from "prop-types";
import { Col, Form, Input, Row, Tag, Typography } from "antd";
import { MdCategory } from "react-icons/md";
import { FaCode } from "react-icons/fa";

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

const CategoryForm = ({ form, defaultValues, isLoading }) => {
  return (
    <Form
      form={form}
      layout="vertical"
      requiredMark={customizeRequiredMark}
      initialValues={defaultValues}
    >
      <Row gutter={16} style={{ marginTop: "1.3rem" }}>
        <Col span={24}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input category name!",
              },
            ]}
            hasFeedback
          >
            <Input
              prefix={<MdCategory />}
              placeholder="category name"
              suffix={isLoading && <LoadingOutlined />}
              count={{ max: 300, show: true }}
              disabled={isLoading}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="slug"
            label="Slug"
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
              prefix={<FaCode />}
              placeholder="category slug"
              suffix={isLoading && <LoadingOutlined />}
              disabled={isLoading}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="imageUrl" label="Image URL" hasFeedback>
            <Input
              prefix={<ProductFilled />}
              placeholder="product image url"
              suffix={isLoading && <LoadingOutlined />}
              disabled={isLoading}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Description" name="description">
            <Input.TextArea
              count={{ max: 500, show: true }}
              disabled={isLoading}
              rows={3}
              placeholder="category description"
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

CategoryForm.propTypes = {
  defaultValues: PropTypes.object,
  form: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default CategoryForm;
