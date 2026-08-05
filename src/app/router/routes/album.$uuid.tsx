import { data, useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { getAlbum } from "entities/album";
import { getTokenFromRequest } from "shared/lib/getTokenFromRequest";
import { createServerInstance } from "shared/api/serverInstance";
import { Album } from "pages/album";
import { Error as ErrorPage } from "pages/error";
import axios from "axios";

/**
 * Загрузчик маршрута альбома.
 *
 * Проверяет на сервере, существует ли альбом с указанным UUID, чтобы
 * при ошибке сразу отдать браузеру HTTP-статус из ответа API.
 * Токен пользователя берётся из заголовка `Cookie` запроса, а не из
 * `document.cookie`, недоступного на сервере.
 *
 * Если токен отсутствует, проверка не выполняется и функция возвращает `found: true`.
 *
 * @param args.params.uuid - UUID альбома из адреса.
 * @param args.request - входящий HTTP-запрос.
 * @returns Объект с полем `found`; при `false` — со статусом ответа.
 */
export async function loader({ params, request }: LoaderFunctionArgs) {
    const uuid = params.uuid ?? "";
    const token = await getTokenFromRequest(request);
    const client = createServerInstance(token);

    try {
        await getAlbum(uuid, client);
    } catch (error) {
        const errorCode = axios.isAxiosError(error)
            ? (error.response?.status ?? 500)
            : 500;
        return data({ found: false, errorCode }, { status: errorCode });
    }

    return data({ found: true, errorCode: 200 });
}

/** Маршрут страницы альбома: показывает {@link Album} или {@link ErrorPage} по данным {@link loader}. */
export default function AlbumRoute() {
    const { found, errorCode } = useLoaderData<typeof loader>();
    return found ? <Album /> : <ErrorPage errorCode={errorCode} />;
}
