import {describe, it, expect, vi} from "vitest";
import {deleteChatConfirmClickHandler} from "./deleteChatConfirmClickHandler";

describe("deleteChatConfirmClickHandler - переход на страницу чатов после удаления", () => {
    it("Вызывает navigate('/chats') с replace: true", () => {
        const navigate = vi.fn();
        deleteChatConfirmClickHandler(navigate);
        expect(navigate).toHaveBeenCalledWith("/chats", { replace: true });
    });
});
