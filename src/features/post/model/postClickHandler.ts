import type {NavigateFunction} from "react-router-dom";

/**
 * Переходит на страницу детального просмотра поста.
 *
 * @param navigate - Функция навигации React Router.
 * @param ULID - Уникальный идентификатор поста.
 */
export function postClickHandler(navigate: NavigateFunction, ULID: string) {
    navigate(`/post/${ULID}`);
}
