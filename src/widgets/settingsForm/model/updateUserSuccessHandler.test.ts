import { describe, it, expect, vi } from "vitest";
import { updateUserSuccessHandler } from "./updateUserSuccessHandler";
import { setUserInfo, userResponseMock } from "entities/user";
import { showToast } from "features/toast";
import type { AxiosResponse } from "axios";
import type { UserResponse } from "entities/user";
import type { QueryClient } from "@tanstack/react-query";

function createResponse(): AxiosResponse<UserResponse> {
    return { data: userResponseMock } as AxiosResponse<UserResponse>;
}

describe("updateUserSuccessHandler - обрабатывает успешное обновление данных пользователя", () => {
    it("Сбрасывает все поля формы настроек", () => {
        const setValue = vi.fn();
        const queryClient = { invalidateQueries: vi.fn() } as unknown as QueryClient;

        updateUserSuccessHandler(
            createResponse(),
            setValue,
            vi.fn(),
            queryClient,
            "UUID"
        );

        expect(setValue).toHaveBeenCalledWith("avatar", "");
        expect(setValue).toHaveBeenCalledWith("title", "");
        expect(setValue).toHaveBeenCalledWith("description", "");
        expect(setValue).toHaveBeenCalledWith("id", "");
    });

    it("Сбрасывает кеш пользователя, если передан UUID", () => {
        const queryClient = { invalidateQueries: vi.fn() } as unknown as QueryClient;

        updateUserSuccessHandler(createResponse(), vi.fn(), vi.fn(), queryClient, "UUID");

        expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
            queryKey: ["user UUID"]
        });
    });

    it("Не сбрасывает кеш пользователя, если UUID не передан", () => {
        const queryClient = { invalidateQueries: vi.fn() } as unknown as QueryClient;

        updateUserSuccessHandler(createResponse(), vi.fn(), vi.fn(), queryClient);

        expect(queryClient.invalidateQueries).not.toHaveBeenCalled();
    });

    it("Записывает обновлённые данные пользователя в Redux", () => {
        const dispatch = vi.fn();
        const queryClient = { invalidateQueries: vi.fn() } as unknown as QueryClient;

        updateUserSuccessHandler(
            createResponse(),
            vi.fn(),
            dispatch,
            queryClient,
            "UUID"
        );

        expect(dispatch).toHaveBeenCalledWith(
            setUserInfo({
                name: userResponseMock.name,
                username: userResponseMock.username,
                avatarUrl: userResponseMock.avatarUrl
            })
        );
    });

    it("Показывает уведомление об успешном обновлении", () => {
        const dispatch = vi.fn();
        const queryClient = { invalidateQueries: vi.fn() } as unknown as QueryClient;

        updateUserSuccessHandler(
            createResponse(),
            vi.fn(),
            dispatch,
            queryClient,
            "UUID"
        );

        expect(dispatch.mock.calls[1][0]).toMatchObject({
            type: showToast.type,
            payload: { message: "api.userDataUpdated", type: "success" }
        });
    });
});
