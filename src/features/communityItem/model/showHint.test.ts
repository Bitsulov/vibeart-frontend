import {describe, it, expect} from "vitest";
import {configureStore} from "@reduxjs/toolkit";
import {hintReducer} from "features/mouseHint";
import {showHint} from "./showHint";

describe("showHint - Показ подсказки", () => {
    it("Устанавливает текст подсказки в store", () => {
        const store = configureStore({reducer: {hint: hintReducer}});
        showHint(store.dispatch, "Количество подписчиков");
        expect(store.getState().hint.text).toBe("Количество подписчиков");
    });

    it("Устанавливает пустую строку как текст", () => {
        const store = configureStore({reducer: {hint: hintReducer}});
        showHint(store.dispatch, "");
        expect(store.getState().hint.text).toBe("");
    });
});
