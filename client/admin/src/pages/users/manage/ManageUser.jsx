import { useState } from "react";
import PropTypes from "prop-types";
import { App, Button, Form, Modal, theme } from "antd";
import { UserAddOutlined, EditOutlined } from "@ant-design/icons";

import { useCreateUserMutation, useUpdateUserMutation } from "../adminApi";
import UserForm from "./UserForm";
import { cssVariables } from "../../../config/themeConfig";

const ManageUser = ({ operation, user }) => {
  const { token } = theme.useToken();
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
          type="text"
          shape="circle"
          size="small"
          icon={<EditOutlined />}
          onClick={() => handleEditUser(user)}
          style={{
            color: cssVariables.colorSecondary,
            border: `1px solid ${cssVariables.colorSecondary}30`,
            background:
              token.colorBgBase === "#000000" || token.colorBgBase === "#141414"
                ? `${cssVariables.colorSecondary}10`
                : `${cssVariables.colorSecondary}05`,
          }}
        />
      ) : (
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          onClick={handleAddUser}
          size="large"
          style={{
            height: 40,
            borderRadius: 8,
            background: cssVariables.colorPrimary,
            border: "none",
            boxShadow:
              token.colorBgBase === "#000000" || token.colorBgBase === "#141414"
                ? "0 6px 20px rgba(22, 119, 255, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3)"
                : "0 2px 8px rgba(22, 119, 255, 0.3)",
            fontWeight: 600,
          }}
        >
          Add User
        </Button>
      )}
      {/* Enhanced Modal for adding/editing user */}
      <Modal
        title={
          <div
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: token.colorText,
              padding: "8px 0",
            }}
          >
            {isUpdate ? "Edit User Profile" : "Add New User"}
          </div>
        }
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={650}
        centered
        okText={isUpdate ? "Update User" : "Create User"}
        okButtonProps={{
          icon: isUpdate ? <EditOutlined /> : <UserAddOutlined />,
          style: {
            background: cssVariables.colorPrimary,
            border: "none",
            height: 40,
            borderRadius: 8,
            fontWeight: 600,
          },
        }}
        cancelButtonProps={{
          style: {
            height: 40,
            borderRadius: 8,
          },
        }}
        maskClosable={false}
        confirmLoading={isCreating || isUpdating}
        styles={{
          body: {
            padding: "24px",
            maxHeight: "70vh",
            overflowY: "auto",
          },
          header: {
            borderBottom: `1px solid ${token.colorBorder}`,
            paddingBottom: "16px",
            marginBottom: 0,
          },
          footer: {
            borderTop: `1px solid ${token.colorBorder}`,
            paddingTop: "16px",
          },
        }}
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
