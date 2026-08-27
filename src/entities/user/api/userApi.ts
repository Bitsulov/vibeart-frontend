import { api } from "shared/api/instance";
import type { AxiosInstance, AxiosResponse } from "axios";
import type { Page, Pageable } from "shared/lib/types";
import type {
    AuthResponse,
    ChangeEmailRequest,
    ChangePasswordRequest,
    ConfirmChangeEmailRequest,
    RefreshRequest,
    SendCodeEmailRequest,
    SendCodePasswordRequest,
    SendCodeRequest,
    SignInRequest,
    SignUpRequest,
    UpdateUserRequest,
    UserDetailResponse,
    UserResponse,
    VerifyRequest
} from "../lib/types";

/** Эндпоинты запросов авторизации и пользователя */
const urls = {
    baseUrlAuth: "/auth",
    baseUrlUser: "/user",
    register: function () {
        return `${this.baseUrlAuth}/register`;
    },
    sendCode: function () {
        return `${this.baseUrlAuth}/send`;
    },
    verify: function () {
        return `${this.baseUrlAuth}/verify`;
    },
    login: function () {
        return `${this.baseUrlAuth}/login`;
    },
    refresh: function () {
        return `${this.baseUrlAuth}/refresh`;
    },
    user: function () {
        return `${this.baseUrlAuth}/user`;
    },
    userByUUID: function (UUID: string) {
        return `${this.baseUrlUser}/${UUID}`;
    },
    updateUser: function (UUID: string) {
        return `${this.baseUrlUser}/${UUID}`;
    },
    changeEmail: function (UUID: string) {
        return `${this.baseUrlUser}/${UUID}/email`;
    },
    sendCodeEmail: function () {
        return `${this.baseUrlUser}/email/send`;
    },
    confirmEmail: function () {
        return `${this.baseUrlUser}/email/confirm`;
    },
    changePassword: function (UUID: string) {
        return `${this.baseUrlUser}/${UUID}/password`;
    },
    sendCodePassword: function () {
        return `${this.baseUrlUser}/password/send`;
    },
    confirmPassword: function () {
        return `${this.baseUrlUser}/password/confirm`;
    },
    deleteUserByUUID: function (UUID: string) {
        return `${this.baseUrlUser}/${UUID}`;
    },
    friends: function () {
        return `${this.baseUrlUser}/friends`;
    },
    friendsSearch: function () {
        return `${this.baseUrlUser}/friends/search`;
    },
    subscribeUser: function (UUID: string) {
        return `${this.baseUrlUser}/${UUID}/subscribe`;
    }
};

/**
 * Регистрирует нового пользователя по адресу электронной почты и паролю.
 *
 * После успешной регистрации сервер отправляет на указанный адрес
 * код подтверждения, который нужно передать в {@link verify}.
 *
 * @param data - объект {@link SignUpRequest}.
 * @returns Ответ сервера.
 */
export async function register(data: SignUpRequest): Promise<AxiosResponse<string>> {
    console.log("Calling register", data);
    return api.post(urls.register(), data);
}

/**
 * Запрашивает повторную отправку кода подтверждения на почту пользователя.
 *
 * @param data - объект {@link SendCodeRequest}.
 * @returns Ответ сервера.
 */
export async function sendCode(data: SendCodeRequest): Promise<AxiosResponse<string>> {
    console.log("Calling send", data);
    return api.post(urls.sendCode(), data);
}

/**
 * Подтверждает адрес электронной почты пользователя кодом,
 * полученным после {@link register} или {@link sendCode}.
 *
 * @param data - объект {@link VerifyRequest}.
 * @returns Пара токенов авторизации и `UUID` пользователя: {@link AuthResponse}.
 */
export async function verify(data: VerifyRequest): Promise<AxiosResponse<AuthResponse>> {
    console.log("Calling verify", data);
    return api.post(urls.verify(), data);
}

