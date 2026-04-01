import {describe, expect, it} from "vitest";
import {getLocalTimeNumbers} from "./getLocalTimeNumbers";

describe("getLocalTimeNumbers - Возвращает дату в виде чисел для текущего языка", () => {
    it("Вернет 11.10.2007", () => {
        expect(getLocalTimeNumbers("ru", new Date(2007, 9, 11).toISOString())).toBe("11.10.2007");
    });
    it("Вернет 01/1/2000", () => {
        expect(getLocalTimeNumbers("en", new Date(2000, 0, 1).toISOString())).toBe("01/1/2000");
    })
});
