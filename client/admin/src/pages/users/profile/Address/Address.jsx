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
} from "antd";
import { EnvironmentOutlined, HomeOutlined } from "@ant-design/icons";
import {
  FaBuilding,
  FaMoneyBillWave,
  FaPencilAlt,
  FaSave,
  FaShippingFast,
} from "react-icons/fa";
import { MdOutlineAddHomeWork } from "react-icons/md";

import {
  useCreateUserAddressMutation,
  useGetUserAddressesQuery,
  useUpdateUserAddressMutation,
} from "../../addressApi";
import { cssVariables } from "../../../../config/themeConfig";
import DeleteAddress from "./DeleteAddress";
import AddressForm from "./AddressForm";

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
    { value: "HOME", label: "Home", icon: <HomeOutlined /> },
    { value: "OFFICE", label: "Office", icon: <FaBuilding /> },
    { value: "SHIPPING", label: "Shipping", icon: <FaShippingFast /> },
    { value: "BILLING", label: "Billing", icon: <FaMoneyBillWave /> },
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
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" fullscreen tip="Loading user profile..." />
      </div>
    );
  }

  return (
    <Card
      title="Addresses"
      extra={
        <Button
          type="primary"
          icon={<MdOutlineAddHomeWork />}
          onClick={handleAddAddress}
        >
          Add Address
        </Button>
      }
    >
      <List
        dataSource={userAddresses}
        locale={{
          emptyText: isError ? (
            <Result
              status="error"
              title="An error occurred"
              subTitle="Failed to fetch addresses, please try again"
            />
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_DEFAULT}
              description="No Addresses found"
            />
          ),
        }}
        renderItem={(address) => (
          <List.Item
            actions={[
              <Button
                variant="text"
                shape="circle"
                color="gold"
                icon={<FaPencilAlt />}
                onClick={() => handleEditAddress(address)}
              />,

              <DeleteAddress userId={userId} id={address.id} />,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  size={40}
                  style={{ backgroundColor: cssVariables.colorSecondary }}
                  icon={getAddressIcon(address.addressType)}
                />
              }
              title={
                <Space>
                  <span className="capitalize">{address.addressType}</span>
                  {address.isDefault && <Tag color="orange">Default</Tag>}
                </Space>
              }
              description={
                <div>
                  <div>{address.streetAddress}</div>
                  <div>
                    {address.city}, {address.state} {address.postalCode}
                  </div>
                  <div>{address.country}</div>
                </div>
              }
            />
          </List.Item>
        )}
      />

      {/* Modal for adding/editing address */}
      <Modal
        title={selectedAddressId ? "Edit Address" : "Add New Address"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
        okText="Save"
        okButtonProps={{
          icon: <FaSave />,
        }}
        maskClosable={false}
        confirmLoading={isAddressCreating || isAddressUpdating}
      >
        <AddressForm
          form={form}
          isLoading={isAddressCreating || isAddressUpdating}
          addressTypes={addressTypes}
        />
      </Modal>
    </Card>
  );
};

Address.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default Address;
