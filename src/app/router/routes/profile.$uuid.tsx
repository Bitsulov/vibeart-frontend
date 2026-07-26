import { data, useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { getUserByUUID } from "entities/user";
import { getTokenFromRequest } from "shared/lib/getTokenFromRequest";
import { createServerInstance } from "shared/api/serverInstance";
import { Profile } from "pages/profile";
import { Error as ErrorPage } from "pages/error";
import axios from "axios";

/**
 * Загрузчик маршрута профиля.
 *
 * Проверяет на сервере, существует ли пользователь с указанным UUID, чтобы
 * при ошибке сразу отдать браузеру HTTP-статус из ответа API, иначе 500.
 * Токен пользователя берётся из заголовка `Cookie` запроса, а не из
 * `document.cookie`, недоступного на сервере.
 *
 * Если токен отсутствует, проверка не выполняется и функция возвращает `found: true`.
 *
 * @param args.params.uuid - UUID пользователя из адреса.
 * @param args.request - входящий HTTP-запрос.
 * @returns Объект с полем `found`; при `false` — со статусом ответа.
 */
export async function loader({ params, request }: LoaderFunctionArgs) {
    const uuid = params.uuid ?? "";
    const token = await getTokenFromRequest(request);
    const client = createServerInstance(token);

    try {
        await getUserByUUID(uuid, client);
    } catch (error) {
        const errorCode = axios.isAxiosError(error)
            ? (error.response?.status ?? 500)
            : 500;
        return data({ found: false, errorCode }, { status: errorCode });
    }

    return data({ found: true, errorCode: 200 });
}

/** Маршрут страницы профиля: показывает {@link Profile} или {@link ErrorPage} по данным {@link loader}. */
export default function ProfileRoute() {
    const { found, errorCode } = useLoaderData<typeof loader>();
    return found ? <Profile /> : <ErrorPage errorCode={errorCode} />;
}
