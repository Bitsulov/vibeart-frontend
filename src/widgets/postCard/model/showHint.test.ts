import {describe, it, expect, vi} from "vitest";
import {showHint} from "./showHint";

vi.mock("features/mouseHint", () => ({
    setText: (text: string) => ({ type: "hint/setText", payload: text }),
}));

describe("showHint - устанавливает текст подсказки", () => {
    it("Вызывает setText с переданным текстом", () => {
        const dispatch = vi.fn();
        showHint(dispatch, "Удалить пост");
        expect(dispatch).toHaveBeenCalledWith({ type: "hint/setText", payload: "Удалить пост" });
    });
});
