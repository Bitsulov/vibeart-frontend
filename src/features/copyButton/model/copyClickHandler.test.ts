import {describe, expect, it, vi} from "vitest";
import {copyClickHandler} from "./copyClickHandler";

describe("copyClickHandler - обработчик кнопки копирования", () => {
    it("вызов функции", async () => {
        const copyFn = vi.fn().mockResolvedValue(undefined);
        const setIsShowHintMock = vi.fn();

        Object.assign(navigator, {
            clipboard: {
                writeText: copyFn,
            },
        });

        copyClickHandler("t", setIsShowHintMock);

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith("t");
        expect(setIsShowHintMock).toHaveBeenCalledWith(true);
    })
});
