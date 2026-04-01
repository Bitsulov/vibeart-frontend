import {describe, expect, it, vi} from "vitest";
import {screen, fireEvent} from "@testing-library/react";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {MouseHint} from "./mouseHint";

describe("MouseHint - подсказка у курсора мыши", () => {
    it("Существует на странице", () => {
        renderWithProviders(<MouseHint />);

        const hint = screen.getByRole("paragraph", {hidden: true});

        expect(hint).toBeInTheDocument();
    });

    it("Скрыта когда текст пустой (нет класса active)", () => {
        renderWithProviders(<MouseHint />, {preloadedState: {hint: {text: ""}}});

        const hint = screen.getByRole("paragraph", {hidden: true});

        expect(hint).not.toHaveClass("active");
    });

    it("Видна когда текст задан (есть класс active)", () => {
        renderWithProviders(<MouseHint />, {preloadedState: {hint: {text: "Копировать"}}});

        const hint = screen.getByRole("paragraph", {hidden: true});

        expect(hint).toHaveClass("active");
    });

    it("Отображает текст из стора", () => {
        renderWithProviders(<MouseHint />, {preloadedState: {hint: {text: "Нравится"}}});

        expect(screen.getByText("Нравится")).toBeInTheDocument();
    });

    it("Имеет aria-hidden=true", () => {
        renderWithProviders(<MouseHint />);

        const hint = screen.getByRole("paragraph", {hidden: true});

        expect(hint).toHaveAttribute("aria-hidden", "true");
    });

    it("Позиционируется по координатам мыши", () => {
        renderWithProviders(<MouseHint />);

        fireEvent.mouseMove(window, {clientX: 100, clientY: 200});

        const hint = screen.getByRole("paragraph", {hidden: true});

        expect(hint).toHaveStyle({left: "110px", top: "170px"});
    });
});