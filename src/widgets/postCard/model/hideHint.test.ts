import {describe, it, expect, vi} from "vitest";
import {hideHint} from "./hideHint";

vi.mock("features/mouseHint", () => ({
    setText: (text: string) => ({ type: "hint/setText", payload: text }),
}));

describe("hideHint - сбрасывает текст подсказки", () => {
    it("Диспатчит setText с пустой строкой", () => {
        const dispatch = vi.fn();
        hideHint(dispatch);
        expect(dispatch).toHaveBeenCalledWith({ type: "hint/setText", payload: "" });
    });
});
