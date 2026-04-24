import {describe, it, expect, vi} from "vitest";
import {deleteButtonClickHandler} from "./deleteButtonClickHandler";

describe("deleteButtonClickHandler - обработчик клика по кнопке удаления изображения", () => {
    it("Очищает input, вызывает setEntityInfo и setLoadedFile", () => {
        const input = document.createElement("input");
        input.value = "file.png";
        const ref = {current: input};
        const setEntityInfo = vi.fn();
        const setLoadedFile = vi.fn();

        deleteButtonClickHandler(ref, setEntityInfo, setLoadedFile);

        expect(input.value).toBe("");
        expect(setLoadedFile).toHaveBeenCalledWith(undefined);

        const updater = setEntityInfo.mock.calls[0][0];
        expect(updater({imageUrl: "blob:url", name: "test"})).toEqual({imageUrl: "", name: "test"});
    });
    it("Не делает ничего если ref.current равен null", () => {
        const ref = {current: null};
        const setEntityInfo = vi.fn();
        const setLoadedFile = vi.fn();

        deleteButtonClickHandler(ref, setEntityInfo, setLoadedFile);

        expect(setEntityInfo).not.toHaveBeenCalled();
        expect(setLoadedFile).not.toHaveBeenCalled();
    });
});
