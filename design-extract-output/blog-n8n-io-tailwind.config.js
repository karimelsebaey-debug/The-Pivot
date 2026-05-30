/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
    colors: {
        primary: {
            '50': 'hsl(12, 85%, 97%)',
            '100': 'hsl(12, 85%, 94%)',
            '200': 'hsl(12, 85%, 86%)',
            '300': 'hsl(12, 85%, 76%)',
            '400': 'hsl(12, 85%, 64%)',
            '500': 'hsl(12, 85%, 50%)',
            '600': 'hsl(12, 85%, 40%)',
            '700': 'hsl(12, 85%, 32%)',
            '800': 'hsl(12, 85%, 24%)',
            '900': 'hsl(12, 85%, 16%)',
            '950': 'hsl(12, 85%, 10%)',
            DEFAULT: '#ee4f27'
        },
        secondary: {
            '50': 'hsl(261, 25%, 97%)',
            '100': 'hsl(261, 25%, 94%)',
            '200': 'hsl(261, 25%, 86%)',
            '300': 'hsl(261, 25%, 76%)',
            '400': 'hsl(261, 25%, 64%)',
            '500': 'hsl(261, 25%, 50%)',
            '600': 'hsl(261, 25%, 40%)',
            '700': 'hsl(261, 25%, 32%)',
            '800': 'hsl(261, 25%, 24%)',
            '900': 'hsl(261, 25%, 16%)',
            '950': 'hsl(261, 25%, 10%)',
            DEFAULT: '#1f192a'
        },
        accent: {
            '50': 'hsl(204, 93%, 97%)',
            '100': 'hsl(204, 93%, 94%)',
            '200': 'hsl(204, 93%, 86%)',
            '300': 'hsl(204, 93%, 76%)',
            '400': 'hsl(204, 93%, 64%)',
            '500': 'hsl(204, 93%, 50%)',
            '600': 'hsl(204, 93%, 40%)',
            '700': 'hsl(204, 93%, 32%)',
            '800': 'hsl(204, 93%, 24%)',
            '900': 'hsl(204, 93%, 16%)',
            '950': 'hsl(204, 93%, 10%)',
            DEFAULT: '#077ac7'
        },
        'neutral-50': '#ffffff',
        'neutral-100': '#6f6f6f',
        'neutral-200': '#c4bbd3',
        'neutral-300': '#e4e4e4',
        'neutral-400': '#000000',
        'neutral-500': '#4b4b4b',
        'neutral-600': '#6b7280',
        'neutral-700': '#f5f5f5',
        'neutral-800': '#545454',
        'neutral-900': '#c1c1c1',
        background: '#0e0918',
        foreground: '#000000'
    },
    fontFamily: {
        sans: [
            'Geomanist',
            'sans-serif'
        ],
        body: [
            'SF Mono',
            'sans-serif'
        ]
    },
    fontSize: {
        '11': [
            '11px',
            {
                lineHeight: '22px'
            }
        ],
        '12': [
            '12px',
            {
                lineHeight: '18px',
                letterSpacing: '0.12px'
            }
        ],
        '14': [
            '14px',
            {
                lineHeight: '21px'
            }
        ],
        '16': [
            '16px',
            {
                lineHeight: 'normal'
            }
        ],
        '18': [
            '18px',
            {
                lineHeight: '23.4px',
                letterSpacing: '0.4px'
            }
        ],
        '20': [
            '20px',
            {
                lineHeight: '30px',
                letterSpacing: '-0.2px'
            }
        ],
        '32': [
            '32px',
            {
                lineHeight: '35.2px'
            }
        ],
        '38': [
            '38px',
            {
                lineHeight: '41.8px'
            }
        ],
        '18.4': [
            '18.4px',
            {
                lineHeight: '23px'
            }
        ],
        '15.2': [
            '15.2px',
            {
                lineHeight: '22.8px'
            }
        ],
        '13.3333': [
            '13.3333px',
            {
                lineHeight: 'normal'
            }
        ]
    },
    spacing: {
        '7': '14px',
        '12': '24px',
        '14': '28px',
        '16': '32px',
        '22': '44px',
        '24': '48px',
        '25': '50px',
        '30': '60px',
        '32': '64px',
        '70': '140px',
        '80': '160px',
        '198': '396px',
        '1px': '1px',
        '105px': '105px'
    },
    borderRadius: {
        xs: '2px',
        md: '7px',
        lg: '16px',
        full: '1057px'
    },
    boxShadow: {
        xs: 'rgba(255, 255, 255, 0.19) 0px 0px 1.802px 0px, rgba(255, 255, 255, 0.1) 0px 0.451px 0px 0.901px inset',
        md: 'rgba(0, 0, 0, 0.15) 0px 4px 12px 0px'
    },
    screens: {
        md: '769px',
        xl: '1280px'
    },
    transitionDuration: {
        '0': '0s',
        '90': '0.09s',
        '100': '0.1s',
        '150': '0.15s',
        '180': '0.18s',
        '200': '0.2s',
        '300': '0.3s',
        '450': '0.45s'
    },
    transitionTimingFunction: {
        default: 'ease',
        custom: 'cubic-bezier(0.4, 0, 0.6, 1)'
    },
    container: {
        center: true,
        padding: '0px'
    },
    maxWidth: {
        container: '1286px'
    }
},
  },
};
