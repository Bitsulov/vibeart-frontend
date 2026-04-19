import {describe, it, expect} from "vitest";
import {screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {CommunityItem} from "./communityItem";

const defaultProps = {
    ULID: "01ARZ3NDEKTSV4RRFFQ69G5FB1",
    title: "Digital Art Club",
    description: "Community for digital artists",
    subscribersCount: 1200,
    isSubscribed: false,
};

describe("CommunityItem - Карточка сообщества", () => {
    it("Отображается как article", () => {
        renderWithProviders(<CommunityItem {...defaultProps} />);
        expect(screen.getByRole("article")).toBeInTheDocument();
    });

    it("Отображает название сообщества", () => {
        renderWithProviders(<CommunityItem {...defaultProps} />);
        expect(screen.getByRole("heading", {level: 3, name: defaultProps.title})).toBeInTheDocument();
    });

    it("Отображает описание сообщества", () => {
        renderWithProviders(<CommunityItem {...defaultProps} />);
        expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
    });

    it("Содержит ссылку на страницу сообщества", () => {
        renderWithProviders(<CommunityItem {...defaultProps} />);
        expect(screen.getByRole("link", {name: "goLink"})).toHaveAttribute("href", `/communities/${defaultProps.ULID}`);
    });

    it("Содержит кнопку подписки", () => {
        renderWithProviders(<CommunityItem {...defaultProps} />);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("Кнопка отображает 'subscribe' когда не подписан", () => {
        renderWithProviders(<CommunityItem {...defaultProps} isSubscribed={false} />);
        expect(screen.getByText("subscribe")).toBeInTheDocument();
    });

    it("Кнопка отображает 'unscribe' когда подписан", () => {
        renderWithProviders(<CommunityItem {...defaultProps} isSubscribed={true} />);
        expect(screen.getByText("unscribe")).toBeInTheDocument();
    });

    it("Переключает подписку при клике на кнопку", async () => {
        renderWithProviders(<CommunityItem {...defaultProps} isSubscribed={false} />);
        await userEvent.click(screen.getByRole("button"));
        expect(screen.getByText("unscribe")).toBeInTheDocument();
    });
});
