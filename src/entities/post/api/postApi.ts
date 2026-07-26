import { api } from "shared/api/instance";
import type { AxiosInstance, AxiosResponse } from "axios";
import type { Page } from "shared/lib/types";
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
 * @returns Промис со страницей публикаций {@link PostResponse}.
 */
export async function getPosts(): Promise<AxiosResponse<Page<PostResponse>>> {
    console.log("Calling get posts");
    return api.get(urls.posts());
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
