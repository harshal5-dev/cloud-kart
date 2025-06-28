import { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { Button, Empty, Flex, Result, Space, Table, Tag } from "antd";
import { useDispatch } from "react-redux";

import { useGetCategoriesQuery } from "../categoryApi";
import { setCategoryOperation, setSelectedCategory } from "../categorySlice";
import { RiRefreshFill } from "react-icons/ri";
import DeleteCategory from "./DeleteCategory";
import { FaPencilAlt } from "react-icons/fa";
import { getRandomTagColor } from "../../../lib/utils";

const BrowseCategory = ({ onCategoryUpdate }) => {
  const categoryResponse = useGetCategoriesQuery();
  const { data, isLoading, refetch, isError } = categoryResponse;

  const dispatch = useDispatch();

  const handleUpdateCategory = useCallback(
    (selectedCategory) => {
      dispatch(setCategoryOperation("UPDATE"));
      dispatch(setSelectedCategory(selectedCategory));
      onCategoryUpdate();
    },
    [dispatch, onCategoryUpdate]
  );

  const column = useMemo(
    () => [
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
            <Button
              variant="text"
              shape="circle"
              color="gold"
              icon={<FaPencilAlt />}
              onClick={() => handleUpdateCategory(record)}
            />
            <DeleteCategory slug={record.slug} />
          </Space>
        ),
      },
    ],
    [handleUpdateCategory]
  );

  return (
    <Flex vertical gap={16}>
      <Flex justify="end" gap={10}>
        <Button
          color="primary"
          variant="outlined"
          icon={<RiRefreshFill />}
          onClick={refetch}
          loading={isLoading}
        >
          Refetch
        </Button>
      </Flex>
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
    </Flex>
  );
};

BrowseCategory.propTypes = {
  onCategoryUpdate: PropTypes.func,
};

export default BrowseCategory;
