/**
 * @file Конфигурация сборщика и сервера разработки (Vite).
 *
 * Псевдонимы путей соответствуют слоям Feature-Sliced Design и должны
 * оставаться синхронизированы с `tsconfig.app.json` и `vitest.config.ts`,
 * чтобы разрешение модулей было одинаковым в сервере разработки,
 * системе проверки типов и среде выполнения тестов.
 *
 * @see https://vitejs.dev/config/
 */
import { defineConfig, type ViteDevServer } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import path from "path";

export default defineConfig({
    plugins: [
        reactRouter(),
        !!process.env.PLAYWRIGHT && {
            name: "mock-api",
            configureServer(server: ViteDevServer) {
                server.httpServer?.once("listening", async () => {
                    const { setupServer } = await import("msw/node");
                    const { handlers } = await server.ssrLoadModule(
                        "/src/shared/tests/handlers/index.ts"
                    );
                    setupServer(...handlers).listen({ onUnhandledRequest: "bypass" });
                });
            }
        }
    ],
    server: {
        port: Number(process.env.PORT) || 5173,
        hmr: !process.env.PLAYWRIGHT,
        headers: process.env.PLAYWRIGHT ? { Connection: "close" } : undefined,
        // API запросы отправляются со стороны сервера, что отключает действие CORS политики во время разработки
        proxy: {
            "/api": {
                target: "http://localhost:8080",
                changeOrigin: true,
                configure: proxy => {
                    proxy.on("proxyReq", proxyReq => {
                        proxyReq.removeHeader("origin");
                    });
                }
            }
        }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            shared: path.resolve(__dirname, "src/shared"),
            entities: path.resolve(__dirname, "src/entities"),
            features: path.resolve(__dirname, "src/features"),
            widgets: path.resolve(__dirname, "src/widgets"),
            pages: path.resolve(__dirname, "src/pages"),
            processes: path.resolve(__dirname, "src/processes"),
            app: path.resolve(__dirname, "src/app")
        }
    }
});
