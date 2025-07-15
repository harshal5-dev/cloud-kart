import { useState } from "react";
import PropTypes from "prop-types";
import { App, Button, Form, Modal } from "antd";
import { FaPencilAlt } from "react-icons/fa";
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
    thumbnail: "",
    featured: false,
    discountPercentage: 0,
    weight: null,
    width: null,
    height: null,
    depth: null,
    minimumOrderQuantity: 1,
    availabilityStatus: "IN_STOCK",
    shippingDetails: "",
    warrantyDetails: "",
    returnPolicy: "",
  };

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const handleAddProduct = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditProduct = (product) => {
    // Set form values for editing
    form.setFieldsValue({
      title: product.title || "",
      description: product.description || "",
      categorySlug: product.categorySlug || null,
      price: product.price || null,
      stock: product.stock || null,
      sku: product.sku || "",
      brand: product.brand || "",
      thumbnail: product.thumbnail || "",
      featured: product.featured || false,
      discountPercentage: product.discountPercentage || 0,
      weight: product.weight || null,
      width: product.width || null,
      height: product.height || null,
      depth: product.depth || null,
      minimumOrderQuantity: product.minimumOrderQuantity || 1,
      availabilityStatus: product.availabilityStatus || "IN_STOCK",
      shippingDetails: product.shippingDetails || "",
      warrantyDetails: product.warrantyDetails || "",
      returnPolicy: product.returnPolicy || "",
    });
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
            form.resetFields();
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
            form.resetFields();
          } catch (errorRes) {
            const error = errorRes.data;
            message.error(error.errorMessage);
          }
        }
      })
      .catch(() => {
        message.error("Please complete all required fields before submitting");
      });
  };

  const handleModalCancel = () => {
    form.resetFields();
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
        open={isModalVisible}
        onCancel={handleModalCancel}
        width="90vw"
        style={{ maxWidth: "1200px", top: 20 }}
        maskClosable={false}
        confirmLoading={isCreating || isUpdating}
        centered={false}
        footer={null}
        forceRender
      >
        {isModalVisible && (
          <ProductForm
            defaultValues={isUpdate ? {} : defaultValues}
            form={form}
            isLoading={isCreating || isUpdating}
            onSubmit={handleModalOk}
            title={isUpdate ? "Edit Product" : "Create New Product"}
          />
        )}
      </Modal>
    </>
  );
};

ManageProduct.propTypes = {
  operation: PropTypes.oneOf(["CREATE", "UPDATE"]),
  product: PropTypes.object,
};

export default ManageProduct;
