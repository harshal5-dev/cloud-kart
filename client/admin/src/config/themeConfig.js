export const cssVariables = {
  colorPrimary: "#27548a",
  colorSecondary: "#00B96B",
  colorLink: "#1677ff",
  hoverColor: "#426b96",
  tableHeaderBg: "#bdc5c9",
  tableHeaderColor: "#173763",
  colorWhite: "#ffffff",
  colorSelected: "#173763",
  colorBgSelected: "#bdc5c9",
  colorTitle: "#3b82f6",
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
