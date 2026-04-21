import type {NavigateFunction} from "react-router-dom";

/** Перенаправляет на страницу сообществ после удаления, заменяя запись в истории. */
export function deleteCommunityClickHandler(navigate: NavigateFunction) {
    navigate("/communities", {replace: true});
}
