import { api } from "shared/api/instance";
import type { AxiosResponse } from "axios";
import type { Page, Pageable } from "shared/lib/types";
import type { TagResponse } from "../lib/types";

/** Эндпоинты запросов тегов */
const urls = {
    baseUrlTag: "/tag",
    tags: function () {
        return `${this.baseUrlTag}`;
    },
    search: function () {
        return `${this.baseUrlTag}/search`;
    }
};

/**
 * Получает постраничный список тегов.
 *
 * @param pageable - Параметры постраничного запроса.
 * @returns Промис со страницей тегов {@link TagResponse}.
 */
export function getTags(pageable?: Pageable): Promise<AxiosResponse<Page<TagResponse>>> {
    console.log("Calling get tags");
    return api.get(urls.tags(), { params: pageable });
}

/**
 * Ищет теги, название которых содержит переданную подстроку, без учёта регистра.
 *
 * @param query - Поисковый запрос.
 * @param pageable - Параметры постраничного запроса.
 * @returns Промис со страницей найденных тегов {@link TagResponse}.
 */
export function getTagsBySearch(
    query: string,
    pageable?: Pageable
): Promise<AxiosResponse<Page<TagResponse>>> {
    console.log(`Calling search tags by query: ${query}`);
    return api.get(urls.search(), {
        params: { query, ...pageable }
    });
}
