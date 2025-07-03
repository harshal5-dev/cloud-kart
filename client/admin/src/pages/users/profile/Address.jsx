import { useState } from "react";
import {
  App,
  Avatar,
  Button,
  Card,
  Checkbox,
  Col,
  Empty,
  Form,
  Input,
  List,
  Modal,
  Result,
  Row,
  Select,
  Space,
  Spin,
  Tag,
  Typography,
} from "antd";
import {
  EnvironmentOutlined,
  HomeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  FaBuilding,
  FaCity,
  FaMoneyBillWave,
  FaPencilAlt,
  FaPhoneAlt,
  FaSave,
  FaShippingFast,
  FaStreetView,
} from "react-icons/fa";
import { MdOutlineAddHomeWork, MdRealEstateAgent } from "react-icons/md";
import { FaEarthAsia, FaSignsPost } from "react-icons/fa6";

import {
  useCreateUserAddressMutation,
  useGetUserAddressesQuery,
  useUpdateUserAddressMutation,
} from "../addressApi";
import { cssVariables } from "../../../config/themeConfig";
import DeleteAddress from "./DeleteAddress";

const { Text } = Typography;
const { Option } = Select;

const customizeRequiredMark = (label, { required }) => (
  <Text>
    {required ? (
      <Tag color="error">Required</Tag>
    ) : (
      <Tag color="warning">optional</Tag>
    )}
    {label}
  </Text>
);

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
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            addressType: "HOME",
            country: "India",
            streetAddress: "",
            city: "",
            state: "",
            postalCode: "",
            phoneNumber: null,
            isDefault: "",
          }}
          requiredMark={customizeRequiredMark}
        >
          <Form.Item
            label="Address Type"
            name="addressType"
            rules={[{ required: true, message: "Please select address type" }]}
            hasFeedback
          >
            <Select
              placeholder="Select address type"
              loading={isAddressCreating || isAddressUpdating}
            >
              {addressTypes.map((type) => (
                <Option key={type.value} value={type.value}>
                  <Space>
                    {type.icon}
                    {type.label}
                  </Space>
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              {
                pattern: /^\+?[0-9\s-]+$/,
                message: "Please enter a valid phone number",
              },
            ]}
            hasFeedback
          >
            <Input
              placeholder="e.g. 9665230906"
              prefix={<FaPhoneAlt />}
              suffix={
                (isAddressCreating || isAddressUpdating) && <LoadingOutlined />
              }
              disabled={isAddressCreating || isAddressUpdating}
            />
          </Form.Item>

          <Form.Item
            label="Street Address"
            name="streetAddress"
            rules={[{ required: true, message: "Please enter street address" }]}
            hasFeedback
          >
            <Input
              placeholder="Enter street address"
              prefix={<FaStreetView />}
              suffix={
                (isAddressCreating || isAddressUpdating) && <LoadingOutlined />
              }
              disabled={isAddressCreating || isAddressUpdating}
            />
          </Form.Item>

          <Row gutter={24}>
            <Col span={24} xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: "Please enter city" }]}
                hasFeedback
              >
                <Input
                  placeholder="Enter city"
                  prefix={<FaCity />}
                  suffix={
                    (isAddressCreating || isAddressUpdating) && (
                      <LoadingOutlined />
                    )
                  }
                  disabled={isAddressCreating || isAddressUpdating}
                />
              </Form.Item>
            </Col>
            <Col span={24} xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                label="State"
                name="state"
                rules={[{ required: true, message: "Please enter state" }]}
                hasFeedback
              >
                <Input
                  placeholder="Enter state"
                  prefix={<MdRealEstateAgent />}
                  suffix={
                    (isAddressCreating || isAddressUpdating) && (
                      <LoadingOutlined />
                    )
                  }
                  disabled={isAddressCreating || isAddressUpdating}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24} xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                label="Postal Code"
                name="postalCode"
                rules={[
                  { required: true, message: "Please enter Postal code" },
                ]}
                hasFeedback
              >
                <Input
                  placeholder="Enter Postal code"
                  prefix={<FaSignsPost />}
                  suffix={
                    (isAddressCreating || isAddressUpdating) && (
                      <LoadingOutlined />
                    )
                  }
                  disabled={isAddressCreating || isAddressUpdating}
                />
              </Form.Item>
            </Col>
            <Col span={24} xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                label="Country"
                name="country"
                rules={[{ required: true, message: "Please enter country" }]}
                hasFeedback
              >
                <Input
                  placeholder="Enter country"
                  prefix={<FaEarthAsia />}
                  suffix={
                    (isAddressCreating || isAddressUpdating) && (
                      <LoadingOutlined />
                    )
                  }
                  disabled={isAddressCreating || isAddressUpdating}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="isDefault" valuePropName="checked">
            <Checkbox>Set as default address</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Address;
