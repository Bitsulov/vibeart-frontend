import { describe, it, expect, vi } from "vitest";
import { submitValidHandler } from "./submitValidHandler";
import { showToast } from "features/toast";
import type { ICreateCommunityForm } from "../lib/types";

const formData: ICreateCommunityForm = {
    avatar: "",
    title: "Заголовок",
    description: "Описание",
    id: "community-id"
};

const originalData = {
    title: "Заголовок",
    description: "Описание",
    username: "community-id",
    tags: ["art"],
    adminsUuids: ["admin-uuid"]
};

const file = new File(["content"], "image.png", { type: "image/png" });

describe("submitValidHandler - обработчик валидной отправки формы создания или редактирования сообщества", () => {
    it("Создаёт сообщество с переданными тегами и администраторами", async () => {
        const createCommunityFn = vi
            .fn()
            .mockResolvedValue({ data: { uuid: "new-uuid" } });
        const updateCommunityFn = vi.fn();
        const dispatch = vi.fn();
        const onSubmit = vi.fn();

        await submitValidHandler(
            formData,
            createCommunityFn,
            updateCommunityFn,
            true,
            ["art"],
            ["admin-uuid"],
            "author-uuid",
            "community-uuid",
            false,
            dispatch,
            file,
            originalData,
            onSubmit
        );

        expect(createCommunityFn).toHaveBeenCalledWith({
            info: {
                title: "Заголовок",
                description: "Описание",
                username: "community-id",
                tagsTitles: ["art"],
                adminsUuids: ["admin-uuid"],
                userId: "author-uuid"
            },
            file
        });
        expect(updateCommunityFn).not.toHaveBeenCalled();
        expect(onSubmit).toHaveBeenCalled();
    });

    it("Не отправляет username, если id пустой", async () => {
        const createCommunityFn = vi
            .fn()
            .mockResolvedValue({ data: { uuid: "new-uuid" } });
        const updateCommunityFn = vi.fn();
        const dispatch = vi.fn();
        const onSubmit = vi.fn();

        await submitValidHandler(
            { ...formData, id: "" },
            createCommunityFn,
            updateCommunityFn,
            true,
            [],
            [],
            "author-uuid",
            "community-uuid",
            false,
            dispatch,
            undefined,
            originalData,
            onSubmit
        );

        expect(createCommunityFn).toHaveBeenCalledWith({
            info: {
                title: "Заголовок",
                description: "Описание",
                username: undefined,
                tagsTitles: [],
                adminsUuids: [],
                userId: "author-uuid"
            },
            file: undefined
        });
    });

    it("Показывает уведомление об успехе без запроса, если данные не изменились", async () => {
        const createCommunityFn = vi.fn();
        const updateCommunityFn = vi.fn();
        const dispatch = vi.fn();
        const onSubmit = vi.fn();

        await submitValidHandler(
            formData,
            createCommunityFn,
            updateCommunityFn,
            false,
            ["art"],
            ["admin-uuid"],
            "author-uuid",
            "community-uuid",
            false,
            dispatch,
            undefined,
            originalData,
            onSubmit
        );

        expect(updateCommunityFn).not.toHaveBeenCalled();
        expect(dispatch.mock.calls[0][0]).toMatchObject({
            type: showToast.type,
            payload: { message: "api.communityUpdatedSuccess", type: "success" }
        });
        expect(onSubmit).toHaveBeenCalled();
    });

    it("Отправляет запрос на обновление, если название изменилось", async () => {
        const createCommunityFn = vi.fn();
        const updateCommunityFn = vi
            .fn()
            .mockResolvedValue({ data: { uuid: "community-uuid" } });
        const dispatch = vi.fn();
        const onSubmit = vi.fn();

        await submitValidHandler(
            { ...formData, title: "Новое название" },
            createCommunityFn,
            updateCommunityFn,
            false,
            ["art"],
            ["admin-uuid"],
            "author-uuid",
            "community-uuid",
            false,
            dispatch,
            undefined,
            originalData,
            onSubmit
        );

        expect(updateCommunityFn).toHaveBeenCalledWith({
            UUID: "community-uuid",
            data: {
                info: {
                    title: "Новое название",
                    description: "Описание",
                    username: "community-id",
                    tagsTitles: ["art"],
                    adminsUuids: ["admin-uuid"],
                    isDeleteAvatar: false
                },
                file: undefined
            }
        });
    });

    it("Отправляет запрос на обновление, если изменился набор тегов", async () => {
        const createCommunityFn = vi.fn();
        const updateCommunityFn = vi
            .fn()
            .mockResolvedValue({ data: { uuid: "community-uuid" } });
        const dispatch = vi.fn();
        const onSubmit = vi.fn();

        await submitValidHandler(
            formData,
            createCommunityFn,
            updateCommunityFn,
            false,
            ["photo"],
            ["admin-uuid"],
            "author-uuid",
            "community-uuid",
            false,
            dispatch,
            undefined,
            originalData,
            onSubmit
        );

        expect(updateCommunityFn).toHaveBeenCalled();
    });

    it("Отправляет запрос на обновление, если загружен новый аватар", async () => {
        const createCommunityFn = vi.fn();
        const updateCommunityFn = vi
            .fn()
            .mockResolvedValue({ data: { uuid: "community-uuid" } });
        const dispatch = vi.fn();
        const onSubmit = vi.fn();

        await submitValidHandler(
            formData,
            createCommunityFn,
            updateCommunityFn,
            false,
            ["art"],
            ["admin-uuid"],
            "author-uuid",
            "community-uuid",
            false,
            dispatch,
            file,
            originalData,
            onSubmit
        );

        expect(updateCommunityFn).toHaveBeenCalled();
    });

    it("Показывает уведомление об успехе без запроса, если теги и администраторы совпадают в другом порядке", async () => {
        const createCommunityFn = vi.fn();
        const updateCommunityFn = vi.fn();
        const dispatch = vi.fn();
        const onSubmit = vi.fn();

        await submitValidHandler(
            formData,
            createCommunityFn,
            updateCommunityFn,
            false,
            ["photo", "art"],
            ["admin-uuid-2", "admin-uuid-1"],
            "author-uuid",
            "community-uuid",
            false,
            dispatch,
            undefined,
            {
                ...originalData,
                tags: ["art", "photo"],
                adminsUuids: ["admin-uuid-1", "admin-uuid-2"]
            },
            onSubmit
        );

        expect(updateCommunityFn).not.toHaveBeenCalled();
        expect(dispatch.mock.calls[0][0]).toMatchObject({
            type: showToast.type,
            payload: { message: "api.communityUpdatedSuccess", type: "success" }
        });
    });

    it("Отправляет запрос на обновление, если изменился набор администраторов", async () => {
        const createCommunityFn = vi.fn();
        const updateCommunityFn = vi
            .fn()
            .mockResolvedValue({ data: { uuid: "community-uuid" } });
        const dispatch = vi.fn();
        const onSubmit = vi.fn();

        await submitValidHandler(
            formData,
            createCommunityFn,
            updateCommunityFn,
            false,
            ["art"],
            ["another-admin-uuid"],
            "author-uuid",
            "community-uuid",
            false,
            dispatch,
            undefined,
            originalData,
            onSubmit
        );

        expect(updateCommunityFn).toHaveBeenCalled();
    });

    it("Отправляет запрос на обновление, если удалён аватар", async () => {
        const createCommunityFn = vi.fn();
        const updateCommunityFn = vi
            .fn()
            .mockResolvedValue({ data: { uuid: "community-uuid" } });
        const dispatch = vi.fn();
        const onSubmit = vi.fn();

        await submitValidHandler(
            formData,
            createCommunityFn,
            updateCommunityFn,
            false,
            ["art"],
            ["admin-uuid"],
            "author-uuid",
            "community-uuid",
            true,
            dispatch,
            undefined,
            originalData,
            onSubmit
        );

        expect(updateCommunityFn).toHaveBeenCalledWith({
            UUID: "community-uuid",
            data: {
                info: {
                    title: "Заголовок",
                    description: "Описание",
                    username: "community-id",
                    tagsTitles: ["art"],
                    adminsUuids: ["admin-uuid"],
                    isDeleteAvatar: true
                },
                file: undefined
            }
        });
    });
});
