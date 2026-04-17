import type {NavigateFunction} from "react-router-dom";

/**
 * Переходит на предыдущую страницу в истории браузера.
 *
 * @param navigate - Функция навигации React Router.
 */
export function returnBackHandler(navigate: NavigateFunction) {
     navigate(-1);
}
