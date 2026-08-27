import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { CommunitiesSubscribeButton } from "./communitiesSubscribeButton";

const defaultProps = {
    UUID: "00000000-0000-4000-8000-000000000015",
    setIsSubscribed: vi.fn(),
    setSubscribersCount: vi.fn()
};

describe("CommunitiesSubscribeButton - Кнопка подписки", () => {
    it("Отображается как кнопка", () => {
        renderWithProviders(
            <CommunitiesSubscribeButton {...defaultProps} isSubscribed={false} />
        );
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("Отображает ключ подписки когда не подписан", () => {
        renderWithProviders(
            <CommunitiesSubscribeButton {...defaultProps} isSubscribed={false} />
        );
        expect(screen.getByText("subscribe")).toBeInTheDocument();
    });

    it("Отображает ключ отписки когда подписан", () => {
        renderWithProviders(
            <CommunitiesSubscribeButton {...defaultProps} isSubscribed={true} />
        );
        expect(screen.getByText("unscribe")).toBeInTheDocument();
    });

    it("Вызывает setIsSubscribed при клике", async () => {
        const setIsSubscribed = vi.fn();
        renderWithProviders(
            <CommunitiesSubscribeButton
                {...defaultProps}
                isSubscribed={false}
                setIsSubscribed={setIsSubscribed}
            />
        );
        await userEvent.click(screen.getByRole("button"));
        expect(setIsSubscribed).toHaveBeenCalledWith(true);
    });
});
