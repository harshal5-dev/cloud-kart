import { LoadingOutlined, ProductFilled } from "@ant-design/icons";
import {
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Tag,
  Typography,
} from "antd";
import PropTypes from "prop-types";
import { FaCode } from "react-icons/fa";
import { TbListNumbers } from "react-icons/tb";

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

const ProductImageForm = ({ form, defaultValues, isLoading }) => {
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
            name="imageUrl"
            label="Image URL"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input product image url!",
              },
            ]}
          >
            <Input
              prefix={<ProductFilled />}
              placeholder="product image url"
              suffix={isLoading && <LoadingOutlined />}
              disabled={isLoading}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="sortOrder"
            label="Sort Order"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input image sort order!",
              },
            ]}
          >
            <InputNumber
              prefix={<TbListNumbers />}
              placeholder="image sort order"
              style={{ width: "100%" }}
              min={0}
              step={1}
              suffix={isLoading && <LoadingOutlined />}
              disabled={isLoading}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Form.Item name="altText" label="Alternate Text" hasFeedback>
            <Input
              prefix={<FaCode />}
              placeholder="image alt text"
              suffix={isLoading && <LoadingOutlined />}
              disabled={isLoading}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="isPrimary" valuePropName="checked">
        <Checkbox>Set as Primary</Checkbox>
      </Form.Item>
    </Form>
  );
};

ProductImageForm.propTypes = {
  defaultValues: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default ProductImageForm;
