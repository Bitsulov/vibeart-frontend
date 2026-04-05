import {describe, it, expect, vi} from "vitest";
import {clickHandler} from "./clickHandler";
import type React from "react";

describe("clickHandler - вызывает обработчики и скрывает подсказку", () => {
    it("Вызывает onMouseLeave с событием и onClick", () => {
        const onClick = vi.fn();
        const onMouseLeave = vi.fn();
        const event = {} as React.MouseEvent;

        clickHandler(onClick, onMouseLeave, event);

        expect(onMouseLeave).toHaveBeenCalledWith(event);
        expect(onClick).toHaveBeenCalled();
    });

    it("Вызывает onClick даже если onMouseLeave ничего не делает", () => {
        const onClick = vi.fn();
        const onMouseLeave = vi.fn();

        clickHandler(onClick, onMouseLeave, {} as React.MouseEvent);

        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
