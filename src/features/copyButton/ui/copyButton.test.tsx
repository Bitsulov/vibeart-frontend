import {describe, expect, it, vi} from "vitest";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {CopyButton} from "./copyButton";
import {screen, waitFor} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

describe("copyButton - Кнопка копирования", () => {
    it("Нажатие, копирование, подсказка", async () => {
        const copyFn = vi.fn().mockResolvedValue(undefined);

        Object.assign(navigator, {
            clipboard: {
                writeText: copyFn,
            },
        });

        renderWithProviders(
            <CopyButton text="t" />
        );

        const button = screen.getByRole("button", {name: "ariaLabel.copy"});
        await userEvent.click(button);
        const hint = screen.getByText("hint.copied");

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith("t");
        expect(hint).toBeInTheDocument();
        await waitFor(() => {
            expect(hint).not.toBeInTheDocument();
        });
    })
});
