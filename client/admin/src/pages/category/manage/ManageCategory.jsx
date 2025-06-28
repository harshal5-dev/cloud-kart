import { useEffect } from "react";
import PropTypes from "prop-types";
import { App, Col, Flex, Row, Space, Switch, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";

import CategoryForm from "./CategoryForm";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../categoryApi";
import {
  clearCategoryOperation,
  clearSelectedCategory,
} from "../categorySlice";
import { pick } from "../../../lib/utils";
import { FcAddDatabase, FcDataConfiguration } from "react-icons/fc";

const { Text } = Typography;

const ManageCategory = ({ onSuccess }) => {
  const { notification } = App.useApp();

  const selectedCategory = useSelector(
    (state) => state.category.selectedCategory,
  );

  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  let title = "Create Category";
  let description = "create a new category to the database.";
  let HeaderIcon = FcAddDatabase;
  let defaultValues = {
    name: "",
    description: null,
    slug: "",
    imageUrl: null,
  };

  const operation = useSelector((state) => state.category.categoryOperation);
  const dispatch = useDispatch();

  async function handleOnSubmit(values) {
    if (operation === "CREATE") {
      try {
        const payload = {
          ...values,
        };
        const res = await createCategory(payload).unwrap();
        notification.success({
          message: "Success",
          description: res.statusMessage,
        });
        onSuccess();
      } catch (errorRes) {
        const error = errorRes.data;
        notification.error({
          message: "Error",
          description: error.errorMessage,
        });
      }
    } else {
      try {
        const payload = {
          curSlug: selectedCategory.slug,
          ...values,
        };
        const res = await updateCategory(payload).unwrap();
        notification.success({
          message: "Success",
          description: res.statusMessage,
        });
        onSuccess();
      } catch (errorRes) {
        const error = errorRes.data;
        notification.error({
          message: "Error",
          description: error.errorMessage,
        });
      }
    }
  }

  if (operation === "UPDATE") {
    title = "Update Category";
    description = "update the selected category in the database.";
    HeaderIcon = FcDataConfiguration;
    defaultValues = pick(selectedCategory, [
      "name",
      "description",
      "slug",
      "imageUrl",
    ]);
  }

  useEffect(() => {
    return () => {
      dispatch(clearSelectedCategory());
      dispatch(clearCategoryOperation());
    };
  }, [dispatch]);

  return (
    <Row gutter={[0, 20]}>
      <Col span={24}>
        <Flex gap={10}>
          <HeaderIcon className="size-10" />
          <Space direction="vertical" size={0}>
            <Text strong>{title}</Text>
            <Text type="secondary" italic ellipsis>
              {description}
            </Text>
          </Space>
        </Flex>
      </Col>
      <Col span={24}>
        <CategoryForm
          defaultValues={defaultValues}
          onSubmit={handleOnSubmit}
          isCategorySaveLoading={isCreating || isUpdating}
        />
      </Col>
    </Row>
  );
};

ManageCategory.propTypes = {
  onSuccess: PropTypes.func,
};

export default ManageCategory;
