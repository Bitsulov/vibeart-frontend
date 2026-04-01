import {describe, expect, it, vi} from "vitest";
import {resetNavigate} from "./resetNavigate";
import type React from "react";

describe("resetNavigate - остановка всплытия события", () => {
    it("Вызывает e.stopPropagation", () => {
        const event = {stopPropagation: vi.fn()} as unknown as React.MouseEvent;

        resetNavigate(event);

        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });
});
