import { Button, Card, Col, Row, Space, Statistic, Typography } from "antd";
import { AiFillProduct } from "react-icons/ai";
import { MdCategory } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { PlusCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router";

import { useGetCategoryCountQuery } from "../category/categoryApi";
import { useGetProductCountQuery } from "../product/productApi";

const { Text } = Typography;

const Dashboard = () => {
  const categoryResponse = useGetCategoryCountQuery();
  const {
    data: categoryCount,
    isLoading: isCategoryLoading,
    refetch: refetchCategory,
  } = categoryResponse;
  const productResponse = useGetProductCountQuery();
  const {
    data: productCount,
    isLoading: isProductLoading,
    refetch: refetchProduct,
  } = productResponse;
  const navigate = useNavigate();

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card variant="borderless">
          <Statistic
            title={
              <Space size="small" align="baseline">
                <Text type="secondary" strong>
                  Available Product Categories
                </Text>
                <Button
                  variant="text"
                  shape="circle"
                  color="gold"
                  icon={<PlusCircleFilled className="size-4" />}
                  onClick={() => navigate("/categories")}
                />
              </Space>
            }
            value={categoryCount}
            valueStyle={{ fontWeight: "bold" }}
            prefix={<MdCategory className="text-lime-700" />}
            loading={isCategoryLoading}
            suffix={
              <Button
                variant="text"
                shape="circle"
                color="primary"
                icon={<RiRefreshFill className="size-4" />}
                onClick={() => refetchCategory()}
              />
            }
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card variant="borderless">
          <Statistic
            title={
              <Space size="small" align="baseline">
                <Text type="secondary" strong>
                  Total Products
                </Text>
                <Button
                  variant="text"
                  shape="circle"
                  color="gold"
                  icon={<PlusCircleFilled className="size-4" />}
                  onClick={() => navigate("/products")}
                />
              </Space>
            }
            value={productCount}
            valueStyle={{ fontWeight: "bold" }}
            prefix={<AiFillProduct className="text-lime-700" />}
            loading={isProductLoading}
            suffix={
              <Button
                variant="text"
                shape="circle"
                color="primary"
                icon={<RiRefreshFill className="size-4" />}
                onClick={() => refetchProduct()}
              />
            }
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;
