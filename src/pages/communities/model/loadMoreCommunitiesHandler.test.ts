import { describe, it, expect, vi } from "vitest";
import { loadMoreCommunitiesHandler } from "./loadMoreCommunitiesHandler";

describe("loadMoreCommunitiesHandler - запускает загрузку следующей страницы сообществ", () => {
    it("Запускает загрузку, если элемент-триггер виден, есть следующая страница и загрузка не выполняется", () => {
        const fetchNextPage = vi.fn();

        loadMoreCommunitiesHandler(true, true, false, fetchNextPage);

        expect(fetchNextPage).toHaveBeenCalled();
    });

    it("Не запускает загрузку, если элемент-триггер не виден", () => {
        const fetchNextPage = vi.fn();

        loadMoreCommunitiesHandler(false, true, false, fetchNextPage);

        expect(fetchNextPage).not.toHaveBeenCalled();
    });

    it("Не запускает загрузку, если следующей страницы нет", () => {
        const fetchNextPage = vi.fn();

        loadMoreCommunitiesHandler(true, false, false, fetchNextPage);

        expect(fetchNextPage).not.toHaveBeenCalled();
    });

    it("Не запускает загрузку, если она уже выполняется", () => {
        const fetchNextPage = vi.fn();

        loadMoreCommunitiesHandler(true, true, true, fetchNextPage);

        expect(fetchNextPage).not.toHaveBeenCalled();
    });
});
