import { describe, it, expect, vi } from "vitest";
import { submitValidHandler } from "./submitValidHandler";
import { showToast } from "features/toast";
import type { ICreatePostForm } from "../lib/types";

const formData: ICreatePostForm = {
    img: "",
    title: "Заголовок",
    description: "Описание"
};

const file = new File(["content"], "image.png", { type: "image/png" });

describe("submitValidHandler - обработчик валидной отправки формы создания или редактирования поста", () => {
    it("Создаёт пост от имени пользователя, если загружен файл и это не сообщество", async () => {
        const createPostFn = vi.fn().mockResolvedValue({ data: { uuid: "new-uuid" } });
        const updatePostFn = vi.fn();
        const dispatch = vi.fn();
        const onSubmit = vi.fn();

        await submitValidHandler(
            formData,
            createPostFn,
            updatePostFn,
            true,
            ["tag1"],
            "author-uuid",
            "post-uuid",
            dispatch,
            file,
            undefined,
            "",
            "",
            [],
            false,
            "community-uuid",
            onSubmit
        );

        expect(createPostFn).toHaveBeenCalledWith({
            info: {
                title: "Заголовок",
                description: "Описание",
                authorUuid: "author-uuid",
                userCreated: true,
                tagsTitles: ["tag1"]
            },
            file
        });
        expect(updatePostFn).not.toHaveBeenCalled();
        expect(onSubmit).toHaveBeenCalled();
    });

    it("Создаёт пост от имени сообщества, если isCommunity = true", async () => {
        const createPostFn = vi.fn().mockResolvedValue({ data: { uuid: "new-uuid" } });
        const updatePostFn = vi.fn();
        const dispatch = vi.fn();
        const onSubmit = vi.fn();

        await submitValidHandler(
            formData,
            createPostFn,
            updatePostFn,
            true,
            ["tag1"],
            "author-uuid",
            "post-uuid",
            dispatch,
            file,
            undefined,
            "",
            "",
            [],
            true,
            "community-uuid",
            onSubmit
        );

        expect(createPostFn).toHaveBeenCalledWith({
            info: {
                title: "Заголовок",
                description: "Описание",
                authorUuid: "community-uuid",
                userCreated: false,
                tagsTitles: ["tag1"]
            },
            file
        });
    });

    it("Показывает уведомление об ошибке загрузки изображения при создании без файла", async () => {
        const createPostFn = vi.fn();
        const updatePostFn = vi.fn();
        const dispatch = vi.fn();
        const onSubmit = vi.fn();

        await submitValidHandler(
            formData,
            createPostFn,
            updatePostFn,
            true,
            [],
            "author-uuid",
            "post-uuid",
            dispatch,
            undefined,
            undefined,
            "",
            "",
            [],
            false,
            "",
            onSubmit
        );

        expect(createPostFn).not.toHaveBeenCalled();
        expect(dispatch.mock.calls[0][0]).toMatchObject({
            type: showToast.type,
            payload: { message: "toast.loadImg", type: "error" }
        });
        expect(onSubmit).toHaveBeenCalled();
    });

    it("Показывает уведомление об ошибке загрузки изображения при редактировании без файла и без сохранённого изображения", async () => {
        const createPostFn = vi.fn();
        const updatePostFn = vi.fn();
        const dispatch = vi.fn();
        const onSubmit = vi.fn();

        await submitValidHandler(
            formData,
            createPostFn,
            updatePostFn,
            false,
            [],
            "author-uuid",
            "post-uuid",
            dispatch,
            undefined,
            undefined,
            "Заголовок",
            "Описание",
            [],
            false,
            "",
            onSubmit
        );

        expect(updatePostFn).not.toHaveBeenCalled();
        expect(dispatch.mock.calls[0][0]).toMatchObject({
            type: showToast.type,
            payload: { message: "toast.loadImg", type: "error" }
        });
    });

    it("Показывает уведомление об успехе без запроса, если данные не изменились", async () => {
        const createPostFn = vi.fn();
        const updatePostFn = vi.fn();
        const dispatch = vi.fn();
        const onSubmit = vi.fn();

        await submitValidHandler(
            formData,
            createPostFn,
            updatePostFn,
            false,
            ["tag1", "tag2"],
            "author-uuid",
            "post-uuid",
            dispatch,
            undefined,
            "https://example.com/img.jpg",
            "Заголовок",
            "Описание",
            ["tag2", "tag1"],
            false,
            "",
            onSubmit
        );

        expect(updatePostFn).not.toHaveBeenCalled();
        expect(dispatch.mock.calls[0][0]).toMatchObject({
            type: showToast.type,
            payload: { message: "api.postUpdatedSuccess", type: "success" }
        });
    });

    it("Отправляет запрос на обновление, если заголовок изменился", async () => {
        const createPostFn = vi.fn();
        const updatePostFn = vi.fn().mockResolvedValue({ data: { uuid: "post-uuid" } });
        const dispatch = vi.fn();
        const onSubmit = vi.fn();

        await submitValidHandler(
            formData,
            createPostFn,
            updatePostFn,
            false,
            ["tag1"],
            "author-uuid",
            "post-uuid",
            dispatch,
            undefined,
            "https://example.com/img.jpg",
            "Старый заголовок",
            "Описание",
            ["tag1"],
            false,
            "",
            onSubmit
        );

        expect(updatePostFn).toHaveBeenCalledWith({
            UUID: "post-uuid",
            data: {
                info: {
                    title: "Заголовок",
                    description: "Описание",
                    tagsTitles: ["tag1"]
                },
                file: undefined
            }
        });
    });

    it("Отправляет запрос на обновление, если загружен новый файл, даже без изменения текста", async () => {
        const createPostFn = vi.fn();
        const updatePostFn = vi.fn().mockResolvedValue({ data: { uuid: "post-uuid" } });
        const dispatch = vi.fn();
        const onSubmit = vi.fn();

        await submitValidHandler(
            formData,
            createPostFn,
            updatePostFn,
            false,
            ["tag1"],
            "author-uuid",
            "post-uuid",
            dispatch,
            file,
            "https://example.com/img.jpg",
            "Заголовок",
            "Описание",
            ["tag1"],
            false,
            "",
            onSubmit
        );

        expect(updatePostFn).toHaveBeenCalledWith({
            UUID: "post-uuid",
            data: {
                info: {
                    title: "Заголовок",
                    description: "Описание",
                    tagsTitles: ["tag1"]
                },
                file
            }
        });
    });
});
