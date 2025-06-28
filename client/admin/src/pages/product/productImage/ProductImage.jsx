import { useMemo, useState } from "react";
import { Button, Card } from "antd";
import {
  FileSearchOutlined,
  PlusCircleFilled,
  SignatureOutlined,
} from "@ant-design/icons";
import { IoArrowBackCircle } from "react-icons/io5";

import BrowseProductImage from "./browse/BrowseProductImage";
import ManageProductImage from "./manage/ManageProductImage";

const tabList = [
  {
    key: "1",
    label: "Browse",
    icon: <FileSearchOutlined />,
  },
  {
    key: "2",
    label: "Manage",
    icon: <SignatureOutlined />,
  },
];

const contentList = {
  1: BrowseProductImage,
  2: ManageProductImage,
};

const ProductImage = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const TabComp = contentList[activeTabKey];

  const tabBarExtraContent = useMemo(
    () => ({
      1: (
        <Button
          type="primary"
          icon={<PlusCircleFilled />}
          onClick={() => setActiveTabKey("2")}
        >
          Product Image
        </Button>
      ),
      2: (
        <Button
          type="primary"
          icon={<IoArrowBackCircle />}
          onClick={() => setActiveTabKey("1")}
        >
          Back
        </Button>
      ),
    }),
    []
  );

  function onTabChange(key) {
    setActiveTabKey(key);
  }

  const handleOnSuccess = () => {
    setActiveTabKey("1");
  };

  const handleOnProductImageUpdate = () => {
    setActiveTabKey("2");
  };

  return (
    <Card
      variant="bordered"
      tabList={tabList}
      activeTabKey={activeTabKey}
      onTabChange={onTabChange}
      tabProps={{
        size: "middle",
      }}
      tabBarExtraContent={tabBarExtraContent[activeTabKey]}
    >
      <TabComp
        onSuccess={handleOnSuccess}
        onProductImageUpdate={handleOnProductImageUpdate}
      />
    </Card>
  );
};

export default ProductImage;
