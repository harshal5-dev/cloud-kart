import { useMemo, useState } from "react";
import {
  FileSearchOutlined,
  PlusCircleFilled,
  SignatureOutlined,
} from "@ant-design/icons";
import { Button, Card } from "antd";
import { IoArrowBackCircle } from "react-icons/io5";

import BrowseProduct from "./browse/BrowseProduct";
import ManageProduct from "./manage/ManageProduct";

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
  1: BrowseProduct,
  2: ManageProduct,
};

const Product = () => {
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
          Product
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

  function handleOnSuccess() {
    setActiveTabKey("1");
  }

  function handleOnProductUpdate() {
    setActiveTabKey("2");
  }

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
        onProductUpdate={handleOnProductUpdate}
      />
    </Card>
  );
};

export default Product;
