import { describe, it, expect } from "vitest";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { ErrorInfo } from "./errorInfo";
import { screen } from "@testing-library/react";

describe("ErrorInfo - секция страницы ошибки", () => {
    it("По умолчанию показывает код 404 и соответствующий текст", () => {
        renderWithProviders(<ErrorInfo />);
        expect(screen.getByText("404")).toBeInTheDocument();
        expect(screen.getByText("error.error404")).toBeInTheDocument();
    });

    it("Показывает переданный код 500 и текст ошибки сервера", () => {
        renderWithProviders(<ErrorInfo errorCode={500} />);
        expect(screen.getByText("500")).toBeInTheDocument();
        expect(screen.getByText("error.error500")).toBeInTheDocument();
    });

    it("Показывает переданный код 401 и текст об авторизации", () => {
        renderWithProviders(<ErrorInfo errorCode={401} />);
        expect(screen.getByText("401")).toBeInTheDocument();
        expect(screen.getByText("error.error401")).toBeInTheDocument();
    });

    it("Показывает переданный код 403 и текст об ограничении доступа", () => {
        renderWithProviders(<ErrorInfo errorCode={403} />);
        expect(screen.getByText("403")).toBeInTheDocument();
        expect(screen.getByText("error.error403")).toBeInTheDocument();
    });

    it("Показывает ссылки на главную и на страницу сообщения об ошибке", () => {
        renderWithProviders(<ErrorInfo />);
        expect(screen.getByRole("link", { name: "ariaLabel.goToHome" })).toHaveAttribute(
            "href",
            "/"
        );
        expect(
            screen.getByRole("link", { name: "ariaLabel.goToContacts" })
        ).toHaveAttribute("href", "/contacts");
    });
});
