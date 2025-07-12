import { useState } from "react";
import {
  Card,
  Empty,
  List,
  Result,
  Typography,
  Skeleton,
  Input,
  Select,
  Button,
  Row,
  Col,
  Tag,
  Breadcrumb,
} from "antd";
import {
  SearchOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { useGetCategoriesQuery } from "./categoryApi";
import { Link } from "react-router";

const { Title, Text, Paragraph } = Typography;
const { Meta } = Card;
const { Option } = Select;

const Category = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name_asc");

  const { data: categories, isLoading, isError } = useGetCategoriesQuery();

  // Filter categories based on search term
  const filteredCategories = categories
    ? categories.filter(
        (cat) =>
          cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (cat.description &&
            cat.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  // Sort categories
  const sortedCategories = [...(filteredCategories || [])].sort((a, b) => {
    switch (sortBy) {
      case "name_asc":
        return a.name.localeCompare(b.name);
      case "name_desc":
        return b.name.localeCompare(a.name);
      case "products_desc":
        return (b.productCount || 0) - (a.productCount || 0);
      case "products_asc":
        return (a.productCount || 0) - (b.productCount || 0);
      default:
        return 0;
    }
  });

  const renderSkeletons = () => {
    return Array(6)
      .fill(null)
      .map((_, index) => (
        <Col xs={24} sm={12} md={8} lg={6} xl={6} key={index} className="mb-4">
          <Card className="h-full">
            <Skeleton.Image className="w-full h-48" active />
            <Skeleton active paragraph={{ rows: 2 }} className="mt-4" />
          </Card>
        </Col>
      ));
  };

  const renderGridItem = (category) => (
    <Col xs={24} sm={12} md={8} lg={6} xl={6} className="mb-4">
      <Link to={`/categories/${category.slug || category.id}`}>
        <Card
          hoverable
          cover={
            <div className="h-48 overflow-hidden flex items-center justify-center bg-gray-50">
              <img
                alt={category.name}
                src={
                  category.imageUrl ||
                  "https://via.placeholder.com/300x200?text=No+Image"
                }
                className="object-cover w-full h-full"
              />
            </div>
          }
          className="h-full"
        >
          <Meta
            title={category.name}
            description={
              <>
                <Paragraph ellipsis={{ rows: 2 }} className="mb-2">
                  {category.description || "No description available"}
                </Paragraph>
                <div className="flex justify-between items-center">
                  <Tag color="blue">{category.productCount || 0} Products</Tag>
                  <Text type="secondary">View →</Text>
                </div>
              </>
            }
          />
        </Card>
      </Link>
    </Col>
  );

  const renderListItem = (category) => (
    <Col xs={24} className="mb-4">
      <Link to={`/categories/${category.slug || category.id}`}>
        <Card hoverable className="flex flex-row h-32 overflow-hidden">
          <div className="w-32 h-full overflow-hidden flex-shrink-0">
            <img
              alt={category.name}
              src={
                category.imageUrl ||
                "https://via.placeholder.com/300x200?text=No+Image"
              }
              className="object-cover h-full w-full"
            />
          </div>
          <div className="flex-grow p-4">
            <Meta
              title={category.name}
              description={
                <>
                  <Paragraph ellipsis={{ rows: 2 }} className="mb-2">
                    {category.description || "No description available"}
                  </Paragraph>
                  <Tag color="blue">{category.productCount || 0} Products</Tag>
                </>
              }
            />
          </div>
        </Card>
      </Link>
    </Col>
  );

  return (
    <div>
      <Breadcrumb
        items={[{ title: <Link to="/">Home</Link> }, { title: "Categories" }]}
        className="mb-6"
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <Title level={2} className="mb-0">
          Categories
        </Title>

        <div className="flex items-center gap-3">
          <Button
            type={viewMode === "grid" ? "primary" : "default"}
            icon={<AppstoreOutlined />}
            onClick={() => setViewMode("grid")}
          />
          <Button
            type={viewMode === "list" ? "primary" : "default"}
            icon={<UnorderedListOutlined />}
            onClick={() => setViewMode("list")}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Search categories..."
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:max-w-xs"
        />

        <Select
          placeholder="Sort by"
          value={sortBy}
          onChange={setSortBy}
          className="min-w-[180px]"
        >
          <Option value="name_asc">Name (A-Z)</Option>
          <Option value="name_desc">Name (Z-A)</Option>
          <Option value="products_desc">Most Products</Option>
          <Option value="products_asc">Fewest Products</Option>
        </Select>
      </div>

      {isLoading ? (
        <Row gutter={16}>{renderSkeletons()}</Row>
      ) : isError ? (
        <Result
          status="error"
          title="Something went wrong"
          subTitle="Failed to fetch categories, please try again"
          extra={<Button type="primary">Refresh</Button>}
        />
      ) : sortedCategories.length === 0 ? (
        <Empty
          description="No categories found"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <Row gutter={16}>
          {viewMode === "grid"
            ? sortedCategories.map((category) => renderGridItem(category))
            : sortedCategories.map((category) => renderListItem(category))}
        </Row>
      )}
    </div>
  );
};

export default Category;
