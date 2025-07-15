import { useState } from "react";
import PropTypes from "prop-types";
import {
  App,
  Avatar,
  Button,
  Card,
  Empty,
  Form,
  List,
  Modal,
  Result,
  Spin,
  Tag,
  Typography,
  Flex,
} from "antd";
import {
  EnvironmentOutlined,
  HomeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  FaBuilding,
  FaMoneyBillWave,
  FaSave,
  FaShippingFast,
  FaMapMarkerAlt,
  FaPhone,
  FaPencilAlt,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

import {
  useCreateUserAddressMutation,
  useGetUserAddressesQuery,
  useUpdateUserAddressMutation,
} from "../../addressApi";
import { cssVariables } from "../../../../config/themeConfig";
import DeleteAddress from "./DeleteAddress";
import AddressForm from "./AddressForm";

const { Title, Text } = Typography;

const Address = ({ userId }) => {
  const addressResponse = useGetUserAddressesQuery(userId);
  const { data: userAddresses, isLoading, isError } = addressResponse;
  const [createUserAddress, { isLoading: isAddressCreating }] =
    useCreateUserAddressMutation();
  const [updateUserAddress, { isLoading: isAddressUpdating }] =
    useUpdateUserAddressMutation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const [form] = Form.useForm();
  const { message } = App.useApp();

  const addressTypes = [
    {
      value: "HOME",
      label: "Home",
      icon: <HomeOutlined />,
      color: cssVariables.colorSecondary,
      bgColor: cssVariables.colorSecondary + "15",
    },
    {
      value: "OFFICE",
      label: "Office",
      icon: <FaBuilding />,
      color: cssVariables.colorPrimary,
      bgColor: cssVariables.colorPrimary + "15",
    },
    {
      value: "SHIPPING",
      label: "Shipping",
      icon: <FaShippingFast />,
      color: cssVariables.colorTitle,
      bgColor: cssVariables.colorTitle + "15",
    },
    {
      value: "BILLING",
      label: "Billing",
      icon: <FaMoneyBillWave />,
      color: cssVariables.colorOrange,
      bgColor: cssVariables.colorOrange + "15",
    },
  ];

  const handleAddAddress = () => {
    form.resetFields();
    setSelectedAddressId(null);
    setIsModalVisible(true);
  };

  const handleEditAddress = (address) => {
    form.setFieldsValue(address);
    setSelectedAddressId(address.id);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        if (selectedAddressId) {
          if (!form.isFieldsTouched()) {
            message.warning("No changes made to the address");
            setIsModalVisible(false);
            return;
          }
          const payload = {
            address: values,
            id: selectedAddressId,
            userId,
          };

          try {
            await updateUserAddress(payload).unwrap();
            setIsModalVisible(false);
            message.success("Address updated successfully");
          } catch {
            message.error("Failed to update address");
          }
        } else {
          const payload = {
            address: values,
            userId,
          };
          try {
            await createUserAddress(payload).unwrap();
            setIsModalVisible(false);
            message.success("Address created successfully");
          } catch {
            message.error("Failed to create address");
          }
        }
      })
      .catch(() => {
        message.error("Please fill in all required fields");
      });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedAddressId(null);
  };

  const getAddressIcon = (type) => {
    const addressType = addressTypes.find((t) => t.value === type);
    return addressType ? addressType.icon : <EnvironmentOutlined />;
  };

  if (isLoading) {
    return (
      <Card
        style={{
          borderRadius: 12,
          border: `1px solid ${cssVariables.colorPrimary}20`,
          boxShadow: cssVariables.boxShadowLight,
        }}
        styles={{ body: { padding: "40px", textAlign: "center" } }}
      >
        <Spin size="large" />
        <Title
          level={4}
          style={{ marginTop: 16, color: cssVariables.colorPrimary }}
        >
          Loading Addresses...
        </Title>
        <Text type="secondary">Please wait while we fetch your addresses</Text>
      </Card>
    );
  }

  return (
    <Card
      title={
        <Flex align="center" gap={8}>
          <Avatar
            style={{
              backgroundColor: cssVariables.colorPrimary + "55",
              color: cssVariables.colorPrimary,
            }}
            icon={<MdLocationOn />}
          />
          <Title
            level={5}
            style={{ margin: 0, color: cssVariables.colorPrimary }}
          >
            Addresses
          </Title>
        </Flex>
      }
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddAddress}
        >
          Add Address
        </Button>
      }
      style={{
        borderRadius: 10,
        border: `1px solid ${cssVariables.colorPrimary}20`,
        boxShadow: cssVariables.boxShadowLight,
      }}
      styles={{ body: { padding: "16px" } }}
    >
      <List
        dataSource={userAddresses}
        locale={{
          emptyText: isError ? (
            <Result
              status="error"
              title="An error occurred"
              subTitle="Failed to fetch addresses, please try again"
              extra={
                <Button
                  type="primary"
                  onClick={() => window.location.reload()}
                  style={{
                    borderRadius: 8,
                    background: cssVariables.colorPrimary,
                    borderColor: cssVariables.colorPrimary,
                  }}
                >
                  Retry
                </Button>
              }
            />
          ) : (
            <Empty
              image={
                <FaMapMarkerAlt
                  style={{
                    fontSize: "48px",
                    color: cssVariables.colorPrimary + "40",
                  }}
                />
              }
              description={
                <Flex vertical gap={6} align="center">
                  <Text
                    style={{
                      fontSize: "14px",
                      color: cssVariables.colorPrimary,
                    }}
                  >
                    No Addresses found
                  </Text>
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    Add your first address to get started
                  </Text>
                </Flex>
              }
              style={{ padding: "32px 0" }}
            />
          ),
        }}
        renderItem={(address) => {
          const addressType = addressTypes.find(
            (t) => t.value === address.addressType
          );
          const typeColor = addressType?.color || cssVariables.colorPrimary;
          const typeBgColor =
            addressType?.bgColor || cssVariables.colorPrimary + "15";

          return (
            <List.Item
              style={{
                padding: "12px",
                marginBottom: "8px",
                background: cssVariables.cardBackground,
                border: `1px solid ${cssVariables.cardBorder}`,
                borderRadius: 8,
                backdropFilter: "blur(12px)",
                boxShadow: cssVariables.cardShadow,
                transition: "all 0.3s ease",
                position: "relative",
              }}
            >
              <Flex
                justify="space-between"
                align="flex-start"
                style={{ width: "100%" }}
                wrap="wrap"
                gap={8}
              >
                {/* Left Content */}
                <Flex
                  align="flex-start"
                  gap={12}
                  style={{ flex: 1, minWidth: 0 }}
                >
                  <Avatar
                    size={32}
                    style={{
                      backgroundColor: typeBgColor,
                      color: typeColor,
                      border: `2px solid ${typeColor}30`,
                      flexShrink: 0,
                    }}
                    icon={getAddressIcon(address.addressType)}
                  />

                  <Flex vertical gap={6} style={{ flex: 1, minWidth: 0 }}>
                    {/* Address Type and Default Tag */}
                    <Flex align="center" gap={8} wrap="wrap">
                      <Text
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: cssVariables.textPrimary,
                          textTransform: "capitalize",
                        }}
                      >
                        {address.addressType.toLowerCase()} Address
                      </Text>
                      {address.isDefault && (
                        <Tag
                          style={{
                            background: cssVariables.colorSuccess + "15",
                            color: cssVariables.colorSuccess,
                            border: `1px solid ${cssVariables.colorSuccess}30`,
                            borderRadius: 12,
                            padding: "1px 6px",
                            fontSize: "10px",
                            fontWeight: 500,
                            margin: 0,
                          }}
                        >
                          Default
                        </Tag>
                      )}
                    </Flex>

                    {/* Address Details */}
                    <Flex vertical gap={3}>
                      <Flex align="flex-start" gap={6}>
                        <FaMapMarkerAlt
                          style={{
                            color: typeColor,
                            fontSize: "12px",
                            marginTop: "2px",
                            flexShrink: 0,
                          }}
                        />
                        <Text
                          style={{
                            fontSize: "13px",
                            fontWeight: 500,
                            lineHeight: "18px",
                            wordBreak: "break-word",
                          }}
                        >
                          {address.streetAddress}
                        </Text>
                      </Flex>

                      <Text
                        type="secondary"
                        style={{
                          fontSize: "12px",
                          marginLeft: 18,
                          lineHeight: "16px",
                        }}
                      >
                        {address.city}, {address.state} {address.postalCode}
                      </Text>

                      <Text
                        style={{
                          fontSize: "12px",
                          marginLeft: 18,
                          lineHeight: "16px",
                        }}
                        type="secondary"
                      >
                        {address.country}
                      </Text>

                      {address.phoneNumber && (
                        <Flex align="center" gap={6} style={{ marginLeft: 18 }}>
                          <Avatar
                            size={13}
                            style={{
                              backgroundColor: cssVariables.colorInfo + "15",
                              color: cssVariables.colorInfo,
                              fontSize: "15px",
                            }}
                            icon={<FaPhone />}
                          />
                          <Text
                            style={{
                              fontSize: "12px",
                              color: cssVariables.colorInfo,
                              fontWeight: 500,
                            }}
                          >
                            {address.phoneNumber}
                          </Text>
                        </Flex>
                      )}
                    </Flex>
                  </Flex>
                </Flex>

                {/* Right Actions */}
                <Flex gap={3} style={{ flexShrink: 0 }}>
                  <Button
                    icon={<FaPencilAlt />}
                    variant="text"
                    shape="circle"
                    color="gold"
                    onClick={() => handleEditAddress(address)}
                  />
                  <DeleteAddress userId={userId} id={address.id} />
                </Flex>
              </Flex>
            </List.Item>
          );
        }}
      />

      {/* Enhanced Modal for adding/editing address */}
      <Modal
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Save"
        okButtonProps={{
          icon: <FaSave />,
        }}
        maskClosable={false}
        confirmLoading={isAddressCreating || isAddressUpdating}
        width="95%"
        style={{ maxWidth: 655 }}
      >
        <AddressForm
          form={form}
          isLoading={isAddressCreating || isAddressUpdating}
          addressTypes={addressTypes}
          title={
            selectedAddressId
              ? "Update Address Information"
              : "Add Address Information"
          }
        />
      </Modal>
    </Card>
  );
};

Address.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default Address;
