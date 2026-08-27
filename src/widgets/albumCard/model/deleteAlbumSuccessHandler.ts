import type { NavigateFunction } from "react-router-dom";

/**
 * Переходит на страницу автора после успешного удаления альбома.
 *
 * @param navigate - Функция навигации React Router.
 * @param authorUUID - UUID автора альбома: пользователя или сообщества.
 * @param isCommunityAuthor - Признак того, что автор альбома — сообщество, а не пользователь.
 */
export function deleteAlbumSuccessHandler(
    navigate: NavigateFunction,
    authorUUID: string,
    isCommunityAuthor: boolean
) {
    navigate(isCommunityAuthor ? `/communities/${authorUUID}` : `/profile/${authorUUID}`);
}
