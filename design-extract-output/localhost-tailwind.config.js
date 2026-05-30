/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
    colors: {
        primary: {
            '50': 'hsl(79, 100%, 97%)',
            '100': 'hsl(79, 100%, 94%)',
            '200': 'hsl(79, 100%, 86%)',
            '300': 'hsl(79, 100%, 76%)',
            '400': 'hsl(79, 100%, 64%)',
            '500': 'hsl(79, 100%, 50%)',
            '600': 'hsl(79, 100%, 40%)',
            '700': 'hsl(79, 100%, 32%)',
            '800': 'hsl(79, 100%, 24%)',
            '900': 'hsl(79, 100%, 16%)',
            '950': 'hsl(79, 100%, 10%)',
            DEFAULT: '#d8ff85'
        },
        secondary: {
            '50': 'hsl(175, 53%, 97%)',
            '100': 'hsl(175, 53%, 94%)',
            '200': 'hsl(175, 53%, 86%)',
            '300': 'hsl(175, 53%, 76%)',
            '400': 'hsl(175, 53%, 64%)',
            '500': 'hsl(175, 53%, 50%)',
            '600': 'hsl(175, 53%, 40%)',
            '700': 'hsl(175, 53%, 32%)',
            '800': 'hsl(175, 53%, 24%)',
            '900': 'hsl(175, 53%, 16%)',
            '950': 'hsl(175, 53%, 10%)',
            DEFAULT: '#0a211f'
        },
        accent: {
            '50': 'hsl(153, 35%, 97%)',
            '100': 'hsl(153, 35%, 94%)',
            '200': 'hsl(153, 35%, 86%)',
            '300': 'hsl(153, 35%, 76%)',
            '400': 'hsl(153, 35%, 64%)',
            '500': 'hsl(153, 35%, 50%)',
            '600': 'hsl(153, 35%, 40%)',
            '700': 'hsl(153, 35%, 32%)',
            '800': 'hsl(153, 35%, 24%)',
            '900': 'hsl(153, 35%, 16%)',
            '950': 'hsl(153, 35%, 10%)',
            DEFAULT: '#0a1510'
        },
        'neutral-50': '#000000',
        'neutral-100': '#757575',
        'neutral-200': '#ffffff',
        background: '#f2f4e7',
        foreground: '#000000'
    },
    fontFamily: {
        body: [
            'Plus Jakarta Sans',
            'sans-serif'
        ],
        font3: [
            'Instrument Serif',
            'sans-serif'
        ]
    },
    fontSize: {
        '16': [
            '16px',
            {
                lineHeight: '24px'
            }
        ],
        '18': [
            '18px',
            {
                lineHeight: '29.25px'
            }
        ],
        '24': [
            '24px',
            {
                lineHeight: '32.4px',
                letterSpacing: '-0.24px'
            }
        ],
        '56': [
            '56px',
            {
                lineHeight: '59.36px',
                letterSpacing: '-1.4px'
            }
        ],
        '64': [
            '64px',
            {
                lineHeight: '70.4px',
                letterSpacing: '-1.28px'
            }
        ],
        '136': [
            '136px',
            {
                lineHeight: '136px',
                letterSpacing: '5.44px'
            }
        ],
        '89.6': [
            '89.6px',
            {
                lineHeight: '89.6px',
                letterSpacing: '-1.792px'
            }
        ],
        '76.8': [
            '76.8px',
            {
                lineHeight: '80.64px',
                letterSpacing: '-1.536px'
            }
        ],
        '71.68': [
            '71.68px',
            {
                lineHeight: '75.264px',
                letterSpacing: '-1.4336px'
            }
        ],
        '20.8': [
            '20.8px',
            {
                lineHeight: '20.8px',
                letterSpacing: '-0.832px'
            }
        ],
        '19.2': [
            '19.2px',
            {
                lineHeight: '32.64px',
                letterSpacing: '-0.168px'
            }
        ],
        '18.4': [
            '18.4px',
            {
                lineHeight: '27.6px',
                letterSpacing: '-0.184px'
            }
        ],
        '16.8': [
            '16.8px',
            {
                lineHeight: '28.56px',
                letterSpacing: '-0.168px'
            }
        ],
        '15.2': [
            '15.2px',
            {
                lineHeight: '26.6px'
            }
        ],
        '14.4': [
            '14.4px',
            {
                lineHeight: '21.6px',
                letterSpacing: '-0.144px'
            }
        ]
    },
    spacing: {
        '1': '2px',
        '19': '38px',
        '24': '48px',
        '32': '64px',
        '40': '80px',
        '44': '88px',
        '68': '136px'
    },
    borderRadius: {
        xl: '24px',
        full: '9999px'
    },
    boxShadow: {
        sm: 'rgb(23, 23, 23) 0px 0px 0px 1px'
    },
    transitionDuration: {
        '150': '0.15s',
        '180': '0.18s',
        '200': '0.2s',
        '220': '0.22s',
        '250': '0.25s',
        '280': '0.28s',
        '300': '0.3s',
        '500': '0.5s'
    },
    transitionTimingFunction: {
        custom: 'cubic-bezier(0.23, 0.88, 0.26, 0.92)'
    },
    container: {
        center: true,
        padding: '0px'
    },
    maxWidth: {
        container: '1280px'
    }
},
  },
};
