import { useState } from "react";
import PropTypes from "prop-types";
import { App, Button, Popconfirm } from "antd";
import { FaTrashAlt } from "react-icons/fa";

import { useDeleteUserMutation } from "../adminApi";

const DeleteUser = ({ id }) => {
  const [open, setOpen] = useState(false);

  const { message } = App.useApp();

  const [deleteProduct, { isLoading }] = useDeleteUserMutation();

  async function handleOnDelete() {
    try {
      await deleteProduct(id).unwrap();
      message.success("User deleted successfully!");
    } catch (error) {
      const { errorMessage } = error;
      message.error(errorMessage);
    } finally {
      setOpen(false);
    }
  }

  return (
    <Popconfirm
      open={open}
      title="Delete User?"
      description="Are you sure to delete this user?"
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

DeleteUser.propTypes = {
  sku: PropTypes.string.isRequired,
};

export default DeleteUser;
