import { LoadingOutlined, ProductFilled, SaveFilled } from "@ant-design/icons";
import PropTypes from "prop-types";
import { Button, Col, Flex, Form, Input, Row, Tag, Typography } from "antd";
import { BiReset } from "react-icons/bi";
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

const CategoryForm = ({ defaultValues, isCategorySaveLoading, onSubmit }) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      requiredMark={customizeRequiredMark}
      onFinish={onSubmit}
      initialValues={defaultValues}
    >
      <Row gutter={16}>
        <Col span={24} xs={24} sm={24} md={12} lg={12} xl={12}>
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
              suffix={isCategorySaveLoading && <LoadingOutlined />}
              count={{ max: 300, show: true }}
              disabled={isCategorySaveLoading}
              variant="filled"
            />
          </Form.Item>
        </Col>

        <Col span={24} xs={24} sm={24} md={12} lg={12} xl={12}>
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
              suffix={isCategorySaveLoading && <LoadingOutlined />}
              disabled={isCategorySaveLoading}
              variant="filled"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24} xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item name="imageUrl" label="Image URL" hasFeedback>
            <Input
              prefix={<ProductFilled />}
              placeholder="product image url"
              variant="filled"
              suffix={isCategorySaveLoading && <LoadingOutlined />}
              disabled={isCategorySaveLoading}
            />
          </Form.Item>
        </Col>
        <Col span={24} xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item label="Description" name="description">
            <Input.TextArea
              count={{ max: 500, show: true }}
              disabled={isCategorySaveLoading}
              rows={3}
              variant="filled"
              placeholder="category description"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Flex justify="end" gap={10}>
          <Button
            color="primary"
            htmlType="button"
            variant="outlined"
            icon={<BiReset />}
            onClick={() => form.resetFields()}
            disabled={isCategorySaveLoading}
          >
            Reset
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isCategorySaveLoading}
            icon={<SaveFilled />}
          >
            Submit
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

CategoryForm.propTypes = {
  defaultValues: PropTypes.object,
  isCategorySaveLoading: PropTypes.bool,
  isParentCategoryRequired: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default CategoryForm;
