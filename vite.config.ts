import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import Pages from 'vite-plugin-pages';

import Inspect from 'vite-plugin-inspect';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [Inspect(), react(), Pages()],
});
