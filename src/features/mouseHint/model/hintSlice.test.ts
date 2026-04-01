import {describe, expect, it} from "vitest";
import {hintReducer, setText} from "./hintSlice";

const initialState = {text: ""};

describe("hintSlice - слайс текста подсказки у курсора", () => {
    it("Начальное состояние — пустая строка", () => {
        const result = hintReducer(undefined, {type: "@@INIT"});

        expect(result).toEqual(initialState);
    });

    it("Установка текста подсказки", () => {
        const result = hintReducer(initialState, setText("Копировать"));

        expect(result).toEqual({text: "Копировать"});
    });

    it("Сброс текста подсказки в пустую строку", () => {
        const result = hintReducer({text: "Копировать"}, setText(""));

        expect(result).toEqual(initialState);
    });

    it("Перезапись текста подсказки", () => {
        const result = hintReducer({text: "Первый текст"}, setText("Второй текст"));

        expect(result).toEqual({text: "Второй текст"});
    });
});