import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { App, Col, Flex, Row, Space, Typography } from "antd";
import PropTypes from "prop-types";
import { FcAddDatabase, FcDataConfiguration } from "react-icons/fc";

import ProductForm from "./ProductForm";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../productApi";
import { clearProductOperation, clearSelectedProduct } from "../productSlice";
import { pick } from "../../../lib/utils";

const { Text } = Typography;

const ManageProduct = ({ onSuccess }) => {
  let title = "Create Product";
  let description = "create a new product to the database.";
  let HeaderIcon = FcAddDatabase;
  let defaultValues = {
    title: "",
    description: "",
    categorySlug: null,
    price: null,
    stock: null,
    sku: "",
  };

  const { notification } = App.useApp();
  const operation = useSelector((state) => state.product.productOperation);
  const selectedProduct = useSelector((state) => state.product.selectedProduct);

  const dispatch = useDispatch();

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  if (operation === "UPDATE") {
    title = "Update Product";
    description = "update the selected product in the database.";
    HeaderIcon = FcDataConfiguration;
    defaultValues = pick(selectedProduct, [
      "title",
      "description",
      "categorySlug",
      "price",
      "stock",
      "sku",
    ]);
  }

  async function handleOnSubmit(values) {
    if (operation === "CREATE") {
      try {
        const payload = {
          ...values,
        };
        const res = await createProduct(payload).unwrap();
        notification.success({
          message: "Success",
          description: res.statusMessage,
        });
        onSuccess();
      } catch (errorRes) {
        const error = errorRes.data;
        notification.error({
          message: "Error",
          description: error.errorMessage,
        });
      }
    } else {
      try {
        const payload = {
          ...values,
          curSku: selectedProduct.sku,
        };
        const res = await updateProduct(payload).unwrap();
        notification.success({
          message: "Success",
          description: res.statusMessage,
        });
        onSuccess();
      } catch (errorRes) {
        const error = errorRes.data;
        notification.error({
          message: "Error",
          description: error.errorMessage,
        });
      }
    }
  }

  useEffect(() => {
    return () => {
      dispatch(clearProductOperation());
      dispatch(clearSelectedProduct());
    };
  }, [dispatch]);

  return (
    <Row gutter={[0, 24]}>
      <Col span={24}>
        <Flex gap={10}>
          <HeaderIcon className="size-10" />
          <Space direction="vertical" size={0}>
            <Text strong>{title}</Text>
            <Text type="secondary" italic ellipsis>
              {description}
            </Text>
          </Space>
        </Flex>
      </Col>
      <Col span={24}>
        <ProductForm
          defaultValues={defaultValues}
          onSubmit={handleOnSubmit}
          isProductSaveLoading={isCreating || isUpdating}
        />
      </Col>
    </Row>
  );
};

ManageProduct.propTypes = {
  onSuccess: PropTypes.func,
};

export default ManageProduct;
