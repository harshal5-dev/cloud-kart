import { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  Tooltip,
  Badge,
  Row,
  Col,
  Spin,
  Alert,
  Empty,
  Modal,
  Typography,
} from "antd";
import { EyeOutlined } from "@ant-design/icons";

import DeleteProductImage from "./DeleteProductImage";
import ManageProductImage from "../manage/ManageProductImage";

const { Meta } = Card;
const { Ribbon } = Badge;
const { Text } = Typography;

const BrowseProductImage = ({ productImageResponse, productSku }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handlePreview = async (image) => {
    setPreviewImage(image.imageUrl);
    setPreviewTitle(image.altText || "Product Image");
    setPreviewOpen(true);
  };

  const { isLoading, data: images, isError } = productImageResponse;

  if (isLoading) {
    return <Spin size="large" className="flex items-center justify-center" />;
  } else if (isError) {
    return (
      <Alert
        message="Error"
        description="Failed to load product images. Please try again."
        type="error"
        showIcon
        className="w-full"
      />
    );
  } else if (images?.length === 0) {
    return <Empty description="Product Images data not found" />;
  }

  return (
    <Row gutter={[16, 16]}>
      {images?.map((image) => (
        <Col key={image.id} span={24} xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card
            hoverable
            cover={
              image.isPrimary ? (
                <Ribbon text="primary" color="green" placement="start">
                  <img
                    alt={image.altText}
                    className="w-full h-44"
                    src={image.imageUrl}
                  />
                </Ribbon>
              ) : (
                <img
                  alt={image.altText}
                  className="w-full h-44"
                  src={image.imageUrl}
                />
              )
            }
            actions={[
              <Tooltip title="View" key="view">
                <EyeOutlined onClick={() => handlePreview(image)} />
              </Tooltip>,
              <ManageProductImage
                operation="UPDATE"
                productSku={productSku}
                productImage={image}
              />,
              <DeleteProductImage id={image.id} productSku={productSku} />,
            ]}
          >
            <Meta
              description={
                <Text type="secondary">
                  <span className="font-semibold">Sort Order:</span>{" "}
                  {image.sortOrder ? image.sortOrder : "Not Set"}
                </Text>
              }
            />
          </Card>
        </Col>
      ))}

      {/* Preview Modal */}
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
        centered
      >
        <img alt={previewTitle} style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </Row>
  );
};

BrowseProductImage.propTypes = {
  productImageResponse: PropTypes.object,
  productSku: PropTypes.string,
};

export default BrowseProductImage;
