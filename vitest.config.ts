import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/shared/tests/setup.ts'],
        exclude: [
            '**/node_modules/**',
            '**/e2e/**',
        ],
        css: {
            modules: { classNameStrategy: 'non-scoped' }
        },
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html'],
            include: ['src/**/*.{ts,tsx}'],
            exclude: ['src/**/*.stories.*', 'src/**/*.d.ts', 'src/**/mockConst.ts'],
            thresholds: { lines: 65, functions: 65 }
        }
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
            shared: resolve(__dirname, "src/shared"),
            entities: resolve(__dirname, "src/entities"),
            features: resolve(__dirname, "src/features"),
            widgets: resolve(__dirname, "src/widgets"),
            pages: resolve(__dirname, "src/pages"),
            processes: resolve(__dirname, "src/processes"),
            app: resolve(__dirname, "src/app")
        }
    }
});
