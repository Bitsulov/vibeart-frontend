import { api } from "shared/api/instance";
import type { AlbumCreateRequest, AlbumResponse, AlbumUpdateRequest } from "../lib/types";
import type { AxiosInstance, AxiosResponse } from "axios";
import type { Page, Pageable } from "shared/lib/types";

/** Эндпоинты запросов альбомов */
const urls = {
    baseUrlAlbum: "/album",
    albumsByAuthor: function () {
        return `${this.baseUrlAlbum}`;
    },
    album: function (id: string) {
        return `${this.baseUrlAlbum}/${id}`;
    },
    createAlbum: function () {
        return `${this.baseUrlAlbum}`;
    },
    updateAlbum: function (id: string) {
        return `${this.baseUrlAlbum}/${id}`;
    },
    addPostsToAlbum: function (id: string) {
        return `${this.baseUrlAlbum}/${id}/posts`;
    },
    deleteAlbum: function (id: string) {
        return `${this.baseUrlAlbum}/${id}`;
    }
};

/**
 * Получает постраничный список альбомов автора.
 *
 * @param authorUUID - UUID пользователя или сообщества — автора альбомов.
 * @param pageable - Параметры постраничного запроса.
 * @returns Промис со страницей альбомов {@link AlbumResponse}.
 */
export function getAlbumsByAuthor(
    authorUUID: string,
    pageable?: Pageable
): Promise<AxiosResponse<Page<AlbumResponse>>> {
    console.log(`Calling get albums by user or community ${authorUUID}`);
    return api.get(urls.albumsByAuthor(), {
        params: { authorUuid: authorUUID, ...pageable }
    });
}

/**
 * Получает данные альбома по его UUID.
 *
 * @param UUID - UUID альбома.
 * @param client - объект axios для запроса; по умолчанию — общий браузерный `api`,
 * для вызова из серверного `loader` передаётся объект из `createServerInstance`.
 * @returns Промис с данными альбома {@link AlbumResponse}.
 */
export function getAlbum(
    UUID: string,
    client: AxiosInstance = api
): Promise<AxiosResponse<AlbumResponse>> {
    console.log(`Calling get album ${UUID}`);
    return client.get(urls.album(UUID));
}

/**
 * Создаёт новый альбом с обложкой.
 *
 * @param data - объект {@link AlbumCreateRequest} с текстовой информацией и файлом обложки.
 * @returns Промис с данными созданного альбома {@link AlbumResponse}.
 */
export function addAlbum(
    data: AlbumCreateRequest
): Promise<AxiosResponse<AlbumResponse>> {
    const formData = new FormData();
    formData.append(
        "info",
        new Blob([JSON.stringify(data.info)], { type: "application/json" })
    );
    formData.append("file", data.file);

    console.log(`Calling create album`);
    return api.post(urls.createAlbum(), formData);
}

/**
 * Обновляет альбом по его UUID.
 *
 * @param params.UUID - UUID обновляемого альбома.
 * @param params.data - объект {@link AlbumUpdateRequest} с текстовой информацией и, при замене, новым файлом обложки.
 * @returns Промис с данными обновлённого альбома {@link AlbumResponse}.
 */
export function updateAlbum({
    UUID,
    data
}: {
    UUID: string;
    data: AlbumUpdateRequest;
}): Promise<AxiosResponse<AlbumResponse>> {
    const formData = new FormData();
    formData.append(
        "info",
        new Blob([JSON.stringify(data.info)], { type: "application/json" })
    );
    if (data.file) {
        formData.append("file", data.file);
    }

    console.log(`Calling update album ${UUID}`);
    return api.put(urls.updateAlbum(UUID), formData);
}

/**
 * Добавляет публикации в альбом по списку их UUID.
 *
 * @param params.UUID - UUID альбома.
 * @param params.data - список UUID добавляемых публикаций.
 * @returns Строка с описанием результата выполнения запроса.
 */
export function addPostsToAlbum({
    UUID,
    data
}: {
    UUID: string;
    data: string[];
}): Promise<AxiosResponse<string>> {
    console.log(`Calling add posts to album ${UUID}`);
    return api.post(urls.addPostsToAlbum(UUID), { postsUUIDs: data });
}

/**
 * Удаляет альбом по его UUID.
 *
 * @param UUID - UUID удаляемого альбома.
 * @returns Строка с описанием результата выполнения запроса.
 */
export function deleteAlbum(UUID: string): Promise<AxiosResponse<string>> {
    console.log(`Calling delete album ${UUID}`);
    return api.delete(urls.deleteAlbum(UUID));
}
