// React Theme — extracted from https://blog.n8n.io/n8n-mcp-server/
// Compatible with: Chakra UI, Stitches, Vanilla Extract, or any CSS-in-JS

/**
 * TypeScript type definition for this theme:
 *
 * interface Theme {
 *   colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    neutral50: string;
    neutral100: string;
    neutral200: string;
    neutral300: string;
    neutral400: string;
    neutral500: string;
    neutral600: string;
    neutral700: string;
    neutral800: string;
    neutral900: string;
 *   };
 *   fonts: {
    body: string;
    mono: string;
 *   };
 *   fontSizes: {
    '11': string;
    '12': string;
    '14': string;
    '16': string;
    '18': string;
    '20': string;
    '32': string;
    '38': string;
    '18.4': string;
    '15.2': string;
    '13.3333': string;
 *   };
 *   space: {
    '1': string;
    '14': string;
    '24': string;
    '28': string;
    '32': string;
    '44': string;
    '48': string;
    '50': string;
    '60': string;
    '64': string;
    '105': string;
    '140': string;
    '160': string;
    '396': string;
 *   };
 *   radii: {
    xs: string;
    md: string;
    lg: string;
    full: string;
 *   };
 *   shadows: {
    xs: string;
    md: string;
 *   };
 *   states: {
 *     hover: { opacity: number };
 *     focus: { opacity: number };
 *     active: { opacity: number };
 *     disabled: { opacity: number };
 *   };
 * }
 */

export const theme = {
  "colors": {
    "primary": "#ee4f27",
    "secondary": "#1f192a",
    "accent": "#077ac7",
    "background": "#0e0918",
    "foreground": "#000000",
    "neutral50": "#ffffff",
    "neutral100": "#6f6f6f",
    "neutral200": "#c4bbd3",
    "neutral300": "#e4e4e4",
    "neutral400": "#000000",
    "neutral500": "#4b4b4b",
    "neutral600": "#6b7280",
    "neutral700": "#f5f5f5",
    "neutral800": "#545454",
    "neutral900": "#c1c1c1"
  },
  "fonts": {
    "body": "'Arial', sans-serif",
    "mono": "'SF Mono', monospace"
  },
  "fontSizes": {
    "11": "11px",
    "12": "12px",
    "14": "14px",
    "16": "16px",
    "18": "18px",
    "20": "20px",
    "32": "32px",
    "38": "38px",
    "18.4": "18.4px",
    "15.2": "15.2px",
    "13.3333": "13.3333px"
  },
  "space": {
    "1": "1px",
    "14": "14px",
    "24": "24px",
    "28": "28px",
    "32": "32px",
    "44": "44px",
    "48": "48px",
    "50": "50px",
    "60": "60px",
    "64": "64px",
    "105": "105px",
    "140": "140px",
    "160": "160px",
    "396": "396px"
  },
  "radii": {
    "xs": "2px",
    "md": "7px",
    "lg": "16px",
    "full": "1057px"
  },
  "shadows": {
    "xs": "rgba(255, 255, 255, 0.19) 0px 0px 1.802px 0px, rgba(255, 255, 255, 0.1) 0px 0.451px 0px 0.901px inset",
    "md": "rgba(0, 0, 0, 0.15) 0px 4px 12px 0px"
  },
  "states": {
    "hover": {
      "opacity": 0.08
    },
    "focus": {
      "opacity": 0.12
    },
    "active": {
      "opacity": 0.16
    },
    "disabled": {
      "opacity": 0.38
    }
  }
};

// MUI v5 theme
export const muiTheme = {
  "palette": {
    "primary": {
      "main": "#ee4f27",
      "light": "hsl(12, 85%, 69%)",
      "dark": "hsl(12, 85%, 39%)"
    },
    "secondary": {
      "main": "#1f192a",
      "light": "hsl(261, 25%, 28%)",
      "dark": "hsl(261, 25%, 10%)"
    },
    "background": {
      "default": "#0e0918",
      "paper": "#000000"
    },
    "text": {
      "primary": "#000000",
      "secondary": "#ffffff"
    }
  },
  "typography": {
    "fontFamily": "'Open Sans', sans-serif",
    "h1": {
      "fontSize": "32px",
      "fontWeight": "400",
      "lineHeight": "35.2px"
    },
    "h3": {
      "fontSize": "20px",
      "fontWeight": "400",
      "lineHeight": "30px"
    },
    "body1": {
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "normal"
    }
  },
  "shape": {
    "borderRadius": 7
  },
  "shadows": [
    "rgba(255, 255, 255, 0.19) 0px 0px 1.802px 0px, rgba(255, 255, 255, 0.1) 0px 0.451px 0px 0.901px inset",
    "rgba(0, 0, 0, 0.35) 1px 2px 8px 0px",
    "rgba(0, 0, 0, 0.15) 0px 4px 12px 0px"
  ]
};

export default theme;
