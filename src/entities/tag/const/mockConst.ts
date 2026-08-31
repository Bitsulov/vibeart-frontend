/**
 * @file Фикстуры сущности `tag` для использования в модульных тестах
 * и сквозных сценариях Playwright.
 *
 * Все моки исключены из анализа покрытия кода, так как не содержат
 * тестируемой логики.
 */
import { createTag } from "../model/createTag";
import type { Page } from "shared/lib/types";
import type { TagResponse } from "../lib/types";

export const postTagsMock = [
    createTag({ title: "beauty", createdAt: "" }),
    createTag({ title: "nature", createdAt: "" }),
    createTag({ title: "aaa", createdAt: "" }),
    createTag({ title: "beauty", createdAt: "" }),
    createTag({ title: "aaa", createdAt: "" })
];

export const communityTagsMock = [
    createTag({ title: "beauty", createdAt: "" }),
    createTag({ title: "nature", createdAt: "" }),
    createTag({ title: "aaa", createdAt: "" }),
    createTag({ title: "beauty", createdAt: "" }),
    createTag({ title: "aaa", createdAt: "" })
];

export const tagsPageResponseMock: Page<TagResponse> = {
    content: [
        { title: "beauty", createdAt: "" },
        { title: "nature", createdAt: "" },
        { title: "aaa", createdAt: "" },
        { title: "beauty", createdAt: "" },
        { title: "aaa", createdAt: "" }
    ],
    number: 0,
    size: 20,
    totalElements: 5,
    totalPages: 1,
    first: true,
    last: true,
    empty: false
};
