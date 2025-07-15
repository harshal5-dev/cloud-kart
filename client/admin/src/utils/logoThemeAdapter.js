// Theme Logo Adapter - Dynamically updates logo colors based on theme
export const initializeLogoTheme = (cssVariables) => {
  const updateLogoTheme = () => {
    const root = document.documentElement;

    // Primary theme colors
    root.style.setProperty("--logo-primary", cssVariables.colorPrimary);
    root.style.setProperty(
      "--logo-primary-light",
      cssVariables.colorPrimaryHover || "#40a9ff"
    );
    root.style.setProperty("--logo-secondary", cssVariables.colorSecondary);
    root.style.setProperty(
      "--logo-secondary-light",
      cssVariables.colorSecondaryHover || "#9254de"
    );

    // Status colors
    root.style.setProperty("--logo-success", cssVariables.colorSuccess);
    root.style.setProperty("--logo-info", cssVariables.colorInfo || "#13c2c2");
    root.style.setProperty(
      "--logo-warning",
      cssVariables.colorWarning || "#faad14"
    );

    // Text color for theme detection
    root.style.setProperty(
      "--logo-text",
      cssVariables.colorText || cssVariables.colorTextBase
    );

    // Background adaptability
    const isDark =
      cssVariables.colorBgBase === "#000000" ||
      cssVariables.colorBgContainer?.includes("141414") ||
      document.documentElement.getAttribute("data-theme") === "dark";

    if (isDark) {
      // Dark theme adjustments
      root.style.setProperty(
        "--logo-primary",
        cssVariables.colorPrimary || "#40a9ff"
      );
      root.style.setProperty("--logo-primary-light", "#69c0ff");
      root.style.setProperty(
        "--logo-secondary",
        cssVariables.colorSecondary || "#9254de"
      );
      root.style.setProperty("--logo-secondary-light", "#b37feb");
      root.style.setProperty("--logo-success", "#73d13d");
      root.style.setProperty("--logo-info", "#36cfc9");
    }
  };

  // Initial update
  updateLogoTheme();

  // Watch for theme changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        (mutation.attributeName === "data-theme" ||
          mutation.attributeName === "class")
      ) {
        updateLogoTheme();
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme", "class"],
  });

  return () => observer.disconnect();
};

// CSS injection for enhanced logo effects
export const injectLogoStyles = () => {
  const styleId = "cloud-kart-logo-styles";

  // Remove existing styles if any
  const existingStyle = document.getElementById(styleId);
  if (existingStyle) {
    existingStyle.remove();
  }

  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    /* Enhanced logo hover effects */
    .logo-container:hover {
      filter: brightness(1.1) saturate(1.2) !important;
    }
    
    .logo-container:hover img {
      transform: scale(1.02) !important;
    }
    
    /* Smooth theme transitions */
    svg[width="40"][height="40"] {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    
    /* Performance optimizations */
    svg[width="40"][height="40"] * {
      will-change: transform, opacity;
    }
    
    /* Theme-adaptive glow effects */
    @media (prefers-color-scheme: dark) {
      .logo-container {
        filter: drop-shadow(0 0 8px var(--logo-primary, #40a9ff)) 
                drop-shadow(0 0 4px var(--logo-secondary, #9254de)) !important;
      }
    }
    
    @media (prefers-color-scheme: light) {
      .logo-container {
        filter: drop-shadow(0 2px 8px var(--logo-primary, #1890ff)) 
                drop-shadow(0 1px 4px var(--logo-secondary, #722ed1)) !important;
      }
    }
  `;

  document.head.appendChild(style);

  return () => {
    const styleElement = document.getElementById(styleId);
    if (styleElement) {
      styleElement.remove();
    }
  };
};
