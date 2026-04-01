import {describe, expect, it} from "vitest";
import {useMousePosition} from "./useMousePosition";
import {act, renderHook} from "@testing-library/react";

describe("useMousePosition - Возвращает позицию мыши {x, y}", () => {
    it("Вернет {x: 100, y: 200}", async () => {
        const {result} = renderHook(() => useMousePosition());

        act(() => {
            window.dispatchEvent(
                new MouseEvent("mousemove", {
                    clientX: 100,
                    clientY: 200
                })
            );
        });

        expect(result.current).toEqual({ x: 100, y: 200 });
    });
});
