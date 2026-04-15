import {describe, it, expect, vi} from "vitest";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {MessagesForm} from "./messagesForm";
import {screen, fireEvent, waitFor} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

describe("MessagesForm - форма отправки сообщения", () => {
    it("Рендерит поле ввода", () => {
        renderWithProviders(<MessagesForm setMessages={vi.fn()} />);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("Рендерит кнопку отправки", () => {
        renderWithProviders(<MessagesForm setMessages={vi.fn()} />);
        expect(screen.getByRole("button", { name: "ariaLabel.sendMessage" })).toBeInTheDocument();
    });

    it("Отправка пустой формы не вызывает setMessages", () => {
        const setMessages = vi.fn();
        renderWithProviders(<MessagesForm setMessages={setMessages} />);
        fireEvent.submit(screen.getByRole("button").closest("form")!);
        expect(setMessages).not.toHaveBeenCalled();
    });

    it("Отправка заполненной формы вызывает setMessages", async () => {
        const setMessages = vi.fn();
        renderWithProviders(<MessagesForm setMessages={setMessages} />);
        await userEvent.type(screen.getByRole("textbox"), "Hello world");
        fireEvent.submit(screen.getByRole("button").closest("form")!);
        await waitFor(() => expect(setMessages).toHaveBeenCalled());
    });
});
