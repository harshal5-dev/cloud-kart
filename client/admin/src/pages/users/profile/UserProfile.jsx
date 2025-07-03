import { useState } from "react";
import {
  Card,
  Avatar,
  Tag,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Space,
  Descriptions,
  Typography,
  Spin,
  App,
} from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { FaSave } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";

import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "../usersApi";
import Address from "./Address/Address";
import { getRoleColor, isEmpty } from "../../../lib/utils";
import UserProfileForm from "./UserProfileForm";

const { Title, Text } = Typography;

const UserProfile = () => {
  const userResponse = useGetUserProfileQuery();
  const { data: userProfile, isLoading } = userResponse;
  const [updateUserProfile, { isLoading: isEditProfileLoading }] =
    useUpdateUserProfileMutation();

  const [form] = Form.useForm();
  const { message } = App.useApp();

  const [isEditProfileModal, setIsEditProfileModal] = useState(false);

  const handleEditProfile = () => {
    form.setFieldsValue({
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      phoneNumber: userProfile.phoneNumber,
    });
    setIsEditProfileModal(true);
  };

  const handleEditProfileCancel = () => {
    setIsEditProfileModal(false);
  };

  const handleEditProfileOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        if (!form.isFieldsTouched()) {
          message.warning("No changes made to the profile");
          setIsEditProfileModal(false);
          return;
        }

        try {
          await updateUserProfile({
            id: userProfile.keycloakId,
            user: values,
          }).unwrap();
          setIsEditProfileModal(false);
          message.success("Profile updated successfully");
        } catch {
          message.error("Failed to update profile");
        }
      })
      .catch(() => {
        message.error("Please fix the errors in the form");
      });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" fullscreen tip="Loading user profile..." />
      </div>
    );
  } else if (isEmpty(userProfile)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Text type="danger">User profile not found</Text>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <Row gutter={[24, 24]}>
        {/* Profile Header */}
        <Col span={24}>
          <Card>
            <Row align="middle">
              <Col>
                <Avatar
                  size={120}
                  src="assets/images/user.svg"
                  icon={<UserOutlined />}
                />
              </Col>
              <Col flex="1" className="ml-4">
                <Title level={2} style={{ margin: 0 }} className="capitalize">
                  {userProfile.firstName} {userProfile.lastName}
                </Title>
                <Text type="secondary" className="text-lg">
                  {userProfile.username}
                </Text>
                <div className="mt-2">
                  {userProfile.roles.map((role) => (
                    <Tag key={role} color={getRoleColor(role)} className="mr-2">
                      {role}
                    </Tag>
                  ))}
                </div>
                <div className="mt-4">
                  <Space>
                    <Button
                      type="primary"
                      icon={<GrEdit />}
                      onClick={handleEditProfile}
                    >
                      Edit Profile
                    </Button>
                  </Space>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Contact Information */}
        <Col span={24}>
          <Card title="Contact Information">
            <Descriptions
              column={{ xs: 1, sm: 1, md: 2, xl: 2, xxl: 2 }}
              bordered
            >
              <Descriptions.Item
                label={
                  <Space>
                    <MailOutlined />
                    Email
                  </Space>
                }
              >
                {userProfile.email}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <Space>
                    <PhoneOutlined />
                    Phone Number
                  </Space>
                }
              >
                {userProfile.phoneNumber}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <Space>
                    <UserOutlined />
                    Username
                  </Space>
                }
              >
                {userProfile.username}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Addresses */}
        <Col span={24}>
          <Address userId={userProfile.id} />
        </Col>
      </Row>

      {/* Edit Profile Modal */}
      <Modal
        title="Edit Profile"
        open={isEditProfileModal}
        onOk={handleEditProfileOk}
        okText="Save"
        onCancel={handleEditProfileCancel}
        confirmLoading={isEditProfileLoading}
        okButtonProps={{
          icon: <FaSave />,
        }}
        width={500}
        maskClosable={false}
      >
        <UserProfileForm
          form={form}
          isEditProfileLoading={isEditProfileLoading}
        />
      </Modal>
    </div>
  );
};

export default UserProfile;