/**
 * Авторизует пользователя по адресу электронной почты и паролю.
 *
 * @param data - объект {@link SignInRequest}.
 * @returns Пара токенов авторизации и `UUID` пользователя: {@link AuthResponse}.
 */
export async function login(data: SignInRequest): Promise<AxiosResponse<AuthResponse>> {
    console.log("Calling login", data);
    return api.post(urls.login(), data);
}

/**
 * Обновляет пару токенов авторизации по `refreshToken`.
 *
 * @param data - объект {@link RefreshRequest}.
 * @returns Новая пара токенов авторизации и `UUID` пользователя: {@link AuthResponse}.
 */
export async function refresh(
    data: RefreshRequest
): Promise<AxiosResponse<AuthResponse>> {
    console.log("Calling refresh", data);
    return api.post(urls.refresh(), data);
}

/**
 * Получает данные текущего авторизованного пользователя.
 *
 * @returns Профиль пользователя, соответствующего токену авторизации запроса: {@link UserDetailResponse}.
 */
export async function getPrincipalUser(): Promise<AxiosResponse<UserDetailResponse>> {
    console.log("Calling principal user");
    return api.get(urls.user());
}

/**
 * Получает данные пользователя, необходимые для отображения в профиле, по его UUID
 *
 * @param UUID UUID текущего пользователя
 * @param client объект axios для запроса; по умолчанию — общий браузерный `api`,
 * для вызова из серверного `loader` передаётся объект из `createServerInstance`
 * @returns Промис с объектом с данными пользователя {@link UserResponse}
 */
export async function getUserByUUID(
    UUID: string,
    client: AxiosInstance = api
): Promise<AxiosResponse<UserResponse>> {
    console.log(`Calling getting user by UUID: ${UUID}`);
    return client.get(urls.userByUUID(UUID));
}

/**
 * <p>
 *     Обновляет данные пользователя: Имя, описание, username, аватар. Если deleteAvatar=true, то аватар удаляется.
 *     Запрос состоит из двух частей.
 * </p>
 * <h4>Структура запроса</h4>
 * <ol>
 *     <li>
 *         **info** - содержит поля name, username, description, deleteAvatar
 *     </li>
 *     <li>
 *         **file** - бинарный файл изображения
 *     </li>
 * </ol>
 *
 * @param params.UUID UUID текущего пользователя
 * @param params.data объект API-запроса с полями info, содержащем текстовую информацию и file, содержащую бинарный файл
 * @returns Промис с объектом с обновлёнными данными пользователя {@link UserResponse}
 */
export async function updateUserByUUID({
    UUID,
    data
}: {
    UUID: string;
    data: UpdateUserRequest;
}): Promise<AxiosResponse<UserResponse>> {
    const formData = new FormData();
    formData.append(
        "info",
        new Blob([JSON.stringify(data.info)], {
            type: "application/json"
        })
    );
    if (data.file) {
        formData.append("file", data.file);
    }

    console.log(`Calling update user by UUID: ${UUID}`);
    return api.put(urls.updateUser(UUID), formData);
}

/**
 * Отправляет письмо подтверждения на указанный адрес электронной почты для его смены.
 *
 * @param params.UUID UUID текущего пользователя
 * @param params.data объект {@link ChangeEmailRequest}, содержащий новый email
 * @returns Строка с описанием результата выполнения запроса
 */
export async function changeEmail({
    UUID,
    data
}: {
    UUID: string;
    data: ChangeEmailRequest;
}): Promise<AxiosResponse<string>> {
    console.log(`Calling change email for UUID ${UUID}`);
    return api.post(urls.changeEmail(UUID), data);
}

/**
 * Отправляет повторное письмо подтверждения на адрес электронной почты для его смены.
 *
 * @param data объект {@link SendCodeEmailRequest}, содержащий текущий email пользователя
 * @returns Строка с описанием результата выполнения запроса
 */
export async function sendCodeEmail(
    data: SendCodeEmailRequest
): Promise<AxiosResponse<string>> {
    console.log("Calling send code email: ", data);
    return api.post(urls.sendCodeEmail(), data);
}

