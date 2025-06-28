import { LoadingOutlined, ProductFilled, SaveFilled } from "@ant-design/icons";
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Tag,
  Typography,
} from "antd";
import PropTypes from "prop-types";
import { BiReset } from "react-icons/bi";
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

const ProductImageForm = ({
  defaultValues,
  onSubmit,
  isProductImageSaveLoading,
}) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      requiredMark={customizeRequiredMark}
      onFinish={onSubmit}
      initialValues={defaultValues}
    >
      <Row gutter={[16, 16]}>
        <Col span={24} xs={24} sm={24} md={12} lg={12} xl={12}>
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
              variant="filled"
              suffix={isProductImageSaveLoading && <LoadingOutlined />}
              disabled={isProductImageSaveLoading}
            />
          </Form.Item>
        </Col>

        <Col span={24} xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item name="sortOrder" label="Sort Order" hasFeedback>
            <InputNumber
              prefix={<TbListNumbers />}
              placeholder="image sort order"
              style={{ width: "100%" }}
              min={0}
              step={1}
              variant="filled"
              suffix={isProductImageSaveLoading && <LoadingOutlined />}
              disabled={isProductImageSaveLoading}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24} xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item name="altText" label="Alternate Text" hasFeedback>
            <Input
              prefix={<FaCode />}
              placeholder="image alt text"
              variant="filled"
              suffix={isProductImageSaveLoading && <LoadingOutlined />}
              disabled={isProductImageSaveLoading}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Flex justify="end" gap={10}>
          <Button
            color="primary"
            variant="outlined"
            icon={<BiReset />}
            onClick={() => form.resetFields()}
            disabled={isProductImageSaveLoading}
          >
            Reset
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isProductImageSaveLoading}
            icon={<SaveFilled />}
          >
            Submit
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

ProductImageForm.propTypes = {
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func,
  isProductImageSaveLoading: PropTypes.bool,
};

export default ProductImageForm;
