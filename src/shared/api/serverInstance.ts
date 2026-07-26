import axios, { type AxiosInstance } from "axios";

const API_BASE: string = import.meta.env.VITE_INTERNAL_API_BASE;

/**
 * Создаёт объект axios для запросов к API из серверного окружения (`loader`).
 *
 * В отличие от `api` из `shared/api/instance`, не создаётся один раз на всё
 * приложение: не содержит перехватчиков и не обращается к `document`/`window`.
 * Новый объект создаётся при каждом вызове `loader` (то есть на каждый
 * входящий HTTP-запрос страницы), чтобы токен одного пользователя не мог
 * попасть в запрос другого пользователя при одновременной обработке
 * запросов на сервере.
 *
 * @param token - расшифрованный `accessToken`, если он есть.
 * @returns Новый объект axios с базовым адресом API и, при наличии токена,
 * заголовком `Authorization`.
 */
export function createServerInstance(token?: string | null): AxiosInstance {
    return axios.create({
        baseURL: API_BASE,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
    });
}
