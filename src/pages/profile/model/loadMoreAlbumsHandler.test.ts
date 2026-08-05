import { describe, it, expect, vi } from "vitest";
import { loadMoreAlbumsHandler } from "./loadMoreAlbumsHandler";

describe("loadMoreAlbumsHandler - запускает загрузку следующей страницы альбомов", () => {
    it("Запускает загрузку, если есть следующая страница и загрузка не выполняется", () => {
        const fetchNextPage = vi.fn();

        loadMoreAlbumsHandler(true, false, fetchNextPage);

        expect(fetchNextPage).toHaveBeenCalled();
    });

    it("Не запускает загрузку, если следующей страницы нет", () => {
        const fetchNextPage = vi.fn();

        loadMoreAlbumsHandler(false, false, fetchNextPage);

        expect(fetchNextPage).not.toHaveBeenCalled();
    });

    it("Не запускает загрузку, если она уже выполняется", () => {
        const fetchNextPage = vi.fn();

        loadMoreAlbumsHandler(true, true, fetchNextPage);

        expect(fetchNextPage).not.toHaveBeenCalled();
    });
});
