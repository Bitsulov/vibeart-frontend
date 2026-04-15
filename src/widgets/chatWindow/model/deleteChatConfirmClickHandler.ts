import type {NavigateFunction} from "react-router-dom";

export function deleteChatConfirmClickHandler(navigate: NavigateFunction) {
    navigate("/chats", { replace: true });
}
