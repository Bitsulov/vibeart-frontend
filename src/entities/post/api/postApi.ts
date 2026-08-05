import { api } from "shared/api/instance";
import type { AxiosInstance, AxiosResponse } from "axios";
import type { Page, Pageable } from "shared/lib/types";
import type { CreatePostRequest, PostResponse, UpdatePostRequest } from "../lib/types";

/** Эндпоинты запросов публикаций */
const urls = {
    baseUrlPost: "/post",
    posts: function () {
        return `${this.baseUrlPost}`;
    },
    post: function (id: string) {
        return `${this.baseUrlPost}/${id}`;
    },
    postsByAuthor: function () {
        return `${this.baseUrlPost}/author`;
    },
    search: function () {
        return `${this.baseUrlPost}/search`;
    },
    addPost: function () {
        return `${this.baseUrlPost}`;
    },
    updatePost: function (id: string) {
        return `${this.baseUrlPost}/${id}`;
    },
    deletePost: function (id: string) {
        return `${this.baseUrlPost}/${id}`;
    },
    toggleLike: function (id: string) {
        return `${this.baseUrlPost}/${id}/like`;
    },
    report: function (id: string) {
        return `${this.baseUrlPost}/${id}/report`;
    }
};

/**
 * Получает постраничный список публикаций.
 *
 * @param albumUUID - UUID альбома для фильтрации публикаций.
 * @param pageable - Параметры постраничного запроса.
 * @returns Промис со страницей публикаций {@link PostResponse}.
 */
export async function getPosts(
    albumUUID?: string,
    pageable?: Pageable
): Promise<AxiosResponse<Page<PostResponse>>> {
    console.log("Calling get posts");
    return api.get(urls.posts(), {
        params: { albumUuid: albumUUID, ...pageable }
    });
}

/**
 * Получает постраничный список публикаций автора.
 *
 * @param authorUUID - UUID автора публикаций.
 * @param albumUUID - UUID альбома, публикации которого нужно исключить из результата.
 * @param pageable - Параметры постраничного запроса.
 * @returns Промис со страницей публикаций {@link PostResponse}.
 */
export async function getPostsByAuthor(
    authorUUID: string,
    albumUUID?: string,
    pageable?: Pageable
): Promise<AxiosResponse<Page<PostResponse>>> {
    console.log(`Calling get posts by author ${authorUUID}`);
    return api.get(urls.postsByAuthor(), {
        params: { authorUuid: authorUUID, albumUuid: albumUUID, ...pageable }
    });
}

/**
 * Получает данные публикации по её UUID.
 *
 * @param UUID - UUID публикации.
 * @param client - объект axios для запроса; по умолчанию — общий браузерный `api`,
 * для вызова из серверного `loader` передаётся объект из `createServerInstance`.
 * @returns Промис с данными публикации {@link PostResponse}.
 */
export async function getPost(
    UUID: string,
    client: AxiosInstance = api
): Promise<AxiosResponse<PostResponse>> {
    console.log(`Calling get post by UUID: ${UUID}`);
    return client.get(urls.post(UUID));
}

/**
 * Создаёт новую публикацию с изображением.
 *
 * @param data - объект {@link CreatePostRequest} с текстовой информацией и файлом изображения.
 * @returns Промис с данными созданной публикации {@link PostResponse}.
 */
export async function addPost(
    data: CreatePostRequest
): Promise<AxiosResponse<PostResponse>> {
    const formData = new FormData();
    formData.append(
        "info",
        new Blob([JSON.stringify(data.info)], { type: "application/json" })
    );
    formData.append("file", data.file);

    console.log(`Calling create post`);
    return api.post(urls.addPost(), formData);
}

/**
 * Обновляет публикацию по её UUID.
 *
 * @param params.UUID - UUID обновляемой публикации.
 * @param params.data - объект {@link UpdatePostRequest} с текстовой информацией и, при замене, новым файлом изображения.
 * @returns Промис с данными обновлённой публикации {@link PostResponse}.
 */
export async function updatePostByUUID({
    UUID,
    data
}: {
    UUID: string;
    data: UpdatePostRequest;
}): Promise<AxiosResponse<PostResponse>> {
    const formData = new FormData();
    formData.append(
        "info",
        new Blob([JSON.stringify(data.info)], { type: "application/json" })
    );
    if (data.file) {
        formData.append("file", data.file);
    }

    console.log(`Calling update post by UUID: ${UUID}`);
    return api.put(urls.updatePost(UUID), formData);
}

/**
 * Удаляет публикацию по её UUID.
 *
 * @param UUID - UUID удаляемой публикации.
 * @returns Строка с описанием результата выполнения запроса.
 */
export async function deletePostById(UUID: string): Promise<AxiosResponse<string>> {
    console.log(`Calling delete post by UUID: ${UUID}`);
    return api.delete(urls.deletePost(UUID));
}

/**
 * Ищет публикации по заголовку и описанию с постраничной выдачей.
 *
 * @param query - Поисковый запрос.
 * @param authorUUID - UUID автора публикаций для ограничения поиска.
 * @param albumUUID - UUID альбома, публикации которого нужно исключить из результата.
 * @param pageable - Параметры постраничного запроса.
 * @returns Промис со страницей найденных публикаций {@link PostResponse}.
 */
export async function searchPosts(
    query: string,
    authorUUID?: string,
    albumUUID?: string,
    pageable?: Pageable
): Promise<AxiosResponse<Page<PostResponse>>> {
    console.log(`Calling search posts by query: ${query}`);
    return api.get(urls.search(), {
        params: { query, authorUuid: authorUUID, albumUuid: albumUUID, ...pageable }
    });
}

/**
 * Переключает лайк текущего пользователя на публикации.
 *
 * @param UUID - UUID публикации.
 * @returns Строка с описанием результата выполнения запроса.
 */
export async function toggleLike(UUID: string): Promise<AxiosResponse<string>> {
    console.log(`Calling toggle like by UUID: ${UUID}`);
    return api.post(urls.toggleLike(UUID));
}

/**
 * Отправляет жалобу текущего пользователя на публикацию.
 *
 * @param UUID - UUID публикации.
 * @returns Строка с описанием результата выполнения запроса.
 */
export async function createReport(UUID: string): Promise<AxiosResponse<string>> {
    console.log(`Calling create report by UUID: ${UUID}`);
    return api.post(urls.report(UUID));
}
