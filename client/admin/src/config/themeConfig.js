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
  // Error and status colors
  colorError: "#ff4d4f",
  colorWarning: "#faad14",
  colorInfo: "#1677ff",
  // Additional colors for steps
  colorPurple: "#722ed1",
  colorOrange: "#fa8c16",
  colorMagenta: "#eb2f96",
  colorSuccess: "#52c41a",
  colorProgressEnd: "#73d13d",
  // Glassmorphism and overlay colors
  glassOverlay: "rgba(255,255,255,0.15)",
  glassOverlayLight: "rgba(255,255,255,0.08)",
  whiteTransparent25: "rgba(255,255,255,0.25)",
  whiteTransparent30: "rgba(255,255,255,0.3)",
  whiteTransparent40: "rgba(255,255,255,0.4)",
  whiteTransparent90: "rgba(255,255,255,0.9)",
  blackShadow10: "rgba(0,0,0,0.1)",
  // Theme-adaptive colors for dark/light mode
  backgroundTransparent: "transparent",
  borderSubtle: "rgba(0,0,0,0.06)",
  borderDivider: "var(--ant-color-border, rgba(217, 217, 217, 0.3))",
  containerBackground: "var(--ant-color-bg-elevated, #fff)",
  containerBorder: "var(--ant-color-bg-container, #fff)",
  shadowSubtle: "0 2px 8px rgba(0,0,0,0.06)",
  shadowMedium: "0 12px 24px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)",
  shadowSmall: "0 1px 2px rgba(0,0,0,0.2)",
  shadowLight: "0 1px 3px rgba(0,0,0,0.2)",
  colorText: "#262626",
  colorTextSecondary: "#8c8c8c",
  colorTextTertiary: "#bfbfbf",
  // Dark theme compatible colors
  cardBackground: "rgba(255,255,255,0.08)",
  cardBorder: "rgba(255,255,255,0.12)",
  cardShadow: "0 4px 12px rgba(0,0,0,0.15)",
  cardBackgroundLight: "rgba(255,255,255,0.95)",
  cardBackgroundDark: "rgba(20, 20, 20, 0.8)",
  cardBorderLight: "rgba(0,0,0,0.06)",
  cardBorderDark: "rgba(255,255,255,0.1)",
  cardShadowLight: "0 4px 12px rgba(0,0,0,0.08)",
  cardShadowDark: "0 8px 24px rgba(0,0,0,0.4)",
  // Theme-adaptive text colors
  textPrimary: "inherit",
  textSecondary: "rgba(255,255,255,0.7)",
  textTertiary: "rgba(255,255,255,0.5)",
  // Shadow values
  boxShadowLight: "0 2px 8px rgba(0,0,0,0.1)",
  boxShadowSoft: "0 1px 3px rgba(0,0,0,0.1)",
  textShadow: "0 1px 2px rgba(0,0,0,0.1)",
  // Header specific styles
  headerGradientPrimary: "linear-gradient(135deg, #27548a 0%, #3b82f6 100%)",
  headerShadowPrimary: "0 8px 24px rgba(39, 84, 138, 0.15)",
  avatarSizeLarge: 55,
  borderRadiusLarge: 16,
  // Typography
  fontSizeLarge: "clamp(15px, 2vw, 25px)",
  fontSizeRegular: "14px",
  fontWeightBold: 600,
  fontWeightMedium: 500,
  lineHeightCompact: 1.2,
  // Spacing
  spacingLarge: 24,
  spacingMedium: 20,
  spacingSmall: 16,
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
