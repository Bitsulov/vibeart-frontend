import {describe, it, expect, vi} from "vitest";
import {postChooseHandler} from "./postChooseHandler";

const ULID = "01ARZ3NDEKTSV4RRFFQ69G5FAB";
const OTHER_ULID = "01ARZ3NDEKTSV4RRFFQ69G5FAA";

describe("postChooseHandler - переключает выбор поста в модальном окне", () => {
    it("Добавляет ULID в список, если пост не выбран", () => {
        const setSelectedPosts = vi.fn();

        postChooseHandler(false, ULID, setSelectedPosts);

        const updater = setSelectedPosts.mock.calls[0][0];
        expect(updater([])).toContain(ULID);
    });

    it("Удаляет ULID из списка, если пост уже выбран", () => {
        const setSelectedPosts = vi.fn();

        postChooseHandler(true, ULID, setSelectedPosts);

        const updater = setSelectedPosts.mock.calls[0][0];
        const result = updater([OTHER_ULID, ULID]);
        expect(result).not.toContain(ULID);
        expect(result).toContain(OTHER_ULID);
    });

    it("Не затрагивает другие посты при добавлении", () => {
        const setSelectedPosts = vi.fn();

        postChooseHandler(false, ULID, setSelectedPosts);

        const updater = setSelectedPosts.mock.calls[0][0];
        const result = updater([OTHER_ULID]);
        expect(result).toEqual([OTHER_ULID, ULID]);
    });
});
