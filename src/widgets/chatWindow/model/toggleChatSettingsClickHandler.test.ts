import {describe, it, expect, vi} from "vitest";
import {toggleChatSettingsClickHandler} from "./toggleChatSettingsClickHandler";

describe("toggleChatSettingsClickHandler - переключает видимость настроек чата", () => {
    it("Передаёт функцию-инвертор в setIsOpenOptions", () => {
        const setIsOpenOptions = vi.fn();
        toggleChatSettingsClickHandler(setIsOpenOptions);

        const updater = setIsOpenOptions.mock.calls[0][0] as (prev: boolean) => boolean;
        expect(updater(false)).toBe(true);
        expect(updater(true)).toBe(false);
    });
});
