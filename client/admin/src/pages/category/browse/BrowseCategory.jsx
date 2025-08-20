import PropTypes from "prop-types";
import {
  Card,
  Empty,
  Result,
  Space,
  Table,
  Tag,
  Avatar,
  Typography,
  Flex,
  Button,
  Tooltip,
} from "antd";
import {
  FolderOutlined,
  SettingOutlined,
  TagOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

import DeleteCategory from "./DeleteCategory";
import { getRandomTagColor } from "../../../lib/utils";
import ManageCategory from "../manage/ManageCategory";
import { cssVariables } from "../../../config/themeConfig";
import { MdCategory } from "react-icons/md";

const { Text, Title } = Typography;

const BrowseCategory = ({ categoryResponse }) => {
  const { data, isLoading, isError } = categoryResponse;

  const columns = [
    {
      title: (
        <Space size={4} style={{ margin: "0.6rem 0.4rem" }}>
          <TagOutlined style={{ color: cssVariables.colorPrimary }} />
          <span style={{ color: cssVariables.colorPrimary, fontWeight: 600 }}>
            Slug
          </span>
        </Space>
      ),
      dataIndex: "slug",
      render: (slug) => (
        <Tag
          bordered={false}
          color={getRandomTagColor()}
          style={{ fontSize: "12px", fontWeight: 500 }}
        >
          {slug}
        </Tag>
      ),
      responsive: ["md"],
    },
    {
      title: (
        <Space size={4}>
          <MdCategory style={{ color: cssVariables.colorSecondary }} />
          <span style={{ color: cssVariables.colorSecondary, fontWeight: 600 }}>
            Category
          </span>
        </Space>
      ),
      dataIndex: "name",
      render: (name) => (
        <Typography.Text
          strong
          style={{
            fontSize: "13px",
            textTransform: "capitalize",
          }}
        >
          {name}
        </Typography.Text>
      ),
    },
    {
      title: (
        <Space size={4}>
          <FileTextOutlined style={{ color: cssVariables.colorInfo }} />
          <span style={{ color: cssVariables.colorInfo, fontWeight: 600 }}>
            Description
          </span>
        </Space>
      ),
      dataIndex: "description",
      width: "50%",
      ellipsis: true,
      render: (description) => (
        <Typography.Text
          style={{ fontSize: "12px" }}
          ellipsis={{ tooltip: description }}
        >
          {description || "No description provided"}
        </Typography.Text>
      ),
      responsive: ["lg"],
    },
    {
      title: (
        <Space size={4}>
          <SettingOutlined style={{ color: cssVariables.colorTextSecondary }} />
          <span
            style={{ color: cssVariables.colorTextSecondary, fontWeight: 600 }}
          >
            Actions
          </span>
        </Space>
      ),
      key: "actions",
      fixed: "right",
      width: 105,
      render: (_, record) => (
        <Space size={3}>
          <Tooltip title="Edit Category">
            <ManageCategory operation="UPDATE" category={record} />
          </Tooltip>
          <Tooltip title="Delete Category">
            <DeleteCategory slug={record.slug} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Card
      style={{
        boxShadow: cssVariables.shadowSubtle,
        borderRadius: cssVariables.borderRadiusCard,
        border: `1px solid ${cssVariables.borderSubtle}`,
      }}
    >
      <div style={{ marginBottom: 15 }}>
        <Space align="center" size={12}>
          <Avatar
            size={36}
            style={{
              backgroundColor: cssVariables.colorPrimary,
              color: cssVariables.colorWhite,
            }}
            icon={<MdCategory />}
          />
          <Space direction="vertical" size={0}>
            <Title
              level={4}
              style={{
                margin: 0,
                fontSize: "16px",
              }}
            >
              Categories Directory
            </Title>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {data?.length || 0} categories found
            </Text>
          </Space>
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        rowKey={(record) => record.slug}
        scroll={{ x: 800 }}
        size="small"
        pagination={{
          pageSize: 5,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} categories`,
          showSizeChanger: true,
          size: "default",
        }}
        locale={{
          emptyText: isError ? (
            <Result
              status="error"
              title="Failed to load categories"
              subTitle="Something went wrong while fetching category data"
              extra={
                <Button type="primary" onClick={() => window.location.reload()}>
                  Retry
                </Button>
              }
            />
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <Space direction="vertical" align="center">
                  <Typography.Text>No categories found</Typography.Text>
                  <Typography.Text
                    type="secondary"
                    style={{ fontSize: "12px" }}
                  >
                    No categories available at the moment
                  </Typography.Text>
                </Space>
              }
            />
          ),
        }}
      />
    </Card>
  );
};

BrowseCategory.propTypes = {
  categoryResponse: PropTypes.object,
};

export default BrowseCategory;
