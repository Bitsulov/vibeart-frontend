import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { CommunityItem } from "./communityItem";

const defaultProps = {
    UUID: "00000000-0000-4000-8000-000000000015",
    title: "Digital Art Club",
    description: "Community for digital artists",
    subscribersCount: 1200,
    isSubscribed: false
};

describe("CommunityItem - Карточка сообщества", () => {
    it("Отображается как article", () => {
        renderWithProviders(<CommunityItem {...defaultProps} />);
        expect(screen.getByRole("article")).toBeInTheDocument();
    });

    it("Отображает название сообщества", () => {
        renderWithProviders(<CommunityItem {...defaultProps} />);
        expect(
            screen.getByRole("heading", { level: 3, name: defaultProps.title })
        ).toBeInTheDocument();
    });

    it("Отображает описание сообщества", () => {
        renderWithProviders(<CommunityItem {...defaultProps} />);
        expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
    });

    it("Содержит ссылку на страницу сообщества", () => {
        renderWithProviders(<CommunityItem {...defaultProps} />);
        expect(screen.getByRole("link", { name: "goLink" })).toHaveAttribute(
            "href",
            `/communities/${defaultProps.UUID}`
        );
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

    it("Увеличивает счётчик подписчиков при подписке", async () => {
        renderWithProviders(
            <CommunityItem {...defaultProps} subscribersCount={5} isSubscribed={false} />
        );
        await userEvent.click(screen.getByRole("button"));
        expect(screen.getByText("6")).toBeInTheDocument();
    });

    it("Уменьшает счётчик подписчиков при отписке", async () => {
        renderWithProviders(
            <CommunityItem {...defaultProps} subscribersCount={5} isSubscribed={true} />
        );
        await userEvent.click(screen.getByRole("button"));
        expect(screen.getByText("4")).toBeInTheDocument();
    });

    it("Не отображает кнопку подписки для своих сообществ", () => {
        renderWithProviders(<CommunityItem {...defaultProps} isOwner={true} />);
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
});
