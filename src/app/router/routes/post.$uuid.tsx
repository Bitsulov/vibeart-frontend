import { data, useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { getPost } from "entities/post";
import { getTokenFromRequest } from "shared/lib/getTokenFromRequest";
import { createServerInstance } from "shared/api/serverInstance";
import { Post } from "pages/post";
import { Error as ErrorPage } from "pages/error";
import axios from "axios";

/**
 * Загрузчик маршрута публикации.
 *
 * Проверяет на сервере, существует ли публикация с указанным UUID, чтобы
 * при ошибке сразу отдать браузеру HTTP-статус из ответа API, иначе 500.
 * Токен пользователя берётся из заголовка `Cookie` запроса, а не из
 * `document.cookie`, недоступного на сервере.
 *
 * Если токен отсутствует, проверка не выполняется и функция возвращает `found: true`.
 *
 * @param args.params.uuid - UUID публикации из адреса.
 * @param args.request - входящий HTTP-запрос.
 * @returns Объект с полем `found`; при `false` — со статусом ответа.
 */
export async function loader({ params, request }: LoaderFunctionArgs) {
    const uuid = params.uuid ?? "";
    const token = await getTokenFromRequest(request);
    const client = createServerInstance(token);

    try {
        await getPost(uuid, client);
    } catch (error) {
        const errorCode = axios.isAxiosError(error)
            ? (error.response?.status ?? 500)
            : 500;
        return data({ found: false, errorCode }, { status: errorCode });
    }

    return data({ found: true, errorCode: 200 });
}

/** Маршрут страницы публикации: показывает {@link Post} или {@link ErrorPage} по данным {@link loader}. */
export default function PostRoute() {
    const { found, errorCode } = useLoaderData<typeof loader>();
    return found ? <Post /> : <ErrorPage errorCode={errorCode} />;
}
