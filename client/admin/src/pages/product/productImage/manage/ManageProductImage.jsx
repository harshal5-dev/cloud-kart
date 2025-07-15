import { useState } from "react";
import PropTypes from "prop-types";
import { App, Button, Form, Modal } from "antd";
import { FaPencilAlt, FaSave } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";

import {
  useCreateProductImageMutation,
  useUpdateProductImageMutation,
} from "../productImageApi";
import ProductImageForm from "./ProductImageForm";

const ManageProductImage = ({ operation, productImage, productSku }) => {
  const isUpdate = operation === "UPDATE";
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { message } = App.useApp();
  let defaultValues = {
    imageUrl: "",
    altText: "",
    sortOrder: null,
  };

  const [createProductImage, { isLoading: isCreating }] =
    useCreateProductImageMutation();
  const [updateProductImage, { isLoading: isUpdating }] =
    useUpdateProductImageMutation();

  const handleAddProductImage = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditProductImage = (productImage) => {
    form.setFieldsValue(productImage);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        if (productImage) {
          if (!form.isFieldsTouched()) {
            message.warning("No changes made to the product image");
            setIsModalVisible(false);
            return;
          }

          try {
            const payload = {
              ...values,
              id: productImage.id,
              productSku,
            };
            const res = await updateProductImage(payload).unwrap();
            message.success(res.statusMessage);
            setIsModalVisible(false);
          } catch (error) {
            message.error(error.errorMessage);
          }
        } else {
          try {
            const payload = {
              ...values,
              productSku,
            };
            const res = await createProductImage(payload).unwrap();
            message.success(res.statusMessage);
            setIsModalVisible(false);
          } catch (error) {
            message.error(error.errorMessage);
          }
        }
      })
      .catch(() => {
        message.error("Please fill in all required fields");
      });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {isUpdate ? (
        <Button
          variant="text"
          shape="circle"
          color="gold"
          icon={<FaPencilAlt />}
          onClick={() => handleEditProductImage(productImage)}
        />
      ) : (
        <Button
          type="primary"
          icon={<RiImageAddFill />}
          onClick={handleAddProductImage}
        >
          Image
        </Button>
      )}
      {/* Modal for adding/editing user */}
      <Modal
        title={isUpdate ? "Edit Product Image" : "Add New Product Image"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
        okText="Save"
        okButtonProps={{
          icon: <FaSave />,
        }}
        maskClosable={false}
        confirmLoading={isCreating || isUpdating}
      >
        <ProductImageForm
          form={form}
          defaultValues={defaultValues}
          isLoading={isCreating || isUpdating}
        />
      </Modal>
    </>
  );
};

ManageProductImage.propTypes = {
  operation: PropTypes.oneOf(["CREATE", "UPDATE"]),
  productImage: PropTypes.object,
  productSku: PropTypes.string,
};

export default ManageProductImage;
