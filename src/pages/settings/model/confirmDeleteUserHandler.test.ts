import { describe, it, expect, vi } from "vitest";
import { confirmDeleteUserHandler } from "./confirmDeleteUserHandler";
import type { AxiosResponse } from "axios";

describe("confirmDeleteUserHandler - подтверждает удаление пользователя", () => {
    it("Вызывает функцию удаления пользователя с переданным UUID", async () => {
        const deleteUserFn = vi.fn().mockResolvedValue({} as AxiosResponse<string>);

        await confirmDeleteUserHandler("UUID", deleteUserFn);

        expect(deleteUserFn).toHaveBeenCalledWith("UUID");
    });
});
