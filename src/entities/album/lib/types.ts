import type { PostType } from "entities/post";
import type { UserResponse } from "entities/user";
import type { CommunityResponse } from "entities/community";

/**
 * Описывает альбом — пользовательскую коллекцию, объединяющую
 * несколько публикаций по тематическому признаку.
 */
export interface AlbumType {
    /** UUID, используемый в публичных URL (например, `/album/:uuid`). */
    UUID: string;
    /** Название альбома, заданное пользователем. */
    name: string;
    /** Развёрнутое описание тематики или содержимого альбома. */
    description: string;
    /**
     * Общее количество публикаций в альбоме.
     * Может отличаться от `postsList.length` при постраничной загрузке.
     */
    postCount: number;
    /** Список публикаций, загруженных для данного альбома. */
    postsList: PostType[];
    /** URL обложки альбома. */
    imageUrl: string;
    /** Дата и время создания альбома в формате ISO 8601. */
    createdAt: string;
}

/** Данные альбома, возвращаемые сервером. */
export interface AlbumResponse {
    uuid: string;
    title: string;
    description: string;
    worksCount: number;
    authorUser: UserResponse | null;
    authorCommunity: CommunityResponse | null;
    imageUrl: string;
    createdAt: string;
}

/** Текстовая информация и файл обложки для создания альбома. */
export interface AlbumCreateRequest {
    info: {
        title: string;
        description: string;
        authorUuid: string;
    };
    file: File;
}

/** Текстовая информация и, при замене, новый файл обложки для обновления альбома. */
export interface AlbumUpdateRequest {
    info: {
        title: string;
        description: string;
    };
    file?: File;
}