/**
 * Подтверждает смену адреса электронной почты шестизначным кодом подтверждения
 *
 * @param data объект {@link ConfirmChangeEmailRequest}, содержащий новый email и шестизначный код подтверждения
 * @returns Строка с описанием результата выполнения запроса
 */
export async function confirmEmail(
    data: ConfirmChangeEmailRequest
): Promise<AxiosResponse<string>> {
    console.log("Calling confirm email: ", data);
    return api.post(urls.confirmEmail(), data);
}

/**
 * Отправляет письмо подтверждения на адрес электронной почты для смены пароля.
 *
 * @param params.UUID UUID текущего пользователя
 * @param params.data объект {@link ChangePasswordRequest}, содержащий старый пароль, новый пароль и подтверждение пароля
 * @returns Строка с описанием результата выполнения запроса
 */
export async function changePassword({
    UUID,
    data
}: {
    UUID: string;
    data: ChangePasswordRequest;
}): Promise<AxiosResponse<string>> {
    console.log("Calling change password for UUID: ", UUID);
    return api.post(urls.changePassword(UUID), data);
}

/**
 * Отправляет повторное письмо подтверждения на адрес электронной почты для смены пароля.
 *
 * @param data объект {@link SendCodePasswordRequest}, содержащий адрес электронной почты пользователя
 * @returns Строка с описанием результата выполнения запроса
 */
export async function sendCodePassword(
    data: SendCodePasswordRequest
): Promise<AxiosResponse<string>> {
    console.log("Calling send code password: ", data);
    return api.post(urls.sendCodePassword(), data);
}

/**
 * Подтверждает смену пароля шестизначным кодом подтверждения
 *
 * @param data объект {@link ConfirmChangeEmailRequest}, содержащий адрес электронной почты и шестизначный код подтверждения
 * @returns Строка с описанием результата выполнения запроса
 */
export async function confirmPassword(
    data: ConfirmChangeEmailRequest
): Promise<AxiosResponse<string>> {
    console.log("Calling confirm password: ", data);
    return api.post(urls.confirmPassword(), data);
}

/**
 * Удаляет пользователя по его UUID
 *
 * @param UUID UUID пользователя
 * @returns Строка с описанием результата выполнения запроса
 */
export async function deleteUserByUUID(UUID: string): Promise<AxiosResponse<string>> {
    console.log("Calling delete user with UUID: ", UUID);
    return api.delete(urls.deleteUserByUUID(UUID));
}

/**
 * Получает постраничный список друзей текущего пользователя — тех, с кем оформлена взаимная подписка.
 *
 * @param pageable - Параметры постраничного запроса.
 * @returns Промис со страницей друзей {@link UserResponse}.
 */
export async function getFriends(
    pageable?: Pageable
): Promise<AxiosResponse<Page<UserResponse>>> {
    console.log("Calling get friends");
    return api.get(urls.friends(), { params: pageable });
}

/**
 * Ищет среди друзей текущего пользователя по имени или username.
 *
 * @param query - Поисковый запрос. Если начинается с `@`, поиск идёт по имени пользователя.
 * @param pageable - Параметры постраничного запроса.
 * @returns Промис со страницей найденных друзей {@link UserResponse}.
 */
export async function getFriendsBySearch(
    query: string,
    pageable?: Pageable
): Promise<AxiosResponse<Page<UserResponse>>> {
    console.log(`Calling search friends by query: ${query}`);
    return api.get(urls.friendsSearch(), { params: { query, ...pageable } });
}

/**
 * Переключает подписку текущего пользователя на другого пользователя.
 *
 * @param UUID - UUID пользователя, на которого оформляется или отменяется подписка.
 * @returns Строка с описанием результата выполнения запроса.
 */
export async function toggleUserSubscription(
    UUID: string
): Promise<AxiosResponse<string>> {
    console.log(`Calling toggle user subscription ${UUID}`);
    return api.post(urls.subscribeUser(UUID));
}
