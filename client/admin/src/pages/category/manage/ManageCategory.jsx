import { useState } from "react";
import PropTypes from "prop-types";
import { App, Button, Form, Modal } from "antd";
import { FiPlusCircle } from "react-icons/fi";
import { FaPencilAlt, FaSave } from "react-icons/fa";

import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../categoryApi";
import CategoryForm from "./CategoryForm";

const ManageCategory = ({ operation, category }) => {
  const isUpdate = operation === "UPDATE";
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { message } = App.useApp();
  let defaultValues = {
    name: "",
    description: null,
    slug: "",
    imageUrl: null,
  };

  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  const handleAddCategory = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditCategory = (category) => {
    form.setFieldsValue(category);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        if (category) {
          if (!form.isFieldsTouched()) {
            message.warning("No changes made to the user");
            setIsModalVisible(false);
            return;
          }

          try {
            const payload = {
              curSlug: category.slug,
              ...values,
            };
            const res = await updateCategory(payload).unwrap();
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
            const res = await createCategory(payload).unwrap();
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
          onClick={() => handleEditCategory(category)}
        />
      ) : (
        <Button
          type="primary"
          className="ml-auto"
          icon={<FiPlusCircle />}
          onClick={handleAddCategory}
        >
          Category
        </Button>
      )}
      {/* Modal for adding/editing category */}
      <Modal
        title={isUpdate ? "Edit Category" : "Add New Category"}
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
        <CategoryForm
          form={form}
          defaultValues={defaultValues}
          isLoading={isCreating || isUpdating}
        />
      </Modal>
    </>
  );
};

ManageCategory.propTypes = {
  operation: PropTypes.oneOf(["CREATE", "UPDATE"]),
  category: PropTypes.object,
};

export default ManageCategory;
