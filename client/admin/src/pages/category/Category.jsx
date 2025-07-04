import { Button, Card, Flex, Space, Typography } from "antd";

import { RiRefreshFill } from "react-icons/ri";
import ManageCategory from "./manage/ManageCategory";
import { useGetCategoriesQuery } from "./categoryApi";
import BrowseCategory from "./browse/BrowseCategory";

const { Title } = Typography;

const Category = () => {
  const categoryResponse = useGetCategoriesQuery();
  const { refetch, isLoading } = categoryResponse;

  return (
    <Space direction="vertical" size="large" className="w-full">
      <Card>
        <Flex justify="space-between" align="center" wrap="wrap" gap={16}>
          <Title level={3} style={{ margin: 0 }}>
            Categories
          </Title>
          <Space>
            <Button
              color="green"
              variant="filled"
              icon={<RiRefreshFill />}
              onClick={refetch}
              loading={isLoading}
            >
              Refresh
            </Button>
            <ManageCategory operation="CREATE" />
          </Space>
        </Flex>
      </Card>
      <BrowseCategory categoryResponse={categoryResponse} />
    </Space>
  );
};

export default Category;
