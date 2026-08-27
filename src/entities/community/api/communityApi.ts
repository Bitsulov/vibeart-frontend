import { api } from "shared/api/instance";
import type { AxiosInstance, AxiosResponse } from "axios";
import type { Page, Pageable } from "shared/lib/types";
import type {
    CommunityCreateRequest,
    CommunityResponse,
    CommunityUpdateRequest
} from "../lib/types";

/** Эндпоинты запросов сообществ */
const urls = {
    baseUrlCommunity: "/community",
    communities: function () {
        return `${this.baseUrlCommunity}`;
    },
    communitiesByUser: function () {
        return `${this.baseUrlCommunity}/user`;
    },
    owned: function () {
        return `${this.baseUrlCommunity}/owned`;
    },
    search: function () {
        return `${this.baseUrlCommunity}/search`;
    },
    searchByUser: function () {
        return `${this.baseUrlCommunity}/user/search`;
    },
    community: function (id: string) {
        return `${this.baseUrlCommunity}/${id}`;
    },
    addCommunity: function () {
        return `${this.baseUrlCommunity}`;
    },
    updateCommunity: function (id: string) {
        return `${this.baseUrlCommunity}/${id}`;
    },
    subscribe: function (id: string) {
        return `${this.baseUrlCommunity}/${id}/subscribe`;
    },
    deleteCommunity: function (id: string) {
        return `${this.baseUrlCommunity}/${id}`;
    }
};

/**
 * Получает постраничный список сообществ за исключением тех, на которые подписан пользователь,
 * и тех, которыми он владеет.
 *
 * @param userUUID - UUID пользователя, чьи подписки и сообщества нужно исключить из результата.
 * @param pageable - Параметры постраничного запроса.
 * @returns Промис со страницей сообществ {@link CommunityResponse}.
 */
export function getCommunities(
    userUUID?: string,
    pageable?: Pageable
): Promise<AxiosResponse<Page<CommunityResponse>>> {
    console.log("Calling get communities");
    return api.get(urls.communities(), {
        params: { userId: userUUID, ...pageable }
    });
}

/**
 * Получает постраничный список сообществ, на которые подписан пользователь.
 *
 * @param userUUID - UUID пользователя.
 * @param pageable - Параметры постраничного запроса.
 * @returns Промис со страницей сообществ {@link CommunityResponse}.
 */
export function getCommunitiesByUser(
    userUUID: string,
    pageable?: Pageable
): Promise<AxiosResponse<Page<CommunityResponse>>> {
    console.log(`Calling get communities by user ${userUUID}`);
    return api.get(urls.communitiesByUser(), {
        params: { userId: userUUID, ...pageable }
    });
}

/**
 * Получает постраничный список сообществ, владельцем которых является текущий пользователь.
 *
 * @param pageable - Параметры постраничного запроса.
 * @returns Промис со страницей сообществ {@link CommunityResponse}.
 */
export function getOwnedCommunities(
    pageable?: Pageable
): Promise<AxiosResponse<Page<CommunityResponse>>> {
    console.log("Calling get owned communities");
    return api.get(urls.owned(), { params: pageable });
}

/**
 * Ищет сообщества по названию и описанию с постраничной выдачей, результаты
 * отсортированы по релевантности запросу. Исключает сообщества, на которые пользователь
 * подписан, и те, которыми он владеет.
 *
 * @param query - Поисковый запрос. Если начинается с `@`, поиск идёт по имени пользователя сообщества.
 * @param userUUID - UUID пользователя, чьи подписки и сообщества нужно исключить из результата.
 * @param pageable - Параметры постраничного запроса.
 * @returns Промис со страницей найденных сообществ {@link CommunityResponse}.
 */
export function getCommunitiesBySearch(
    query: string,
    userUUID?: string,
    pageable?: Pageable
): Promise<AxiosResponse<Page<CommunityResponse>>> {
    console.log(`Calling search communities by query: ${query}`);
    return api.get(urls.search(), {
        params: { query, userId: userUUID, ...pageable }
    });
}

/**
 * Ищет по названию и описанию среди сообществ, на которые подписан пользователь.
 *
 * @param query - Поисковый запрос. Если начинается с `@`, поиск идёт по имени пользователя сообщества.
 * @param userUUID - UUID пользователя.
 * @param pageable - Параметры постраничного запроса.
 * @returns Промис со страницей найденных сообществ {@link CommunityResponse}.
 */
export function getCommunitiesByUserAndSearch(
    query: string,
    userUUID: string,
    pageable?: Pageable
): Promise<AxiosResponse<Page<CommunityResponse>>> {
    console.log(`Calling search communities by user ${userUUID}, query: ${query}`);
    return api.get(urls.searchByUser(), {
        params: { query, userId: userUUID, ...pageable }
    });
}

/**
 * Получает данные сообщества по его UUID.
 *
 * @param UUID - UUID сообщества.
 * @param client - объект axios для запроса; по умолчанию — общий браузерный `api`,
 * для вызова из серверного `loader` передаётся объект из `createServerInstance`.
 * @returns Промис с данными сообщества {@link CommunityResponse}.
 */
export function getCommunity(
    UUID: string,
    client: AxiosInstance = api
): Promise<AxiosResponse<CommunityResponse>> {
    console.log(`Calling get community ${UUID}`);
    return client.get(urls.community(UUID));
}

/**
 * Создаёт новое сообщество с аватаром.
 *
 * @param data - объект {@link CommunityCreateRequest} с текстовой информацией и, при наличии, файлом аватара.
 * @returns Промис с данными созданного сообщества {@link CommunityResponse}.
 */
export function addCommunity(
    data: CommunityCreateRequest
): Promise<AxiosResponse<CommunityResponse>> {
    const formData = new FormData();
    formData.append(
        "info",
        new Blob([JSON.stringify(data.info)], { type: "application/json" })
    );
    if (data.file) {
        formData.append("file", data.file);
    }

    console.log("Calling create community");
    return api.post(urls.addCommunity(), formData);
}

/**
 * Обновляет сообщество по его UUID.
 *
 * @param params.UUID - UUID обновляемого сообщества.
 * @param params.data - объект {@link CommunityUpdateRequest} с текстовой информацией и, при замене, новым файлом аватара.
 * @returns Промис с данными обновлённого сообщества {@link CommunityResponse}.
 */
export function updateCommunity({
    UUID,
    data
}: {
    UUID: string;
    data: CommunityUpdateRequest;
}): Promise<AxiosResponse<CommunityResponse>> {
    const formData = new FormData();
    formData.append(
        "info",
        new Blob([JSON.stringify(data.info)], { type: "application/json" })
    );
    if (data.file) {
        formData.append("file", data.file);
    }

    console.log(`Calling update community ${UUID}`);
    return api.put(urls.updateCommunity(UUID), formData);
}

/**
 * Переключает подписку текущего пользователя на сообщество.
 *
 * @param UUID - UUID сообщества.
 * @returns Строка с описанием результата выполнения запроса.
 */
export function toggleCommunitySubscription(
    UUID: string
): Promise<AxiosResponse<string>> {
    console.log(`Calling toggle community subscription ${UUID}`);
    return api.post(urls.subscribe(UUID));
}

/**
 * Удаляет сообщество по его UUID.
 *
 * @param UUID - UUID удаляемого сообщества.
 * @returns Строка с описанием результата выполнения запроса.
 */
export function deleteCommunityByUUID(UUID: string): Promise<AxiosResponse<string>> {
    console.log(`Calling delete community ${UUID}`);
    return api.delete(urls.deleteCommunity(UUID));
}
