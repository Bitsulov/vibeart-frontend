import {describe, expect, it} from "vitest";
import {getLocalTimeString} from "./getLocalTimeString";

describe("getLocalTimeString - Возвращает дату в виде числового дня, текстового месяца и числового года для текущего языка", () => {
    it("Вернет 11 октября 2007", () => {
        expect(getLocalTimeString("ru", new Date(2007, 9, 11).toISOString())).toBe("11 октября 2007 г.");
    });
    it("Вернет January 1 2000", () => {
        expect(getLocalTimeString("en", new Date(2000, 0, 1).toISOString())).toBe("January 1, 2000")
    })
});
