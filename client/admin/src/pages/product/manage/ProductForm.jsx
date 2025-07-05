import { LoadingOutlined, ProductFilled } from "@ant-design/icons";
import {
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Tag,
  Typography,
} from "antd";
import PropTypes from "prop-types";
import { LuLassoSelect } from "react-icons/lu";
import { AiFillDollarCircle } from "react-icons/ai";
import { GoNumber } from "react-icons/go";
import { FaCode } from "react-icons/fa";
import { TbBrandBootstrap } from "react-icons/tb";

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

const ProductForm = ({ defaultValues, isLoading, form }) => {
  const categoryResponse = useGetCategoriesQuery();
  const { data: categories, isLoading: isCategoryLoading } = categoryResponse;

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
              suffix={isLoading && <LoadingOutlined />}
              count={{ max: 300, show: true }}
              disabled={isLoading}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
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
              suffix={isLoading && <LoadingOutlined />}
              disabled={isLoading}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item name="brand" label="Brand" hasFeedback>
            <Input
              prefix={<TbBrandBootstrap />}
              placeholder="brand name"
              suffix={isLoading && <LoadingOutlined />}
              count={{ max: 100, show: true }}
              disabled={isLoading}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
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
              suffix={isLoading && <LoadingOutlined />}
              disabled={isLoading}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
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
              loading={isLoading || isCategoryLoading}
              placeholder="category"
              options={mapToSelect(categories, "slug")}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
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
              suffix={isLoading && <LoadingOutlined />}
              disabled={isLoading}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Description" name="description" hasFeedback>
            <Input.TextArea
              count={{ max: 500, show: true }}
              disabled={isLoading}
              rows={3}
              placeholder="product description"
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

ProductForm.propTypes = {
  defaultValues: PropTypes.object,
  isLoading: PropTypes.bool,
  form: PropTypes.object,
};

export default ProductForm;
