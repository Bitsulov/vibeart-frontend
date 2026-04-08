import {describe, it, expect, vi} from "vitest";
import {showHint} from "./showHint";
import {setText} from "features/mouseHint";

describe("showHint - отображает подсказку с переданным текстом", () => {
    it("Вызывает setText с переданным текстом текстом", () => {
        const dispatch = vi.fn();

        showHint(dispatch, "Удалить альбом");

        expect(dispatch).toHaveBeenCalledWith(setText("Удалить альбом"));
    });
});
