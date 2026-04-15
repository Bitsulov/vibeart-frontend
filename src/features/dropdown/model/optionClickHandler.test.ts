import {describe, it, expect, vi} from "vitest";
import {optionClickHandler} from "./optionClickHandler";

describe("optionClickHandler - закрывает список и вызывает onClick", () => {
    it("Вызывает setIsOpen(false)", () => {
        const setIsOpen = vi.fn();
        optionClickHandler(vi.fn(), setIsOpen);
        expect(setIsOpen).toHaveBeenCalledWith(false);
    });

    it("Вызывает переданный onClick", () => {
        const onClick = vi.fn();
        optionClickHandler(onClick, vi.fn());
        expect(onClick).toHaveBeenCalledOnce();
    });
});
