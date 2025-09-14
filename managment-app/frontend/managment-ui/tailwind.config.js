/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}', // Incluye todos los archivos en src
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-purple-turquoise': 'linear-gradient(to right, #6B46C1, #319795)',
            },
            colors: {
                primary: '#6B46C1',
                secondary: '#319795',
            },
        },
    },
    plugins: [],
};