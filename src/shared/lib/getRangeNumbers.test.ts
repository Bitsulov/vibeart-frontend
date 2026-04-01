import {describe, it, expect} from "vitest";
import {getRangeNumbers} from "./getRangeNumbers";

describe("getRangeNumbers - начало и конец последовательности чисел равной delta * 2 + 1", () => {
    it("Вернет start = 4 и end = 8", () => {
        expect(getRangeNumbers(6, 15)).toEqual({start: 4, end: 8});
    });
    it("Вернет start = 11 и end = 19, delta = 4, current = 15", () => {
        expect(getRangeNumbers(15, 25, 4)).toEqual({start: 11, end: 19});
    });
    it("Вернет start = 1 и end = 5, delta = 3, current = 2", () => {
        expect(getRangeNumbers(2, 25, 3)).toEqual({start: 1, end: 7});
    });
    it("Вернет start = 4 и end = 6, delta = 2, current = 6", () => {
        expect(getRangeNumbers(6, 6)).toEqual({start: 2, end: 6});
    });
});
