import type {NavigateFunction} from "react-router-dom";

/** Переходит на страницу профиля автора после подтверждения удаления поста. */
export function confirmDeletePost(navigate: NavigateFunction, userULID: string) {
    navigate(`/profile/${userULID}`);
}
