import { App, ConfigProvider, theme } from "antd";
import { useSelector } from "react-redux";
import enUS from "antd/es/calendar/locale/en_US";

import { notificationConfig, themeConfig } from "./config/themeConfig";
import AppLayout from "./components/layout/AppLayout";

function CloudKartAdmin() {
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
        <AppLayout />
      </App>
    </ConfigProvider>
  );
}

export default CloudKartAdmin;
