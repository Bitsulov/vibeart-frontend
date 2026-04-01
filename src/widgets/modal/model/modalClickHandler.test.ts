import { describe, it, expect, vi } from "vitest";
import React from "react";
import { modalClickHandler } from "./modalClickHandler";

describe("modalClickHandler - обработчик клика по диалогу", () => {
    it("Вызывает stopPropagation", () => {
        const event = { stopPropagation: vi.fn() } as unknown as React.MouseEvent;

        modalClickHandler(event);

        expect(event.stopPropagation).toHaveBeenCalled();
    });
});