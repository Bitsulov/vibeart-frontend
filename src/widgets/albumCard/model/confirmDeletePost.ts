import type {NavigateFunction} from "react-router-dom";

export function confirmDeletePost(navigate: NavigateFunction, userULID: string) {
    navigate(`/profile/${userULID}`);
}
