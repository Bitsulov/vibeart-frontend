import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 1,
    workers: process.env.CI ? 1 : 3,
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:5173',
        trace: 'on-first-retry',
    },
    projects: [
        { name: 'setup', testMatch: '**/global.setup.ts' },
        {
            name: 'Desktop Chromium',
            use: { ...devices['Desktop Chrome'] },
            dependencies: ['setup'],
        },
        {
            name: 'Mobile Chromium',
            use: { ...devices["Pixel 7"] },
            dependencies: ['setup'],
        },
        {
            name: 'Firefox',
            use: { ...devices['Desktop Firefox'] },
            dependencies: ['setup'],
        },
        {
            name: 'Desktop Webkit',
            use: { ...devices['Desktop Safari'] },
            dependencies: ['setup'],
        },
        {
            name: 'Mobile Webkit',
            use: { ...devices['iPhone 13'] },
            dependencies: ['setup'],
        },
    ],
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:5173',
        reuseExistingServer: !process.env.CI,
    },
});
