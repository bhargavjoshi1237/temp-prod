import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                'vercel-gray': {
                    100: '#fafafa',
                    200: '#eaeaea',
                    300: '#999999',
                    400: '#888888',
                    500: '#666666',
                    600: '#444444',
                    700: '#333333',
                    800: '#222222',
                    900: '#111111',
                },
                'vercel-blue': '#0070f3',
                'vercel-pink': '#ff0080',
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
};
