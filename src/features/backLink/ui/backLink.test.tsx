import {describe, it, expect, vi} from "vitest";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {BackLink} from "./backLink";
import {screen, fireEvent} from "@testing-library/react";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
    return { ...actual, useNavigate: () => mockNavigate };
});

describe("BackLink - кнопка возврата на предыдущую страницу", () => {
    it("Отображает текст кнопки", () => {
        renderWithProviders(<BackLink />);
        expect(screen.getByText("post.back")).toBeInTheDocument();
    });

    it("Клик вызывает navigate(-1)", () => {
        renderWithProviders(<BackLink />);
        fireEvent.click(screen.getByRole("button", { name: "ariaLabel.goBack" }));
        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    it("Принимает дополнительный className", () => {
        renderWithProviders(<BackLink className="custom" />);
        const button = screen.getByRole("button", { name: "ariaLabel.goBack" });
        expect(button.className).toContain("custom");
    });
});
