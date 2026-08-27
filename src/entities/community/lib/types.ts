import type { UserResponse, UserType } from "entities/user";
import type { AlbumType } from "entities/album";

/**
 * Описывает сообщество сайта — общее пространство,
 * где пользователи публикуют работы и взаимодействуют вокруг
 * единой творческой тематики.
 */
export interface CommunityType {
    /** UUID, используемый в публичных URL (например, `/community/:uuid`). */
    UUID: string;
    /** Полный профиль пользователя-владельца сообщества. */
    owner: UserType;
    /** Уникальный псевдоним сообщества, используемый в URL. */
    username: string;
    /** Отображаемое название сообщества. */
    title: string;
    /** Описание назначения и тематики сообщества. */
    description: string;
    /** Альбомы, опубликованные в данном сообществе. */
    albumsList: AlbumType[];
    /** Администраторы сообщества. */
    admins: UserType[];
    /** Общее количество публикаций в сообществе. */
    posts: number;
    /** Общее количество подписчиков. */
    subscribers: number;
    /** Количество сообществ, на которые подписано данное сообщество. */
    subscribes: number;
    /** Дата и время создания сообщества в формате ISO 8601. */
    createdAt: string;
    /** URL обложки сообщества. */
    imageUrl: string;
    /** Признак того, что текущий авторизованный пользователь подписан на сообщество. */
    isSubscribed: boolean;
    /** Признак блокировки сообщества модерацией. */
    isBlocked: boolean;
    /** Уровень доверия, присвоенный модерацией платформы. */
    trustStatus: "TRUST" | "UNTRUST";
}

/** Сообщество, возвращаемое сервером. */
export interface CommunityResponse {
    uuid: string;
    owner: UserResponse;
    name: string;
    username: string;
    description: string;
    avatarUrl: string;
    worksCount: number;
    subscribersCount: number;
    subscribesCount: number;
    createdAt: string;
    trustStatus: "TRUST" | "UNTRUST";
    admins: UserResponse[];
    tags: string[];
    subscribed: boolean | null;
}

/** Текстовая информация и, при наличии, файл аватара для создания сообщества. */
export interface CommunityCreateRequest {
    info: {
        title: string;
        description: string;
        username?: string;
        tagsTitles: string[];
        adminsUuids: string[];
        userId: string;
    };
    file?: File;
}

/** Текстовая информация и, при замене, новый файл аватара для обновления сообщества. */
export interface CommunityUpdateRequest {
    info: {
        title: string;
        description: string;
        username?: string;
        tagsTitles: string[];
        adminsUuids: string[];
        isDeleteAvatar: boolean;
    };
    file?: File;
}
