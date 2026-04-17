import type {NavigateFunction} from "react-router-dom";

/** Переходит на предыдущую страницу в истории браузера. */
export function returnBackHandler(navigate: NavigateFunction) {
    navigate(-1);
}
