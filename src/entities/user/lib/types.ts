import type { Roles } from "entities/role";
import type { AlbumType } from "entities/album";

/**
 * Описывает пользователя сайта.
 *
 * Используется как для хранения данных текущего авторизованного
 * пользователя в хранилище Redux (слайс `user`), так и для
 * представления любого профиля, полученного с сервера.
 * Поля намеренно хранятся в плоской структуре для удобства
 * работы с селекторами.
 */
export interface UserType {
    /** UUID, используемый в публичных URL (например, `/profile/:uuid`). */
    UUID: string;
    /** Отображаемое имя пользователя. */
    title: string;
    /** Уникальный псевдоним пользователя для упоминаний и URL. */
    username: string;
    /** Краткое описание пользователя. */
    description: string;
    /** Общее количество опубликованных работ (постов). */
    worksCount: number;
    /** Количество пользователей, подписанных на этот аккаунт. */
    subscribersCount: number;
    /** Количество аккаунтов, на которые подписан данный пользователь. */
    subscribesCount: number;
    /** Список альбомов, принадлежащих пользователю. */
    albumList: AlbumType[];
    /** Дата и время создания аккаунта в формате ISO 8601. */
    createdAt: string;
    /** Уровень доверия, присвоенный модерацией платформы. */
    trustStatus: "TRUST" | "UNTRUST";
    /** Признак того, что пользователь авторизован. */
    isAuthenticated: boolean;
    /** Признак блокировки аккаунта модерацией. */
    isBlocked: boolean;
    /** Статус присутствия пользователя в режиме реального времени. */
    onlineStatus: "ONLINE" | "OFFLINE";
    /** Роль пользователя на платформе, определяющая доступ к функциям. */
    role: Roles;
    /** URL аватара пользователя. Пустая строка, если аватар не задан. */
    avatarUrl: string;
}

/** Данные формы регистрации, отправляемые на сервер. */
export interface SignUpRequest {
    email: string;
    password: string;
    confirmPassword: string;
}

/** Адрес электронной почты для повторной отправки кода подтверждения. */
export interface SendCodeRequest {
    email: string;
}

/** Адрес электронной почты и код подтверждения для верификации аккаунта. */
export interface VerifyRequest {
    email: string;
    verificationCode: string;
}

/** Адрес электронной почты и пароль для входа в аккаунт. */
export interface SignInRequest {
    email: string;
    password: string;
}

/** Refresh-токен для обновления пары токенов авторизации. */
export interface RefreshRequest {
    refreshToken: string;
}

/** Результат входа, верификации или обновления токенов: UUID пользователя, пара токенов авторизации и сроки их действия. */
export interface AuthResponse {
    uuid: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn: number;
}

/** Профиль текущего авторизованного пользователя, возвращаемый сервером. */
export interface UserDetailResponse {
    uuid: string;
    name: string;
    username: string;
    avatarUrl: string;
    email: string;
    role: Roles;
    enabled: boolean;
}

/** Состояние текущего пользователя */
export interface PrincipalUserState {
    UUID: string;
    name: string;
    username: string;
    avatarUrl: string;
    email: string;
    role: Roles;
    trustStatus: "TRUST" | "UNTRUST";
    isAuthenticated: boolean;
    isBlocked: boolean;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn: number;
}

/** Полная информация о пользователе, необходимая в профиле */
export interface UserResponse {
    uuid: string;
    name: string;
    username: string;
    description: string;
    avatarUrl: string;
    worksCount: number;
    subscribersCount: number;
    subscribesCount: number;
    createdAt: string;
    trustStatus: "TRUST" | "UNTRUST";
    onlineStatus: "ONLINE" | "OFFLINE";
    enabled: boolean;
}

/** Данные пользователя и файл изображения аватара */
export interface UpdateUserRequest {
    info: {
        name: string;
        username: string;
        description: string;
        deleteAvatar: boolean;
    };
    file?: File;
}

/** Новый адрес электронной почты пользователя */
export interface ChangeEmailRequest {
    email: string;
}

/** Текущий адрес электронной почты пользователя */
export interface SendCodeEmailRequest {
    email: string;
}

/** Новый адрес электронной почты пользователя и шестизначный код подтверждения */
export interface ConfirmChangeEmailRequest {
    email: string;
    verificationCode: string;
}

/** Текущий пароль, новый пароль и подтверждение пароля */
export interface ChangePasswordRequest {
    password: string;
    newPassword: string;
    confirmPassword: string;
}

/** Адрес электронной почты пользователя */
export interface SendCodePasswordRequest {
    email: string;
}

/** Адрес электронной почты пользователя и шестизначный код подтверждения */
export interface ConfirmChangePasswordRequest {
    email: string;
    verificationCode: string;
}
