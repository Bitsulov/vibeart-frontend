import {describe, it, expect} from "vitest";
import {configureStore} from "@reduxjs/toolkit";
import {hintReducer, setText} from "features/mouseHint";
import {hideHint} from "./hideHint";

describe("hideHint - Скрытие подсказки", () => {
    it("Сбрасывает текст подсказки до пустой строки", () => {
        const store = configureStore({reducer: {hint: hintReducer}});
        store.dispatch(setText("Количество подписчиков"));
        hideHint(store.dispatch);
        expect(store.getState().hint.text).toBe("");
    });
});
