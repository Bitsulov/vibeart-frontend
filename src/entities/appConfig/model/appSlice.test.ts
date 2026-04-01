import {describe, expect, it} from "vitest";
import {appReducer, setLanguage, setServerStatus, setUnreadChatsCount, setUnreadNotificationsCount} from "./appSlice";
import type {AppConfigType} from "../lib/types";

const initialState: AppConfigType = {
    currentLanguage: "ru",
    serverStatus: "good",
    unreadChatsCount: 0,
    unreadNotificationsCount: 0
}

describe("AppSlice - слайс с данными приложения", () => {
    it("Изменение языка приложения", () => {
        const result = appReducer(initialState, setLanguage("en"));

        expect(result).toEqual({
            ...initialState,
            currentLanguage: "en",
        });
    });
    it("Изменение статуса бекенда", () => {
        const result = appReducer(initialState, setServerStatus("problem"));

        expect(result).toEqual({
            ...initialState,
            serverStatus: "problem",
        });
    });
    it("Изменение количества чатов с непрочитанными сообщениями", () => {
        const result = appReducer(initialState, setUnreadChatsCount(1));

        expect(result).toEqual({
            ...initialState,
            unreadChatsCount: 1
        });
    });
    it("Изменение количества непрочитанных уведомлений", () => {
        const result = appReducer(initialState, setUnreadNotificationsCount(1));

        expect(result).toEqual({
            ...initialState,
            unreadNotificationsCount: 1
        });
    });
});
