import { useState } from "react";
import PropTypes from "prop-types";
import { App, Button, Form, Modal } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { FaPencilAlt, FaSave } from "react-icons/fa";

import { useCreateUserMutation, useUpdateUserMutation } from "../adminApi";
import UserForm from "./UserForm";
import { cssVariables } from "../../../config/themeConfig";

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
    profilePictureUrl: "",
    isActive: "INACTIVE",
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
          icon={<FaPencilAlt />}
          variant="text"
          shape="circle"
          color="green"
          onClick={() => handleEditUser(user)}
        />
      ) : (
        <Button
          icon={<UserAddOutlined />}
          onClick={handleAddUser}
          style={{
            background: cssVariables.whiteTransparent25,
            border: `1px solid ${cssVariables.whiteTransparent40}`,
            color: cssVariables.colorWhite,
          }}
        >
          Add User
        </Button>
      )}
      {/* Enhanced Modal for adding/editing user */}
      <Modal
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Save"
        okButtonProps={{
          icon: <FaSave />,
        }}
        maskClosable={false}
        confirmLoading={isCreating || isUpdating}
        width="95%"
        style={{ maxWidth: 655 }}
        centered
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
