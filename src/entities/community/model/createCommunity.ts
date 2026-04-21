import type {CommunityType} from "../lib/types";

/**
 * Создаёт объект сообщества с дефолтными значениями для необязательных полей.
 * 
 * @param id - числовой идентификатор
 * @param ULID - строковый ULID сообщества
 * @param owner - объект UserType владельца сообщества
 * @param username - username владельца
 * @param title - название сообщества
 * @param description - описание сообщества
 * @param posts - количество постов
 * @param subscribers - количество подписчиков
 * @param subscribes - количество подписок сообщества
 * @param createdAt - дата создания (ISO-строка)
 * @param imageUrl - URL обложки
 * @param albumsList - список альбомов
 * @param isSubscribed - подписан ли текущий пользователь
 * 
 * @returns объект сообщества типа `CommunityType`
 */
export function createCommunity({
    id = 0,
    ULID,
    owner,
    username,
    title = "",
    description = "",
    albumsList = [],
    posts = 0,
    subscribers = 0,
    subscribes = 0,
    createdAt = new Date().toISOString(),
    imageUrl = "",
    isSubscribed = false,
    isBlocked = false,
    trustStatus = "trust",
}: CommunityType) {
    return {
        id,
        ULID,
        owner,
        username,
        title,
        description,
        albumsList,
        posts,
        subscribers,
        subscribes,
        createdAt,
        imageUrl,
        isSubscribed,
        isBlocked,
        trustStatus,
    }
}
