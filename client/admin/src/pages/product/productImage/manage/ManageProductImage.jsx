import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { App, Col, Flex, Row, Space, Typography } from "antd";
import PropTypes from "prop-types";
import { FcAddDatabase, FcDataConfiguration } from "react-icons/fc";

import { pick } from "../../../../lib/utils";
import {
  useCreateProductImageMutation,
  useUpdateProductImageMutation,
} from "../productImageApi";
import {
  clearProductImageOperation,
  clearSelectedProductImage,
} from "../productImageSlice";
import ProductImageForm from "./ProductImageForm";

const { Text } = Typography;

const ManageProductImage = ({ onSuccess }) => {
  let title = "Create Product Image";
  let description = "create a new product image to the database.";
  let HeaderIcon = FcAddDatabase;
  let defaultValues = {
    imageUrl: "",
    altText: "",
    sortOrder: null,
  };

  const { notification } = App.useApp();
  const operation = useSelector(
    (state) => state.productImage.productImageOperation
  );
  const selectedProductImage = useSelector(
    (state) => state.productImage.selectedProductImage
  );
  const productSku = useSelector(
    (state) => state.productImage.selectedProductSku
  );

  const dispatch = useDispatch();
  const [createProductImage, { isLoading: isCreating }] =
    useCreateProductImageMutation();
  const [updateProductImage, { isLoading: isUpdating }] =
    useUpdateProductImageMutation();

  if (operation === "UPDATE") {
    title = "Update Product Image";
    description = "update the selected product image in the database.";
    HeaderIcon = FcDataConfiguration;
    defaultValues = pick(selectedProductImage, [
      "imageUrl",
      "altText",
      "sortOrder",
    ]);
  }

  async function handleOnSubmit(values) {
    if (operation === "CREATE") {
      try {
        const payload = {
          ...values,
          productSku,
        };
        const res = await createProductImage(payload).unwrap();
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
          id: selectedProductImage.id,
          productSku,
        };
        const res = await updateProductImage(payload).unwrap();
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
      dispatch(clearProductImageOperation());
      dispatch(clearSelectedProductImage());
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
        <ProductImageForm
          defaultValues={defaultValues}
          onSubmit={handleOnSubmit}
          isProductSaveLoading={isCreating || isUpdating}
        />
      </Col>
    </Row>
  );
};

ManageProductImage.propTypes = {
  onSuccess: PropTypes.func,
};

export default ManageProductImage;
