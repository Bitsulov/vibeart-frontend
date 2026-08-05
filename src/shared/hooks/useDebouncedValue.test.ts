import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useDebouncedValue } from "./useDebouncedValue";

describe("useDebouncedValue - откладывает обновление значения", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("Возвращает исходное значение сразу после первого рендера", () => {
        const { result } = renderHook(() => useDebouncedValue("кот", 400));

        expect(result.current).toBe("кот");
    });

    it("Не обновляет значение, пока не прошла задержка", () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebouncedValue(value, 400),
            { initialProps: { value: "к" } }
        );

        rerender({ value: "кот" });
        act(() => vi.advanceTimersByTime(300));

        expect(result.current).toBe("к");
    });

    it("Обновляет значение после того, как прошла задержка", () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebouncedValue(value, 400),
            { initialProps: { value: "к" } }
        );

        rerender({ value: "кот" });
        act(() => vi.advanceTimersByTime(400));

        expect(result.current).toBe("кот");
    });

    it("Сбрасывает предыдущий таймер при повторном изменении значения", () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebouncedValue(value, 400),
            { initialProps: { value: "к" } }
        );

        rerender({ value: "ко" });
        act(() => vi.advanceTimersByTime(300));
        rerender({ value: "кот" });
        act(() => vi.advanceTimersByTime(300));

        expect(result.current).toBe("к");

        act(() => vi.advanceTimersByTime(100));

        expect(result.current).toBe("кот");
    });
});
