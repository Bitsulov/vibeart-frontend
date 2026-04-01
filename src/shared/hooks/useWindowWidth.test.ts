import {beforeEach, describe, expect, it} from "vitest";
import {act, renderHook} from "@testing-library/react";
import {useWindowWidth} from "./useWindowWidth";

describe("useWindowWidth - Возвращает ширину экрана width", () => {
    beforeEach(() => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 1024,
        });
    });
    it("Возвращает начальную ширину окна (1024)", async () => {
        const {result} = renderHook(() => useWindowWidth());

        expect(result.current).toBe(1024);
    });
    it('Обновляет ширину при resize (1200)', () => {
        const { result } = renderHook(() => useWindowWidth());

        act(() => {
            Object.defineProperty(window, "innerWidth", { value: 1200 });
            window.dispatchEvent(new Event("resize"));
        });

        expect(result.current).toBe(1200);
    });
});
