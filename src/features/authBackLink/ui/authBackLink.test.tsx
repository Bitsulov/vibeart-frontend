import {describe, expect, it} from "vitest";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {AuthBackLink} from "./authBackLink";
import {screen, waitFor, within} from "@testing-library/react";
import {Route, Routes} from "react-router-dom";
import {Home} from "pages/home";
import {userEvent} from "@testing-library/user-event";

describe("AuthBackLink - Возвращение на главную страницу", () => {
    it("Существует на странице", () => {
        renderWithProviders(<AuthBackLink />);

        const link = screen.getByRole("link", { name: "ariaLabel.goToHome" });

        expect(link).toBeInTheDocument();
    });
    it("Переход на главную страницу", async () => {
        renderWithProviders(
            <Routes>
                <Route path="/" element={<>
                    <div data-testid="auth-back-link">
                        <AuthBackLink />
                    </div>
                    <Home /></>} />
            </Routes>
        );

        const wrapper = screen.getByTestId("auth-back-link");
        const link = within(wrapper).getByRole("link", { name: "ariaLabel.goToHome" });

        await userEvent.click(link);
        await waitFor(() => {
            expect(document.title).toBe("titles.home");
        })
    });
});
