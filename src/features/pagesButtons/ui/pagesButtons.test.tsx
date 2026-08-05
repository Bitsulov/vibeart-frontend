import { describe, it, expect, vi } from "vitest";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { PagesButtons } from "./pagesButtons";
import { screen } from "@testing-library/react";

const setCurrentPage = vi.fn();

describe("PagesButtons - блок постраничной навигации", () => {
    it("Не рендерится при единственной странице", () => {
        const { container } = renderWithProviders(
            <PagesButtons
                currentPage={1}
                setCurrentPage={setCurrentPage}
                pagesCount={1}
                pagesDelta={2}
            />
        );
        expect(container).toBeEmptyDOMElement();
    });

    it("Рендерится при нескольких страницах", () => {
        renderWithProviders(
            <PagesButtons
                currentPage={1}
                setCurrentPage={setCurrentPage}
                pagesCount={3}
                pagesDelta={2}
            />
        );
        expect(
            screen.getAllByRole("button", { name: "ariaLabel.changePage" })
        ).toHaveLength(3);
    });
});
