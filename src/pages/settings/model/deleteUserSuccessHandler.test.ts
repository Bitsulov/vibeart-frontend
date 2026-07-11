import { describe, it, expect, vi } from "vitest";
import { deleteUserSuccessHandler } from "./deleteUserSuccessHandler";
import { setUserInfo } from "entities/user";
import { showToast } from "features/toast";

vi.mock("shared/lib/clearCookiesTokens", () => ({
    clearCookiesTokens: vi.fn()
}));

import { clearCookiesTokens } from "shared/lib/clearCookiesTokens";

describe("deleteUserSuccessHandler - обрабатывает успешное удаление пользователя", () => {
    it("Очищает куки-файлы с токенами", () => {
        deleteUserSuccessHandler(vi.fn(), vi.fn(), vi.fn());

        expect(clearCookiesTokens).toHaveBeenCalledOnce();
    });

    it("Закрывает окно подтверждения удаления", () => {
        const setIsShowModal = vi.fn();

        deleteUserSuccessHandler(vi.fn(), vi.fn(), setIsShowModal);

        expect(setIsShowModal).toHaveBeenCalledWith(false);
    });

    it("Сбрасывает состояние пользователя в Redux", () => {
        const dispatch = vi.fn();

        deleteUserSuccessHandler(vi.fn(), dispatch, vi.fn());

        expect(dispatch).toHaveBeenCalledWith(
            setUserInfo({
                UUID: "",
                email: "",
                name: "",
                username: "",
                trustStatus: "TRUST",
                isAuthenticated: false,
                isBlocked: false,
                role: "USER",
                avatarUrl: "",
                accessToken: "",
                refreshToken: "",
                accessTokenExpiresIn: 0,
                refreshTokenExpiresIn: 0
            })
        );
    });

    it("Показывает уведомление об успешном удалении", () => {
        const dispatch = vi.fn();

        deleteUserSuccessHandler(vi.fn(), dispatch, vi.fn());

        expect(
            dispatch.mock.calls.some(
                call =>
                    call[0]?.type === showToast.type &&
                    call[0]?.payload?.message === "api.deleteUserSuccess" &&
                    call[0]?.payload?.type === "success"
            )
        ).toBe(true);
    });

    it("Перенаправляет на главную страницу", () => {
        const navigate = vi.fn();

        deleteUserSuccessHandler(navigate, vi.fn(), vi.fn());

        expect(navigate).toHaveBeenCalledWith("/");
    });
});
