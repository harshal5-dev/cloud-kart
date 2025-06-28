import { useMemo, useState } from "react";
import { Button, Card } from "antd";
import { IoArrowBackCircle } from "react-icons/io5";
import {
  FileSearchOutlined,
  PlusCircleFilled,
  SignatureOutlined,
} from "@ant-design/icons";

import BrowseCategory from "./browse/BrowseCategory";
import ManageCategory from "./manage/ManageCategory";

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
  1: BrowseCategory,
  2: ManageCategory,
};

const Category = () => {
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
          Category
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

  function handleOnCategoryUpdate() {
    setActiveTabKey("2");
  }

  return (
    <Card
      variant="borderless"
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
        onCategoryUpdate={handleOnCategoryUpdate}
      />
    </Card>
  );
};

export default Category;
