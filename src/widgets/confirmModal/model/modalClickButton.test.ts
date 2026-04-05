import {describe, it, expect, vi} from "vitest";
import {modalClickHandler} from "./modalClickButton";
import type React from "react";

describe("modalClickHandler - предотвращает всплытие события из диалога", () => {
    it("Вызывает e.stopPropagation()", () => {
        const event = { stopPropagation: vi.fn() } as unknown as React.MouseEvent;
        modalClickHandler(event);
        expect(event.stopPropagation).toHaveBeenCalled();
    });
});
