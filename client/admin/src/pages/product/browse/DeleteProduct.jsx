import { useState } from "react";
import PropTypes from "prop-types";
import { App, Button, Popconfirm } from "antd";
import { FaTrashAlt } from "react-icons/fa";

import { useDeleteProductMutation } from "../productApi";

const DeleteProduct = ({ sku }) => {
  const [open, setOpen] = useState(false);

  const { notification } = App.useApp();

  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  async function handleOnDelete() {
    try {
      const res = await deleteProduct(sku).unwrap();
      notification.success({
        message: "Success",
        description: res.statusMessage,
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
      title="Delete Product?"
      description="Are you sure to delete this product?"
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

DeleteProduct.propTypes = {
  sku: PropTypes.string,
};

export default DeleteProduct;
