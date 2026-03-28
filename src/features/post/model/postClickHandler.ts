import type {NavigateFunction} from "react-router-dom";

export function postClickHandler(navigate: NavigateFunction, ULID: string) {
    navigate(`/post/${ULID}`);
}
