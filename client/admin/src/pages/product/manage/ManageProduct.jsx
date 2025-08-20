import { useState } from "react";
import PropTypes from "prop-types";
import { App, Button, Form, Modal } from "antd";
import { FaPencilAlt, FaSave } from "react-icons/fa";
import { IoBagAdd } from "react-icons/io5";

import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../productApi";
import ProductForm from "./ProductForm";
import { cssVariables } from "../../../config/themeConfig";

const ManageProduct = ({ operation, product }) => {
  const isUpdate = operation === "UPDATE";
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
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
    setCurrentStep(0);
  };

  const handleEditProduct = (product) => {
    setIsModalVisible(true);
    setCurrentStep(0);
    // Set form values for editing after modal is visible
    setTimeout(() => {
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
    }, 0);
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
          style={{
            background: cssVariables.whiteTransparent25,
            border: `1px solid ${cssVariables.whiteTransparent40}`,
            color: cssVariables.colorWhite,
          }}
          className="ml-auto"
          icon={<IoBagAdd />}
          onClick={handleAddProduct}
        >
          Product
        </Button>
      )}
      {/* Modal for adding/editing product */}
      <Modal
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
        maskClosable={false}
        confirmLoading={isCreating || isUpdating}
        width="95%"
        style={{ maxWidth: 1200 }}
        centered
      >
        <ProductForm
          defaultValues={isUpdate ? {} : defaultValues}
          form={form}
          isLoading={isCreating || isUpdating}
          isUpdate={isUpdate}
          onSubmit={handleModalOk}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
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
