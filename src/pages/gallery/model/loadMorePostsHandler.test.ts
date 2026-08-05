import { describe, it, expect, vi } from "vitest";
import { loadMorePostsHandler } from "./loadMorePostsHandler";

describe("loadMorePostsHandler - запускает загрузку следующей страницы постов", () => {
    it("Запускает загрузку, если элемент-триггер виден, есть следующая страница и загрузка не выполняется", () => {
        const fetchNextPage = vi.fn();

        loadMorePostsHandler(true, true, false, fetchNextPage);

        expect(fetchNextPage).toHaveBeenCalled();
    });

    it("Не запускает загрузку, если элемент-триггер не виден", () => {
        const fetchNextPage = vi.fn();

        loadMorePostsHandler(false, true, false, fetchNextPage);

        expect(fetchNextPage).not.toHaveBeenCalled();
    });

    it("Не запускает загрузку, если следующей страницы нет", () => {
        const fetchNextPage = vi.fn();

        loadMorePostsHandler(true, false, false, fetchNextPage);

        expect(fetchNextPage).not.toHaveBeenCalled();
    });

    it("Не запускает загрузку, если она уже выполняется", () => {
        const fetchNextPage = vi.fn();

        loadMorePostsHandler(true, true, true, fetchNextPage);

        expect(fetchNextPage).not.toHaveBeenCalled();
    });
});
