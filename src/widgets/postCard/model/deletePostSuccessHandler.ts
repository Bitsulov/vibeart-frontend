import type { NavigateFunction } from "react-router-dom";

/**
 * Переходит на страницу автора после успешного удаления публикации.
 *
 * @param navigate - Функция навигации React Router.
 * @param authorHref - Адрес страницы автора публикации: пользователя или сообщества.
 */
export function deletePostSuccessHandler(navigate: NavigateFunction, authorHref: string) {
    navigate(authorHref);
}
