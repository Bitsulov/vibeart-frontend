/**
 * @file Глобальная настройка среды выполнения модульных тестов.
 *
 * Подключается через `vitest.config.ts` → `setupFiles` и выполняется
 * один раз перед запуском всего тестового набора.
 *
 * Выполняемые действия:
 * - Расширяет матчеры Vitest пользовательскими матчерами
 *   `@testing-library/jest-dom` (например, `toBeInTheDocument`).
 * - Запускает MSW-сервер перехвата запросов перед всеми тестами
 *   и останавливает его после.
 * - Сбрасывает обработчики запросов и очищает отрендеренные
 *   компоненты после каждого теста.
 * - Определяет заглушку `window.matchMedia`, отсутствующую в jsdom,
 *   чтобы компоненты, использующие медиазапросы, не вызывали ошибок.
 * - Определяет заглушку `window.IntersectionObserver`, отсутствующую
 *   в jsdom, чтобы компоненты с бесконечной подгрузкой не вызывали ошибок.
 */
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi, beforeAll, afterAll } from "vitest";
import { server } from "./mswServer";

beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
afterEach(() => {
    server.resetHandlers();
    cleanup();
});
afterAll(() => server.close());

// Создание фейкового window.matchMedia (jsdom не поддерживает)
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
    }))
});

// Создание фейкового window.IntersectionObserver (jsdom не поддерживает)
class IntersectionObserverMock {
    root: Element | null = null;
    rootMargin: string = "";
    thresholds: ReadonlyArray<number> = [];
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = vi.fn(() => []);
}

Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    value: IntersectionObserverMock
});
