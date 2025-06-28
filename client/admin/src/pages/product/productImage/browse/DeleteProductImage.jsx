import { useState } from "react";
import PropTypes from "prop-types";
import { App, Button, Popconfirm } from "antd";
import { FaTrashAlt } from "react-icons/fa";

import { useDeleteProductImageMutation } from "../productImageApi";

const DeleteProductImage = ({ id, onDelete, productSku }) => {
  const [open, setOpen] = useState(false);

  const { notification } = App.useApp();

  const [deleteProductImage, { isLoading }] = useDeleteProductImageMutation();

  async function handleOnDelete(id) {
    try {
      const res = await deleteProductImage({ productSku, id }).unwrap();
      notification.success({
        message: "Success",
        description: res.statusMessage,
      });
      onDelete();
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
      title="Delete Product Image?"
      description="Are you sure to delete this product image?"
      okText="Yes"
      cancelText="No"
      placement="topLeft"
      onCancel={() => setOpen(false)}
      onConfirm={() => handleOnDelete(id)}
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

DeleteProductImage.propTypes = {
  id: PropTypes.string,
  productSku: PropTypes.string,
  onDelete: PropTypes.func,
};

export default DeleteProductImage;
