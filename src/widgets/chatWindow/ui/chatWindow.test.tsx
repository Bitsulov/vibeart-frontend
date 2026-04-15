import {describe, it, expect, vi, beforeAll} from "vitest";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {ChatWindow} from "./chatWindow";

beforeAll(() => {
    window.HTMLElement.prototype.scrollTo = vi.fn();
});
import {screen, fireEvent} from "@testing-library/react";
import {messagesMock} from "entities/message";
import {profileUserMock} from "entities/user";

const defaultProps = {
    messages: messagesMock,
    name: profileUserMock.name,
    ULID: profileUserMock.ULID,
    avatarUrl: profileUserMock.avatarUrl,
    onlineStatus: "online" as const,
};

describe("ChatWindow - окно чата", () => {
    it("Рендерится на странице", () => {
        const { container } = renderWithProviders(<ChatWindow {...defaultProps} />);
        expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("Отображает имя собеседника", () => {
        renderWithProviders(<ChatWindow {...defaultProps} />);
        expect(screen.getByText(profileUserMock.name)).toBeInTheDocument();
    });

    it("Отображает сообщения из списка", () => {
        renderWithProviders(<ChatWindow {...defaultProps} />);
        expect(screen.getByText(messagesMock[0].text)).toBeInTheDocument();
    });

    it("Отображает кнопку назад к чатам", () => {
        renderWithProviders(<ChatWindow {...defaultProps} />);
        expect(screen.getByRole("link", { name: "ariaLabel.goToChats" })).toBeInTheDocument();
    });

    it("Открывает всплывающий список настроек при клике на кнопку", () => {
        renderWithProviders(<ChatWindow {...defaultProps} />);
        const btn = screen.getByRole("button", { name: "ariaLabel.openChatSettings" });
        fireEvent.click(btn);
        expect(screen.getByRole("menu")).not.toHaveAttribute("inert");
    });

    it("Показывает статус онлайн при onlineStatus=online", () => {
        renderWithProviders(<ChatWindow {...defaultProps} onlineStatus="online" />);
        expect(screen.getByText("chat.online")).toBeInTheDocument();
    });

    it("Показывает заголовок при пустом списке сообщений", () => {
        renderWithProviders(<ChatWindow {...defaultProps} messages={[]} />);
        expect(screen.getByText("chat.empty")).toBeInTheDocument();
    });
});
