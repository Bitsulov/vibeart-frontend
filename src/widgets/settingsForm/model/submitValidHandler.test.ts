import { describe, expect, it, vi } from "vitest";
import { submitValidHandler } from "./submitValidHandler";

const data = {
    avatar: "avatar",
    title: "title",
    id: "id",
    description: "description"
};

describe("submitValidHandler - сброс формы настроек после сохранения", () => {
    it("Вызывает submit корректно", () => {
        const submitFn = vi.fn();
        const dispatch = vi.fn();
        const file = new File(["file"], "name.txt");

        submitValidHandler(data, true, submitFn, dispatch, "UUID", file);

        expect(submitFn).toHaveBeenCalledWith({
            UUID: "UUID",
            data: {
                info: {
                    name: data.title,
                    username: data.id,
                    description: data.description,
                    deleteAvatar: false
                },
                file: file
            }
        });
    });

    it("isDeleteAvatar = false, если файл пустой", () => {
        const submitFn = vi.fn();
        const dispatch = vi.fn();
        const file = new File([""], "name.txt");

        submitValidHandler(data, true, submitFn, dispatch, "UUID", file);

        expect(submitFn).toHaveBeenCalledWith({
            UUID: "UUID",
            data: {
                info: {
                    name: data.title,
                    username: data.id,
                    description: data.description,
                    deleteAvatar: true
                },
                file: file
            }
        });
    });

    it("Уведомление об ошибке, если нет UUID", () => {
        const submitFn = vi.fn();
        const dispatch = vi.fn();

        submitValidHandler(data, true, submitFn, dispatch);

        expect(dispatch.mock.calls[0][0].payload.message).toBe("toast.userNotFoundLater");
    });
});
