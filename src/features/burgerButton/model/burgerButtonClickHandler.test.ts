import {describe, expect, it, vi} from "vitest";
import {burgerButtonClickHandler} from "./burgerButtonClickHandler";

describe("burgerButtonClickHandler - клик обработчик burgerButton", () => {
    it("Вызов функции", () => {
        const setIsBurgerOpen = vi.fn();

        burgerButtonClickHandler(setIsBurgerOpen);

        const calledWith = setIsBurgerOpen.mock.calls[0][0]; // достаём функцию из мока
        expect(calledWith(false)).toBe(true);
        expect(calledWith(true)).toBe(false);
    });
});
