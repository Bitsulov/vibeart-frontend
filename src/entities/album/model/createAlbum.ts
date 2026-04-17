import type {AlbumType} from "../lib/types";

/**
 * Фабричная функция для создания объекта альбома со значениями по умолчанию.
 *
 * @param album - Объект `AlbumType` с данными альбома.
 * @returns Нормализованный объект альбома.
 */
export function createAlbum({
    id = 0,
    ULID,
    name = "",
    description = "",
    postCount = 0,
    postsList = [],
    imageUrl,
    createdAt = new Date().toISOString()
}: AlbumType) {
    return {
        id,
        ULID,
        name,
        description,
        postCount,
        postsList,
        imageUrl,
        createdAt
    }
}
