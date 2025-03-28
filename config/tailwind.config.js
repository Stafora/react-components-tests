import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    content: [
        path.join(__dirname, '../src/**/*.{js,jsx,ts,tsx}')
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
