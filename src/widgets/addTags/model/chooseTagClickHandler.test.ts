import {describe, it, expect, vi} from "vitest";
import {chooseTagClickHandler} from "./chooseTagClickHandler";

describe("chooseTagClickHandler - обработчик клика на тег", () => {
    it("добавляет тег если его нет в списке", () => {
        const setChosenTags = vi.fn();

        chooseTagClickHandler("art", [], setChosenTags);

        const updater = setChosenTags.mock.calls[0][0];
        expect(updater([])).toEqual(["art"]);
    });

    it("удаляет тег если он уже есть в списке", () => {
        const setChosenTags = vi.fn();

        chooseTagClickHandler("art", ["art", "music"], setChosenTags);

        const updater = setChosenTags.mock.calls[0][0];
        expect(updater(["art", "music"])).toEqual(["music"]);
    });
});
