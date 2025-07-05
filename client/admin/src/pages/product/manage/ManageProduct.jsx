import { useState } from "react";
import PropTypes from "prop-types";
import { App, Button, Form, Modal } from "antd";
import { FaPencilAlt, FaSave } from "react-icons/fa";
import { LuPackagePlus } from "react-icons/lu";

import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../productApi";
import ProductForm from "./ProductForm";

const ManageProduct = ({ operation, product }) => {
  const isUpdate = operation === "UPDATE";
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { message } = App.useApp();
  let defaultValues = {
    title: "",
    description: "",
    categorySlug: null,
    price: null,
    stock: null,
    sku: "",
    brand: "",
  };

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const handleAddProduct = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditProduct = (product) => {
    form.setFieldsValue(product);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        if (product) {
          if (!form.isFieldsTouched()) {
            message.warning("No changes made to the product");
            setIsModalVisible(false);
            return;
          }

          try {
            const payload = {
              ...values,
              curSku: product.sku,
            };
            const res = await updateProduct(payload).unwrap();
            message.success(res.statusMessage);
            setIsModalVisible(false);
          } catch (errorRes) {
            const error = errorRes.data;
            message.error(error.errorMessage);
          }
        } else {
          try {
            const payload = {
              ...values,
            };
            const res = await createProduct(payload).unwrap();
            message.success(res.statusMessage);
            setIsModalVisible(false);
          } catch (errorRes) {
            const error = errorRes.data;
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
          onClick={() => handleEditProduct(product)}
        />
      ) : (
        <Button
          type="primary"
          className="ml-auto"
          icon={<LuPackagePlus />}
          onClick={handleAddProduct}
        >
          Product
        </Button>
      )}
      {/* Modal for adding/editing product */}
      <Modal
        title={isUpdate ? "Edit Product" : "Add New Product"}
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
        <ProductForm
          defaultValues={defaultValues}
          form={form}
          isLoading={isCreating || isUpdating}
        />
      </Modal>
    </>
  );
};

ManageProduct.propTypes = {
  operation: PropTypes.oneOf(["CREATE", "UPDATE"]),
  product: PropTypes.object,
};

export default ManageProduct;
