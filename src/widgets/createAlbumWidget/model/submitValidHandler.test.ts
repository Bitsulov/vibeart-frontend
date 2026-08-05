import { describe, it, expect, vi } from "vitest";
import { submitValidHandler } from "./submitValidHandler";
import { showToast } from "features/toast";
import type { ICreateAlbumForm } from "../lib/types";

const formData: ICreateAlbumForm = {
    img: "",
    title: "Заголовок",
    description: "Описание"
};

const file = new File(["content"], "image.png", { type: "image/png" });

describe("submitValidHandler - обработчик валидной отправки формы создания или редактирования альбома", () => {
    it("Создаёт альбом, если загружена обложка", async () => {
        const createAlbumFn = vi.fn().mockResolvedValue({ data: { uuid: "new-uuid" } });
        const updateAlbumFn = vi.fn();
        const dispatch = vi.fn();
        const onSubmit = vi.fn();

        await submitValidHandler(
            formData,
            createAlbumFn,
            updateAlbumFn,
            true,
            "author-uuid",
            "album-uuid",
            dispatch,
            file,
            undefined,
            "",
            "",
            onSubmit
        );

        expect(createAlbumFn).toHaveBeenCalledWith({
            info: {
                title: "Заголовок",
                description: "Описание",
                authorUuid: "author-uuid"
            },
            file
        });
        expect(updateAlbumFn).not.toHaveBeenCalled();
        expect(onSubmit).toHaveBeenCalled();
    });

    it("Показывает уведомление об ошибке загрузки изображения при создании без обложки", async () => {
        const createAlbumFn = vi.fn();
        const updateAlbumFn = vi.fn();
        const dispatch = vi.fn();
        const onSubmit = vi.fn();

        await submitValidHandler(
            formData,
            createAlbumFn,
            updateAlbumFn,
            true,
            "author-uuid",
            "album-uuid",
            dispatch,
            undefined,
            undefined,
            "",
            "",
            onSubmit
        );

        expect(createAlbumFn).not.toHaveBeenCalled();
        expect(dispatch.mock.calls[0][0]).toMatchObject({
            type: showToast.type,
            payload: { message: "toast.loadImg", type: "error" }
        });
        expect(onSubmit).toHaveBeenCalled();
    });

    it("Показывает уведомление об ошибке загрузки изображения при редактировании без обложки и без сохранённой обложки", async () => {
        const createAlbumFn = vi.fn();
        const updateAlbumFn = vi.fn();
        const dispatch = vi.fn();
        const onSubmit = vi.fn();

        await submitValidHandler(
            formData,
            createAlbumFn,
            updateAlbumFn,
            false,
            "author-uuid",
            "album-uuid",
            dispatch,
            undefined,
            undefined,
            "Заголовок",
            "Описание",
            onSubmit
        );

        expect(updateAlbumFn).not.toHaveBeenCalled();
        expect(dispatch.mock.calls[0][0]).toMatchObject({
            type: showToast.type,
            payload: { message: "toast.loadImg", type: "error" }
        });
    });

    it("Показывает уведомление об успехе без запроса, если данные не изменились", async () => {
        const createAlbumFn = vi.fn();
        const updateAlbumFn = vi.fn();
        const dispatch = vi.fn();
        const onSubmit = vi.fn();

        await submitValidHandler(
            formData,
            createAlbumFn,
            updateAlbumFn,
            false,
            "author-uuid",
            "album-uuid",
            dispatch,
            undefined,
            "https://example.com/img.jpg",
            "Заголовок",
            "Описание",
            onSubmit
        );

        expect(updateAlbumFn).not.toHaveBeenCalled();
        expect(dispatch.mock.calls[0][0]).toMatchObject({
            type: showToast.type,
            payload: { message: "api.albumUpdatedSuccess", type: "success" }
        });
    });

    it("Отправляет запрос на обновление, если название изменилось", async () => {
        const createAlbumFn = vi.fn();
        const updateAlbumFn = vi.fn().mockResolvedValue({ data: { uuid: "album-uuid" } });
        const dispatch = vi.fn();
        const onSubmit = vi.fn();

        await submitValidHandler(
            formData,
            createAlbumFn,
            updateAlbumFn,
            false,
            "author-uuid",
            "album-uuid",
            dispatch,
            undefined,
            "https://example.com/img.jpg",
            "Старое название",
            "Описание",
            onSubmit
        );

        expect(updateAlbumFn).toHaveBeenCalledWith({
            UUID: "album-uuid",
            data: {
                info: {
                    title: "Заголовок",
                    description: "Описание"
                },
                file: undefined
            }
        });
    });

    it("Отправляет запрос на обновление, если загружена новая обложка, даже без изменения текста", async () => {
        const createAlbumFn = vi.fn();
        const updateAlbumFn = vi.fn().mockResolvedValue({ data: { uuid: "album-uuid" } });
        const dispatch = vi.fn();
        const onSubmit = vi.fn();

        await submitValidHandler(
            formData,
            createAlbumFn,
            updateAlbumFn,
            false,
            "author-uuid",
            "album-uuid",
            dispatch,
            file,
            "https://example.com/img.jpg",
            "Заголовок",
            "Описание",
            onSubmit
        );

        expect(updateAlbumFn).toHaveBeenCalledWith({
            UUID: "album-uuid",
            data: {
                info: {
                    title: "Заголовок",
                    description: "Описание"
                },
                file
            }
        });
    });
});
