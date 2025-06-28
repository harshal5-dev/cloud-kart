import { useState } from "react";
import PropTypes from "prop-types";
import { App, Button, Popconfirm } from "antd";
import { FaTrashAlt } from "react-icons/fa";

import { useDeleteCategoryMutation } from "../categoryApi";

const DeleteCategory = ({ slug }) => {
  const [open, setOpen] = useState(false);

  const { notification } = App.useApp();

  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();

  async function handleOnDelete() {
    try {
      const res = await deleteCategory(slug).unwrap();
      notification.success({
        message: "Success",
        description: res?.statusMessage,
      });
    } catch (errorRes) {
      const error = errorRes.data;
      notification.error({
        message: "Error",
        description: error.errorMessage,
      });
    } finally {
      setOpen(false);
    }
  }

  return (
    <Popconfirm
      open={open}
      title="Delete Category?"
      description="Are you sure to delete this category?"
      okText="Yes"
      cancelText="No"
      placement="topLeft"
      onCancel={() => setOpen(false)}
      onConfirm={() => handleOnDelete()}
      okButtonProps={{
        loading: isLoading,
      }}
      cancelButtonProps={{
        disabled: isLoading,
      }}
    >
      <Button
        type="text"
        icon={<FaTrashAlt />}
        danger
        shape="circle"
        onClick={() => setOpen(true)}
      />
    </Popconfirm>
  );
};

DeleteCategory.propTypes = {
  categoryId: PropTypes.string.isRequired,
};

export default DeleteCategory;
