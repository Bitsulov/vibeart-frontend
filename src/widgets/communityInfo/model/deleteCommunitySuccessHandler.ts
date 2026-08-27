import type { NavigateFunction } from "react-router-dom";

/**
 * Перенаправляет на страницу сообществ после успешного удаления, заменяя запись в истории.
 *
 * @param navigate - Функция навигации React Router.
 */
export function deleteCommunitySuccessHandler(navigate: NavigateFunction) {
    navigate("/communities", { replace: true });
}
