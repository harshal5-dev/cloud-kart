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
import { LuLassoSelect } from "react-icons/lu";
import { AiFillDollarCircle } from "react-icons/ai";
import { GoNumber } from "react-icons/go";
import { FaCode } from "react-icons/fa";

import { mapToSelect } from "../../../lib/utils";
import { useGetCategoriesQuery } from "../../category/categoryApi";

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

const ProductForm = ({ defaultValues, onSubmit, isProductSaveLoading }) => {
  const [form] = Form.useForm();

  const categoryResponse = useGetCategoriesQuery();
  const { data: categories, isLoading } = categoryResponse;

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
            name="title"
            label="Title"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input product title!",
              },
            ]}
          >
            <Input
              prefix={<ProductFilled />}
              placeholder="product title"
              variant="filled"
              suffix={isProductSaveLoading && <LoadingOutlined />}
              count={{ max: 300, show: true }}
              disabled={isProductSaveLoading}
            />
          </Form.Item>
        </Col>

        <Col span={24} xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            name="sku"
            label="SKU"
            rules={[
              {
                required: true,
                message: "Please input product sku!",
              },
              {
                pattern: /^[a-zA-Z0-9-]+$/,
                message: "SKU must be alphanumeric or hyphenated!",
              },
            ]}
            hasFeedback
          >
            <Input
              prefix={<FaCode />}
              placeholder="product sku"
              variant="filled"
              suffix={isProductSaveLoading && <LoadingOutlined />}
              disabled={isProductSaveLoading}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24} xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                required: true,
                message: "Please input product price!",
              },
            ]}
            hasFeedback
          >
            <InputNumber
              prefix={<AiFillDollarCircle />}
              placeholder="product price"
              style={{ width: "100%" }}
              min={0}
              step={0.01}
              precision={2}
              variant="filled"
              suffix={isProductSaveLoading && <LoadingOutlined />}
              disabled={isProductSaveLoading}
            />
          </Form.Item>
        </Col>

        <Col span={24} xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label="Select Category"
            name="categorySlug"
            rules={[
              {
                required: true,
                message: "Please select category!",
              },
            ]}
            hasFeedback
          >
            <Select
              prefix={<LuLassoSelect />}
              variant="filled"
              loading={isLoading || isProductSaveLoading}
              placeholder="category"
              options={mapToSelect(categories, "slug")}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24} xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            name="stock"
            label="Stock"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input product stock!",
              },
            ]}
          >
            <InputNumber
              prefix={<GoNumber />}
              placeholder="product stock"
              min={0}
              style={{ width: "100%" }}
              variant="filled"
              suffix={isProductSaveLoading && <LoadingOutlined />}
              disabled={isProductSaveLoading}
            />
          </Form.Item>
        </Col>

        <Col span={24} xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item label="Description" name="description" hasFeedback>
            <Input.TextArea
              count={{ max: 500, show: true }}
              disabled={isProductSaveLoading}
              rows={3}
              variant="filled"
              placeholder="product description"
            />
          </Form.Item>
        </Col>

        <Col span={24} xs={24} sm={24} md={12} lg={12} xl={12}></Col>
      </Row>

      <Form.Item>
        <Flex justify="end" gap={10}>
          <Button
            color="primary"
            variant="outlined"
            icon={<BiReset />}
            onClick={() => form.resetFields()}
            disabled={isProductSaveLoading}
          >
            Reset
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isProductSaveLoading}
            icon={<SaveFilled />}
          >
            Submit
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

ProductForm.propTypes = {
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func,
  isProductSaveLoading: PropTypes.bool,
};

export default ProductForm;
