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
  Typography,
  Spin,
  App,
  Flex,
  Badge,
  Divider,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { FaSave, FaUser } from "react-icons/fa";

import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "../usersApi";
import Address from "./Address/Address";
import { isEmpty } from "../../../lib/utils";
import UserProfileForm from "./UserProfileForm";
import { cssVariables } from "../../../config/themeConfig";

const { Title, Text } = Typography;

const UserProfile = () => {
  const userResponse = useGetUserProfileQuery();
  const { data: userProfile, isLoading, refetch } = userResponse;
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
      <Flex
        justify="center"
        align="center"
        style={{
          height: "100vh",
          background: `linear-gradient(135deg, ${cssVariables.colorPrimary}10 0%, ${cssVariables.colorTitle}08 100%)`,
        }}
      >
        <Card
          style={{
            border: "none",
            boxShadow: cssVariables.boxShadowLight,
            background: cssVariables.colorWhite,
          }}
          styles={{ body: { padding: "20px", textAlign: "center" } }}
        >
          <Spin size="large" />
          <Title
            level={4}
            style={{ marginTop: 16, color: cssVariables.colorPrimary }}
          >
            Loading Profile...
          </Title>
          <Text type="secondary">
            Please wait while we fetch your profile information
          </Text>
        </Card>
      </Flex>
    );
  } else if (isEmpty(userProfile)) {
    return (
      <Flex
        justify="center"
        align="center"
        style={{
          height: "100vh",
          background: `linear-gradient(135deg, ${cssVariables.colorPrimary}10 0%, ${cssVariables.colorTitle}08 100%)`,
        }}
      >
        <Card
          style={{
            border: `1px solid ${cssVariables.colorPrimary}20`,
            boxShadow: cssVariables.boxShadowLight,
            background: cssVariables.colorWhite,
          }}
          styles={{ body: { padding: "40px", textAlign: "center" } }}
        >
          <Avatar
            size={64}
            style={{
              backgroundColor: cssVariables.colorPrimary + "15",
              color: cssVariables.colorPrimary,
              marginBottom: 16,
            }}
            icon={<UserOutlined />}
          />
          <Title
            level={4}
            style={{ color: cssVariables.colorError, margin: "16px 0 8px 0" }}
          >
            User profile not found
          </Title>
          <Text
            type="secondary"
            style={{ fontSize: "15px", display: "block", marginBottom: 24 }}
          >
            Please try refreshing the page or contact support if the problem
            persists.
          </Text>
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={refetch}
            style={{
              background: cssVariables.colorPrimary,
              borderColor: cssVariables.colorPrimary,
            }}
          >
            Reload Profile
          </Button>
        </Card>
      </Flex>
    );
  }

  return (
    <Flex vertical>
      <Row gutter={[16, 16]}>
        {/* Profile Header Card */}
        <Col span={24}>
          <Card
            size="small"
            style={{
              border: "none",
              background: `linear-gradient(135deg, ${cssVariables.colorPrimary} 0%, ${cssVariables.colorTitle} 100%)`,
              boxShadow: `0 8px 24px ${cssVariables.colorPrimary}15`,
              overflow: "hidden",
            }}
            styles={{ body: { padding: 0 } }}
          >
            <Flex
              style={{
                background: `linear-gradient(135deg, ${cssVariables.glassOverlay} 0%, ${cssVariables.glassOverlayLight} 100%)`,
                padding: "20px",
                backdropFilter: "blur(12px)",
              }}
            >
              <Flex align="center" gap={15} wrap="wrap">
                <Space direction="vertical" size={0} align="center">
                  <Avatar
                    size={80}
                    src="assets/images/user.svg"
                    icon={<UserOutlined />}
                    style={{
                      border: `3px solid ${cssVariables.whiteTransparent40}`,
                      boxShadow: cssVariables.boxShadowLight,
                    }}
                  />
                  <Badge
                    status="success"
                    style={{
                      position: "absolute",
                      bottom: 6,
                      right: 6,
                      transform: "scale(1.2)",
                    }}
                  />
                </Space>

                <Flex vertical gap={5} flex={1} style={{ minWidth: 200 }}>
                  <Flex align="center" gap={12} wrap="wrap">
                    <Title
                      level={3}
                      style={{
                        margin: 0,
                        color: cssVariables.colorWhite,
                        fontSize: "22px",
                        fontWeight: 600,
                        textShadow: cssVariables.textShadow,
                        textTransform: "capitalize",
                        lineHeight: "26px",
                      }}
                    >
                      {userProfile.firstName} {userProfile.lastName}
                    </Title>
                    <Space size={4} wrap>
                      {userProfile.roles.map((role) => (
                        <Tag
                          key={role}
                          style={{
                            background: cssVariables.whiteTransparent25,
                            color: cssVariables.colorWhite,
                            border: `1px solid ${cssVariables.whiteTransparent40}`,
                            borderRadius: 16,
                            padding: "2px 8px",
                            fontSize: "12px",
                            fontWeight: 500,
                            textShadow: cssVariables.textShadow,
                          }}
                        >
                          {role}
                        </Tag>
                      ))}
                    </Space>
                  </Flex>

                  <Text
                    style={{
                      color: cssVariables.whiteTransparent90,
                      fontSize: "15px",
                      fontWeight: 400,
                      textShadow: cssVariables.textShadow,
                    }}
                  >
                    @{userProfile.username}
                  </Text>

                  <Space size={8} style={{ marginTop: 8 }} wrap>
                    <Button
                      icon={<EditOutlined />}
                      onClick={handleEditProfile}
                      style={{
                        background: cssVariables.whiteTransparent25,
                        border: `1px solid ${cssVariables.whiteTransparent40}`,
                        color: cssVariables.colorWhite,

                        fontWeight: 500,
                      }}
                    >
                      Profile
                    </Button>
                    <Button
                      icon={<ReloadOutlined />}
                      onClick={refetch}
                      style={{
                        background: cssVariables.whiteTransparent25,
                        border: `1px solid ${cssVariables.whiteTransparent40}`,
                        color: cssVariables.colorWhite,
                      }}
                    >
                      Refresh
                    </Button>
                  </Space>
                </Flex>
              </Flex>
            </Flex>
          </Card>
        </Col>

        {/* Contact Information Card */}
        <Col xs={24} lg={16}>
          <Card
            title={
              <Flex align="center" gap={8}>
                <Avatar
                  size="small"
                  style={{
                    backgroundColor: cssVariables.colorPrimary + "15",
                    color: cssVariables.colorPrimary,
                  }}
                  icon={<MailOutlined />}
                />
                <Title
                  level={5}
                  style={{
                    margin: 0,
                    color: cssVariables.colorPrimary,
                    fontSize: "15px",
                  }}
                >
                  Contact Information
                </Title>
              </Flex>
            }
            style={{
              border: `1px solid ${cssVariables.colorPrimary}20`,
              boxShadow: cssVariables.boxShadowLight,
            }}
            styles={{ body: { padding: "16px" } }}
          >
            <Row gutter={[0, 12]}>
              <Col span={24}>
                <Flex
                  align="center"
                  gap={8}
                  style={{
                    padding: "8px 0",
                    borderBottom: `1px solid ${cssVariables.colorPrimary}10`,
                  }}
                >
                  <Avatar
                    size="small"
                    style={{
                      backgroundColor: cssVariables.colorSecondary + "15",
                      color: cssVariables.colorSecondary,
                    }}
                    icon={<MailOutlined />}
                  />
                  <Flex vertical gap={2}>
                    <Text
                      type="secondary"
                      style={{ fontSize: "11px", fontWeight: 500 }}
                    >
                      Email Address
                    </Text>
                    <Text
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "inherit",
                        wordBreak: "break-all",
                      }}
                    >
                      {userProfile.email}
                    </Text>
                  </Flex>
                </Flex>
              </Col>

              <Col span={24}>
                <Flex
                  align="center"
                  gap={8}
                  style={{
                    padding: "8px 0",
                    borderBottom: `1px solid ${cssVariables.colorPrimary}10`,
                  }}
                >
                  <Avatar
                    size="small"
                    style={{
                      backgroundColor: cssVariables.colorTitle + "15",
                      color: cssVariables.colorTitle,
                    }}
                    icon={<PhoneOutlined />}
                  />
                  <Flex vertical gap={2}>
                    <Text
                      type="secondary"
                      style={{ fontSize: "11px", fontWeight: 500 }}
                    >
                      Phone Number
                    </Text>
                    <Text
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "inherit",
                      }}
                    >
                      {userProfile.phoneNumber || "Not provided"}
                    </Text>
                  </Flex>
                </Flex>
              </Col>

              <Col span={24}>
                <Flex align="center" gap={8} style={{ padding: "8px 0" }}>
                  <Avatar
                    size="small"
                    style={{
                      backgroundColor: cssVariables.colorOrange + "15",
                      color: cssVariables.colorOrange,
                    }}
                    icon={<UserOutlined />}
                  />
                  <Flex vertical gap={2}>
                    <Text
                      type="secondary"
                      style={{ fontSize: "11px", fontWeight: 500 }}
                    >
                      Username
                    </Text>
                    <Text
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "inherit",
                      }}
                    >
                      @{userProfile.username}
                    </Text>
                  </Flex>
                </Flex>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Quick Stats Card */}
        <Col xs={24} lg={8}>
          <Card
            title={
              <Flex align="center" gap={8}>
                <Avatar
                  size="small"
                  style={{
                    backgroundColor: cssVariables.colorSecondary + "15",
                    color: cssVariables.colorSecondary,
                  }}
                  icon={<FaUser />}
                />
                <Title
                  level={5}
                  style={{
                    margin: 0,
                    color: cssVariables.colorSecondary,
                    fontSize: "15px",
                  }}
                >
                  Account Status
                </Title>
              </Flex>
            }
            style={{
              border: `1px solid ${cssVariables.colorSecondary}20`,
              boxShadow: cssVariables.boxShadowLight,
            }}
            styles={{ body: { padding: "16px" } }}
          >
            <Flex vertical gap={8}>
              <Flex justify="space-between" align="center">
                <Text style={{ fontSize: "13px", color: "inherit" }}>
                  Profile Status
                </Text>
                <Badge
                  status="success"
                  text={
                    <Text
                      style={{
                        color: cssVariables.colorSecondary,
                        fontWeight: 500,
                        fontSize: "12px",
                      }}
                    >
                      Active
                    </Text>
                  }
                />
              </Flex>

              <Divider
                style={{
                  margin: "2px 0",
                  borderColor: cssVariables.colorSecondary + "20",
                }}
              />

              <Flex justify="space-between" align="center">
                <Text style={{ fontSize: "13px", color: "inherit" }}>
                  Account Type
                </Text>
                <Tag
                  style={{
                    background: cssVariables.colorTitle + "15",
                    color: cssVariables.colorTitle,
                    border: "none",
                    borderRadius: 12,
                    padding: "1px 6px",
                    fontSize: "11px",
                  }}
                >
                  Administrator
                </Tag>
              </Flex>

              <Divider
                style={{
                  margin: "2px 0",
                  borderColor: cssVariables.colorSecondary + "20",
                }}
              />

              <Flex justify="space-between" align="center">
                <Text style={{ fontSize: "13px", color: "inherit" }}>
                  Roles
                </Text>
                <Text
                  style={{
                    color: cssVariables.colorSecondary,
                    fontWeight: 500,
                    fontSize: "12px",
                  }}
                >
                  {userProfile.roles.length} role
                  {userProfile.roles.length !== 1 ? "s" : ""}
                </Text>
              </Flex>
            </Flex>
          </Card>
        </Col>

        {/* Addresses Section */}
        <Col span={24}>
          <Address userId={userProfile.id} />
        </Col>
      </Row>

      {/* Enhanced Edit Profile Modal */}
      <Modal
        open={isEditProfileModal}
        onOk={handleEditProfileOk}
        okText="Save"
        onCancel={handleEditProfileCancel}
        confirmLoading={isEditProfileLoading}
        okButtonProps={{
          icon: <FaSave />,
        }}
        width="95%"
        style={{ maxWidth: 655 }}
        maskClosable={false}
        styles={{
          body: {
            padding: 0,
          },
        }}
        centered
      >
        <UserProfileForm
          form={form}
          isEditProfileLoading={isEditProfileLoading}
        />
      </Modal>
    </Flex>
  );
};

export default UserProfile;
