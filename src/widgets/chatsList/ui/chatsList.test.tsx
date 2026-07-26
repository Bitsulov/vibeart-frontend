import { describe, it, expect } from "vitest";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { ChatsList } from "./chatsList";
import { chatsMock } from "entities/chat";
import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

describe("ChatsList - список чатов", () => {
    it("Отображает заголовок секции", () => {
        renderWithProviders(<ChatsList chatsList={chatsMock} />);

        expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });

    it("Отображает поле поиска", () => {
        renderWithProviders(<ChatsList chatsList={chatsMock} />);

        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("Отображает все чаты из переданного списка", () => {
        renderWithProviders(<ChatsList chatsList={chatsMock} />);

        expect(screen.getAllByRole("link")).toHaveLength(chatsMock.length);
    });

    it("При пустом списке не отображает ссылки на чаты", () => {
        renderWithProviders(<ChatsList chatsList={[]} />);

        expect(screen.queryAllByRole("link")).toHaveLength(0);
    });

    it("При пустом списке отображает заглушку", () => {
        renderWithProviders(<ChatsList chatsList={[]} />);

        expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    });

    it("Отображает имя собеседника из поля companion.title", () => {
        renderWithProviders(<ChatsList chatsList={chatsMock} />);

        const headings = screen.getAllByRole("heading", {
            level: 2,
            name: chatsMock[0].companion.title
        });
        expect(headings.length).toBeGreaterThan(0);
    });

    it("Ссылки ведут на страницы чатов по UUID", () => {
        renderWithProviders(<ChatsList chatsList={chatsMock} />);

        const links = screen.getAllByRole("link");
        chatsMock.forEach((chat, i) => {
            expect(links[i]).toHaveAttribute("href", `/chats/${chat.UUID}`);
        });
    });

    it("Поле поиска принимает введённый текст", async () => {
        renderWithProviders(<ChatsList chatsList={chatsMock} />);

        const input = screen.getByRole("textbox");
        await userEvent.type(input, "Иван");

        expect(input).toHaveValue("Иван");
    });
});
