// React Theme — extracted from http://localhost:3001
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
 *   };
 *   fonts: {
    body: string;
 *   };
 *   fontSizes: {
    '18': string;
    '24': string;
    '56': string;
    '64': string;
    '136': string;
    '89.6': string;
    '76.8': string;
    '71.68': string;
    '20.8': string;
    '19.2': string;
    '18.4': string;
    '16.8': string;
 *   };
 *   space: {
    '2': string;
    '38': string;
    '48': string;
    '64': string;
    '80': string;
    '88': string;
    '136': string;
 *   };
 *   radii: {
    xl: string;
    full: string;
 *   };
 *   shadows: {
    sm: string;
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
    "primary": "#d8ff85",
    "secondary": "#0a211f",
    "accent": "#0a1510",
    "background": "#f2f4e7",
    "foreground": "#000000",
    "neutral50": "#000000",
    "neutral100": "#757575",
    "neutral200": "#ffffff"
  },
  "fonts": {
    "body": "'Plus Jakarta Sans', sans-serif"
  },
  "fontSizes": {
    "18": "18px",
    "24": "24px",
    "56": "56px",
    "64": "64px",
    "136": "136px",
    "89.6": "89.6px",
    "76.8": "76.8px",
    "71.68": "71.68px",
    "20.8": "20.8px",
    "19.2": "19.2px",
    "18.4": "18.4px",
    "16.8": "16.8px"
  },
  "space": {
    "2": "2px",
    "38": "38px",
    "48": "48px",
    "64": "64px",
    "80": "80px",
    "88": "88px",
    "136": "136px"
  },
  "radii": {
    "xl": "24px",
    "full": "9999px"
  },
  "shadows": {
    "sm": "rgb(23, 23, 23) 0px 0px 0px 1px"
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
      "main": "#d8ff85",
      "light": "hsl(79, 100%, 91%)",
      "dark": "hsl(79, 100%, 61%)"
    },
    "secondary": {
      "main": "#0a211f",
      "light": "hsl(175, 53%, 23%)",
      "dark": "hsl(175, 53%, 10%)"
    },
    "background": {
      "default": "#f2f4e7",
      "paper": "#0a1510"
    },
    "text": {
      "primary": "#000000",
      "secondary": "#0a211f"
    }
  },
  "typography": {
    "fontFamily": "'Inter Tight', sans-serif",
    "h1": {
      "fontSize": "56px",
      "fontWeight": "400",
      "lineHeight": "59.36px"
    }
  },
  "shape": {
    "borderRadius": 24
  },
  "shadows": [
    "rgb(23, 23, 23) 0px 0px 0px 1px, rgba(255, 255, 255, 0.14) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.24) 0px 16px 32px -8px",
    "rgb(23, 23, 23) 0px 0px 0px 1px"
  ]
};

export default theme;
