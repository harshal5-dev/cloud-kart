import { useState } from "react";
import PropTypes from "prop-types";
import { App, Button, Form, Modal } from "antd";
import { BsPersonAdd } from "react-icons/bs";
import { FaPencilAlt, FaSave } from "react-icons/fa";

import { useCreateUserMutation, useUpdateUserMutation } from "../adminApi";
import UserForm from "./UserForm";

const ManageUser = ({ operation, user }) => {
  const isUpdate = operation === "UPDATE";
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { message } = App.useApp();
  let defaultValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    username: "",
    email: "",
    roles: [],
  };

  const [createCreate, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const handleAddUser = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditUser = (user) => {
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        if (user) {
          if (!form.isFieldsTouched()) {
            message.warning("No changes made to the user");
            setIsModalVisible(false);
            return;
          }

          const payload = {
            user: values,
            id: user.keycloakId,
          };

          try {
            await updateUser(payload).unwrap();
            setIsModalVisible(false);
            message.success("User updated successfully");
          } catch (error) {
            const { errorMessage } = error;
            message.error(errorMessage);
          }
        } else {
          const payload = {
            ...values,
          };
          try {
            await createCreate(payload).unwrap();
            setIsModalVisible(false);
            message.success("User created successfully");
          } catch (error) {
            const { errorMessage } = error;
            message.error(errorMessage);
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
          onClick={() => handleEditUser(user)}
        />
      ) : (
        <Button
          type="primary"
          className="ml-auto"
          icon={<BsPersonAdd />}
          onClick={handleAddUser}
        >
          Add User
        </Button>
      )}
      {/* Modal for adding/editing user */}
      <Modal
        title={isUpdate ? "Edit User" : "Add New User"}
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
        <UserForm
          form={form}
          defaultValues={defaultValues}
          isLoading={isCreating || isUpdating}
          isUpdate={isUpdate}
        />
      </Modal>
    </>
  );
};

ManageUser.propTypes = {
  operation: PropTypes.oneOf(["CREATE", "UPDATE"]),
  user: PropTypes.object,
};

export default ManageUser;
