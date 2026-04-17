import type {NavigateFunction} from "react-router-dom";

/** Перенаправляет на список чатов после подтверждения удаления. */
export function deleteChatConfirmClickHandler(navigate: NavigateFunction) {
    navigate("/chats", { replace: true });
}
