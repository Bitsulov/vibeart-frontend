/**
 * @file Конфигурация сквозного тестирования (Playwright).
 *
 * Тесты расположены в директории `./e2e` и взаимодействуют с локальным
 * сервером разработки на http://localhost:5173.
 *
 * Перед каждым набором тестов выполняется общий шаг настройки
 * (`global.setup.ts`), в котором производится авторизация.
 * Все браузерные проекты объявлены зависимыми от этого шага.
 *
 * Матрица браузеров:
 *   - Desktop Chromium (Chrome)
 *   - Mobile Chromium (Pixel 7)
 *   - Firefox
 *   - Desktop WebKit (Safari)
 *   - Mobile WebKit (iPhone 13)
 *
 * Поведение в среде непрерывной интеграции:
 *   - `forbidOnly` запрещает случайно закоммиченные вызовы `.only`,
 *     которые привели бы к пропуску остального набора тестов.
 *   - Повторных попыток при сбое: 4, чтобы поглотить нестабильные тесты.
 *   - Количество параллельных процессов ограничено до 1 во избежание
 *     конкуренции за ресурсы.
 *   - `globalTimeout` — предохранитель на весь прогон: WebKit на Windows
 *     иногда крашится посреди теста так, что раннер не получает сигнал
 *     о крахе и зависает без таймаута на уровне отдельного теста.
 *     `globalTimeout` работает по таймеру самого раннера и в этом случае
 *     всё равно прерывает прогон.
 *
 * @see https://playwright.dev/docs/test-configuration
 */
import { defineConfig, devices } from "@playwright/test";

const isWindows = process.platform === "win32";
const PORT = Number(process.env.PORT) || 5173;

export default defineConfig({
    testDir: "./e2e",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: 4,
    workers: process.env.CI ? 1 : 3,
    globalTimeout: 45 * 60 * 1000,
    reporter: [["html", { open: "never" }]],
    expect: {
        toHaveScreenshot: { animations: "disabled", maxDiffPixelRatio: 0.02 }
    },
    use: {
        baseURL: `http://localhost:${PORT}`,
        trace: "on-first-retry",
        storageState: {
            cookies: [
                {
                    name: "acceptedCookie",
                    value: "1",
                    domain: "localhost",
                    path: "/",
                    expires: -1,
                    httpOnly: false,
                    secure: false,
                    sameSite: "Lax"
                }
            ],
            origins: []
        }
    },
    projects: [
        { name: "setup", testMatch: "**/global.setup.ts" },
        {
            name: "Desktop Chromium",
            use: { ...devices["Desktop Chrome"] },
            dependencies: ["setup"]
        },
        {
            name: "Mobile Chromium",
            use: { ...devices["Pixel 7"] },
            dependencies: ["setup"]
        },
        {
            name: "Firefox",
            use: { ...devices["Desktop Firefox"] },
            dependencies: ["setup"]
        },
        ...((!isWindows && [
            {
                name: "Desktop Webkit",
                use: { ...devices["Desktop Safari"] },
                dependencies: ["setup"]
            },
            {
                name: "Mobile Webkit",
                use: { ...devices["iPhone 13"] },
                dependencies: ["setup"]
            }
        ]) ||
            [])
    ],
    webServer: {
        command: "npm run dev",
        url: `http://localhost:${PORT}`,
        env: { PLAYWRIGHT: "1", PORT: String(PORT) },
        reuseExistingServer: !process.env.CI
    }
});
