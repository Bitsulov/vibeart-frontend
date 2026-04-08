import {describe, it, expect, vi} from "vitest";
import {hideHint} from "./hideHint";
import {setText} from "features/mouseHint";

describe("hideHint - скрывает подсказку", () => {
    it("Вызывает setText с пустой строкой", () => {
        const dispatch = vi.fn();

        hideHint(dispatch);

        expect(dispatch).toHaveBeenCalledWith(setText(""));
    });
});
