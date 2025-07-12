import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { MoonFilled, SunFilled } from "@ant-design/icons";
import { setThemeMode } from "../../features/themeSlice";

const ToggleTheme = () => {
  const curThemeMode = useSelector((state) => state.theme.themeMode);
  const isDark = curThemeMode === "dark";

  const dispatch = useDispatch();

  function handleThemeChange() {
    const themeMode = isDark ? "light" : "dark";
    dispatch(setThemeMode({ themeMode }));
  }

  return (
    <Button
      variant="outlined"
      shape="circle"
      color="primary"
      size="small"
      onClick={handleThemeChange}
      icon={isDark ? <SunFilled /> : <MoonFilled />}
    />
  );
};

export default ToggleTheme;
