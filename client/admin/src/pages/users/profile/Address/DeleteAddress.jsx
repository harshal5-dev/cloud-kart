import { useState } from "react";
import PropTypes from "prop-types";
import { App, Button, Popconfirm } from "antd";
import { FaTrashAlt } from "react-icons/fa";

import { useDeleteUserAddressMutation } from "../../addressApi";

const DeleteAddress = ({ userId, id }) => {
  const [open, setOpen] = useState(false);

  const { message } = App.useApp();

  const [deleteUserAddress, { isLoading }] = useDeleteUserAddressMutation();

  async function handleOnDelete() {
    try {
      const res = await deleteUserAddress({ userId, id }).unwrap();
      message.success(res?.statusMessage);
    } catch (errorRes) {
      const error = errorRes.data;
      message.error(error.errorMessage);
    } finally {
      setOpen(false);
    }
  }

  return (
    <Popconfirm
      open={open}
      title="Delete Address?"
      description="Are you sure to delete this Address?"
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

DeleteAddress.propTypes = {
  userId: PropTypes.string,
  id: PropTypes.string,
};

export default DeleteAddress;
