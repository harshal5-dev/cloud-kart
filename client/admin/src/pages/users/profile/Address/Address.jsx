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
  Space,
  Spin,
  Tag,
  Typography,
  Flex,
  Badge,
  Divider,
} from "antd";
import {
  EnvironmentOutlined,
  HomeOutlined,
  PlusOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  FaBuilding,
  FaMoneyBillWave,
  FaPencilAlt,
  FaSave,
  FaShippingFast,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdOutlineAddHomeWork, MdLocationOn } from "react-icons/md";

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
            size="small"
            style={{
              backgroundColor: cssVariables.colorPrimary + "15",
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
      styles={{ body: { padding: "20px" } }}
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
                padding: "16px",
                marginBottom: "12px",
                background: cssVariables.colorWhite,
                border: `1px solid ${typeColor}20`,
                borderRadius: 10,
                boxShadow: cssVariables.boxShadowLight,
                transition: "all 0.3s ease",
              }}
              actions={[
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => handleEditAddress(address)}
                  style={{
                    color: cssVariables.colorTitle,
                    borderRadius: 6,
                  }}
                />,
                <DeleteAddress userId={userId} id={address.id} />,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    size={40}
                    style={{
                      backgroundColor: typeBgColor,
                      color: typeColor,
                      border: `2px solid ${typeColor}30`,
                    }}
                    icon={getAddressIcon(address.addressType)}
                  />
                }
                title={
                  <Flex align="center" gap={10}>
                    <Text
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: cssVariables.colorPrimary,
                        textTransform: "capitalize",
                      }}
                    >
                      {address.addressType.toLowerCase()} Address
                    </Text>
                    {address.isDefault && (
                      <Badge
                        status="success"
                        text={
                          <Tag
                            style={{
                              background: cssVariables.colorSecondary + "15",
                              color: cssVariables.colorSecondary,
                              border: "none",
                              borderRadius: 16,
                              padding: "2px 8px",
                              fontSize: "11px",
                              fontWeight: 500,
                            }}
                          >
                            Default
                          </Tag>
                        }
                      />
                    )}
                  </Flex>
                }
                description={
                  <Flex vertical gap={8} style={{ marginTop: 8 }}>
                    <Flex align="center" gap={8}>
                      <FaMapMarkerAlt
                        style={{ color: typeColor, fontSize: "14px" }}
                      />
                      <Text
                        style={{
                          fontSize: "15px",
                          color: cssVariables.colorPrimary,
                        }}
                      >
                        {address.streetAddress}
                      </Text>
                    </Flex>

                    <Text
                      style={{
                        fontSize: "14px",
                        color: "#666",
                        marginLeft: 22,
                      }}
                    >
                      {address.city}, {address.state} {address.postalCode}
                    </Text>

                    <Text
                      style={{
                        fontSize: "14px",
                        color: "#666",
                        marginLeft: 22,
                      }}
                    >
                      {address.country}
                    </Text>

                    {address.phoneNumber && (
                      <Flex align="center" gap={8} style={{ marginTop: 4 }}>
                        <Avatar
                          size={16}
                          style={{
                            backgroundColor: cssVariables.colorTitle + "15",
                            color: cssVariables.colorTitle,
                            fontSize: "10px",
                          }}
                          icon="📞"
                        />
                        <Text
                          style={{
                            fontSize: "14px",
                            color: cssVariables.colorTitle,
                          }}
                        >
                          {address.phoneNumber}
                        </Text>
                      </Flex>
                    )}
                  </Flex>
                }
              />
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
