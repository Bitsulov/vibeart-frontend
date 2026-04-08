import {describe, it, expect, vi} from "vitest";
import {searchHandler} from "./searchHandler";
import type React from "react";

describe("searchHandler - обновляет значение строки поиска", () => {
    it("Вызывает setSearchValue с value из события", () => {
        const setSearchValue = vi.fn();
        const event = { target: { value: "портрет" } } as React.ChangeEvent<HTMLInputElement>;

        searchHandler(event, setSearchValue);

        expect(setSearchValue).toHaveBeenCalledWith("портрет");
    });

    it("Передаёт пустую строку, если поле очищено", () => {
        const setSearchValue = vi.fn();
        const event = { target: { value: "" } } as React.ChangeEvent<HTMLInputElement>;

        searchHandler(event, setSearchValue);

        expect(setSearchValue).toHaveBeenCalledWith("");
    });
});
