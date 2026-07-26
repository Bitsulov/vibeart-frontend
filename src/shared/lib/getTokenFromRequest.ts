import { decryptFromString } from "./crypto";

/**
 * Извлекает значение куки-файла по имени из сырого заголовка `Cookie`.
 *
 * @param cookieHeader - значение заголовка `Cookie` HTTP-запроса.
 * @param name - имя куки.
 * @returns Значение куки-файла или `null`, если куки-файл не найдена.
 */
function getCookieValueFromHeader(cookieHeader: string, name: string): string | null {
    const match = cookieHeader.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Извлекает и расшифровывает `accessToken` из заголовка `Cookie` запроса.
 *
 * В отличие от `getCookieByName`, не использует `document.cookie`
 * и пригодна для вызова внутри `loader` React Router во время SSR,
 * где `document` недоступен.
 *
 * @param request - входящий HTTP-запрос.
 * @returns Расшифрованный `accessToken` или `null`, если его нет в куки
 * или он не может быть расшифрован.
 */
export async function getTokenFromRequest(request: Request): Promise<string | null> {
    const cookieHeader = request.headers.get("cookie");
    if (!cookieHeader) return null;

    const encryptedAccessToken = getCookieValueFromHeader(cookieHeader, "accessToken");
    if (!encryptedAccessToken) return null;

    try {
        return await decryptFromString(
            encryptedAccessToken,
            import.meta.env.VITE_CRYPTO_KEY
        );
    } catch {
        return null;
    }
}
