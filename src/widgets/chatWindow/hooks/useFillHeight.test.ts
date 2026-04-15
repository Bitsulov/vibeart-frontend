import {describe, it, expect} from "vitest";
import {renderHook} from "@testing-library/react";
import {useFillHeight} from "./useFillHeight";

describe("useFillHeight - вычисляет высоту элемента до нижнего края viewport", () => {
    it("Возвращает ref и начальный height = undefined", () => {
        const { result } = renderHook(() => useFillHeight<HTMLElement>());
        expect(result.current.ref).toBeDefined();
        expect(result.current.height).toBeUndefined();
    });
});