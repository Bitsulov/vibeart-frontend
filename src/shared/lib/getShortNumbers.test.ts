import { describe, it, expect } from "vitest";
import {getShortNumber} from "./getShortNumber";

describe("getShortNumber - английская сокращенная версия числа", () => {
    it("Форматирование 10 в 10", () => {
        expect(getShortNumber(10)).toBe("10");
    });
    it("Форматирование 1000 в 1К", () => {
        expect(getShortNumber(1000)).toBe("1K");
    });
    it("Форматирование 1100 в 1.1К", () => {
        expect(getShortNumber(1100)).toBe("1.1K");
    });
    it("Форматирование 1100 в 1К", () => {
        expect(getShortNumber(1100, 0)).toBe("1K");
    });
    it("Форматирование 999000000 в 999M", () => {
        expect(getShortNumber(999000000)).toBe("999M")
    });
    it("Форматирование 9000000000 в 9B", () => {
        expect(getShortNumber(9000000000)).toBe("9B")
    });
});
