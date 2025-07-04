import PropTypes from "prop-types";
import { Card, Empty, Result, Space, Table, Tag } from "antd";

import DeleteCategory from "./DeleteCategory";
import { getRandomTagColor } from "../../../lib/utils";
import ManageCategory from "../manage/ManageCategory";

const BrowseCategory = ({ categoryResponse }) => {
  const { data, isLoading, isError } = categoryResponse;

  const column = [
    {
      title: "Slug",
      dataIndex: "slug",
      render: (slug) => (
        <Tag bordered={false} color={getRandomTagColor()}>
          {slug}
        </Tag>
      ),
      responsive: ["md"],
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "50%",
      ellipsis: true,
      responsive: ["md"],
    },
    {
      title: "Action",
      align: "center",
      render: (_, record) => (
        <Space size={2}>
          <ManageCategory operation={"UPDATE"} category={record} />
          <DeleteCategory slug={record.slug} />
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Table
        columns={column}
        dataSource={data}
        loading={isLoading}
        rowKey={(record) => record.slug}
        scroll={{ x: "100%" }}
        locale={{
          emptyText: isError ? (
            <Result
              status="error"
              title="An error occurred"
              subTitle="Failed to fetch categories, please try again"
            />
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_DEFAULT}
              description="No Categories found"
            />
          ),
        }}
        pagination={{
          pageSize: 5,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
    </Card>
  );
};

BrowseCategory.propTypes = {
  categoryResponse: PropTypes.object,
};

export default BrowseCategory;
