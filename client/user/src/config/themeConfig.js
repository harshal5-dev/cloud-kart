export const cssVariables = {
  colorPrimary: "#10b981", // Modern blue from Tailwind palette
  colorLink: "#10b981",
  hoverColor: "#32c790",
  tableHeaderBg: "#e1faed",
  tableHeaderColor: "#069469",
  colorWhite: "#ffffff",
  colorSelected: "#069469",
  colorBgSelected: "#e1faed",
  colorSuccess: "#52c41a", // Modern green
  colorWarning: "#F59E0B", // Modern amber
  colorError: "#EF4444", // Modern red
  colorInfo: "#6366F1", // Modern indigo
  colorTextBase: "#1F2937", // More modern dark gray
  colorBorderLight: "#e1faed",
};

export const themeConfig = {
  token: {
    colorPrimary: cssVariables.colorPrimary,
    borderRadius: 10,
    wireframe: false,
    colorInfo: cssVariables.colorPrimary,
    colorLink: cssVariables.colorLink,
    borderColor: cssVariables.colorPrimary,
  },
  components: {
    Button: {
      textTextColor: cssVariables.colorPrimary,
      textTextHoverColor: cssVariables.hoverColor,
    },
  },
};

export const notificationConfig = {
  placement: "bottomRight",
  duration: 3,
};
