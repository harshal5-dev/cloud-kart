import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { App, ConfigProvider, theme } from "antd";
import enUS from "antd/es/calendar/locale/en_US";

import { notificationConfig, themeConfig } from "./config/themeConfig";
import PageNotFound from "./pages/result/PageNotFound";
import Home from "./pages/home/Home";
import AppLayout from "./components/layout/AppLayout";
import Category from "./pages/category/Category";
import Product from "./pages/product/Product";
import ViewCart from "./pages/cart/ViewCart";

const CloudKartClient = () => {
  const curThemeMode = useSelector((state) => state.theme.themeMode);
  const isDark = curThemeMode === "dark";

  return (
    <ConfigProvider
      theme={{
        ...themeConfig,
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
      locale={enUS}
    >
      <App notification={notificationConfig}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Category />} />
            <Route path="/products" element={<Product />} />
            <Route path="/cart" element={<ViewCart />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </App>
    </ConfigProvider>
  );
};

export default CloudKartClient;
