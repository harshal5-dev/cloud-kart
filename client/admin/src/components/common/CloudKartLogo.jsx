import React from "react";
import { Space, Typography } from "antd";
import { CloudOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { cssVariables } from "../../config/themeConfig";

const CloudKartLogo = ({
  size = "medium",
  variant = "default",
  showText = true,
  interactive = false,
  className = "",
  style = {},
}) => {
  const sizeConfig = {
    small: {
      iconSize: 32,
      fontSize: "18px",
      spacing: "small",
      containerSize: 40,
      borderRadius: 8,
    },
    medium: {
      iconSize: 48,
      fontSize: "24px",
      spacing: "medium",
      containerSize: 56,
      borderRadius: 12,
    },
    large: {
      iconSize: 60,
      fontSize: "32px",
      spacing: "large",
      containerSize: 72,
      borderRadius: 16,
    },
    xlarge: {
      iconSize: 80,
      fontSize: "40px",
      spacing: "large",
      containerSize: 96,
      borderRadius: 20,
    },
  };

  const variantConfig = {
    default: {
      background: `linear-gradient(135deg, ${cssVariables.colorPrimary}, ${cssVariables.colorSecondary})`,
      color: cssVariables.colorWhite,
      textColor: cssVariables.colorText,
      border: "none",
    },
    glass: {
      background: cssVariables.whiteTransparent40,
      color: cssVariables.colorWhite,
      textColor: cssVariables.colorWhite,
      border: `1px solid ${cssVariables.whiteTransparent25}`,
      backdropFilter: "blur(10px)",
    },
    outline: {
      background: "transparent",
      color: cssVariables.colorPrimary,
      textColor: cssVariables.colorPrimary,
      border: `2px solid ${cssVariables.colorPrimary}`,
    },
    minimal: {
      background: `${cssVariables.colorPrimary}15`,
      color: cssVariables.colorPrimary,
      textColor: cssVariables.colorPrimary,
      border: `1px solid ${cssVariables.colorPrimary}20`,
    },
    white: {
      background: cssVariables.colorWhite,
      color: cssVariables.colorPrimary,
      textColor: cssVariables.colorText,
      border: `1px solid ${cssVariables.borderSubtle}`,
      boxShadow: cssVariables.shadowSubtle,
    },
  };

  const config = sizeConfig[size];
  const theme = variantConfig[variant];

  const logoStyle = {
    width: `${config.containerSize}px`,
    height: `${config.containerSize}px`,
    borderRadius: `${config.borderRadius}px`,
    background: theme.background,
    border: theme.border,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: interactive ? "pointer" : "default",
    ...(theme.backdropFilter && { backdropFilter: theme.backdropFilter }),
    ...(theme.boxShadow && { boxShadow: theme.boxShadow }),
    ...style,
  };

  const interactiveStyles = interactive
    ? {
        onMouseEnter: (e) => {
          e.currentTarget.style.transform = "scale(1.05) rotate(2deg)";
          e.currentTarget.style.boxShadow = `0 8px 25px ${cssVariables.colorPrimary}30, 0 4px 10px ${cssVariables.colorSecondary}20`;
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.transform = "scale(1) rotate(0deg)";
          e.currentTarget.style.boxShadow = theme.boxShadow || "none";
        },
      }
    : {};

  const textStyle = {
    margin: 0,
    color: theme.textColor,
    fontSize: config.fontSize,
    fontWeight: 700,
    background:
      variant === "default"
        ? `linear-gradient(135deg, ${cssVariables.colorPrimary}, ${cssVariables.colorSecondary})`
        : "none",
    ...(variant === "default" && {
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }),
    ...(variant === "glass" && {
      textShadow: cssVariables.textShadow,
    }),
  };

  return (
    <div className={className}>
      <Space align="center" size={config.spacing}>
        <div style={logoStyle} {...interactiveStyles}>
          {/* Background decorative element */}
          <div
            style={{
              position: "absolute",
              top: "10%",
              right: "10%",
              width: "60%",
              height: "60%",
              borderRadius: "50%",
              background: `${cssVariables.whiteTransparent25}`,
              filter: "blur(8px)",
              opacity: 0.6,
            }}
          />

          {/* Main icon stack */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <CloudOutlined
              style={{
                fontSize: `${config.iconSize * 0.7}px`,
                color: theme.color,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-60%, -60%)",
                filter: `drop-shadow(0 2px 4px ${cssVariables.colorPrimary}20)`,
              }}
            />
            <ShoppingCartOutlined
              style={{
                fontSize: `${config.iconSize * 0.5}px`,
                color: theme.color,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-30%, -30%)",
                filter: `drop-shadow(0 2px 4px ${cssVariables.colorSecondary}20)`,
              }}
            />
          </div>
        </div>

        {showText && (
          <Typography.Title
            level={size === "small" ? 5 : size === "medium" ? 4 : 3}
            style={textStyle}
          >
            Cloud Kart
          </Typography.Title>
        )}
      </Space>
    </div>
  );
};

export default CloudKartLogo;
