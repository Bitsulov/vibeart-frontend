import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { CommunitySubscribeButton } from "./communitySubscribeButton";

const defaultProps = {
    UUID: "00000000-0000-4000-8000-000000000015",
    name: "testCommunity",
    setIsSubscribed: vi.fn()
};

describe("CommunitySubscribeButton - кнопка подписки на сообщество", () => {
    it("Отображается как кнопка с меткой подписки, когда не подписан", () => {
        renderWithProviders(
            <CommunitySubscribeButton {...defaultProps} isSubscribed={false} />
        );

        expect(
            screen.getByRole("button", { name: "ariaLabel.subscribeCommunity" })
        ).toBeInTheDocument();
    });

    it("Отображается с меткой отписки, когда подписан", () => {
        renderWithProviders(
            <CommunitySubscribeButton {...defaultProps} isSubscribed={true} />
        );

        expect(
            screen.getByRole("button", { name: "ariaLabel.unsubscribeCommunity" })
        ).toBeInTheDocument();
    });

    it("Вызывает setIsSubscribed при клике", async () => {
        const setIsSubscribed = vi.fn();
        renderWithProviders(
            <CommunitySubscribeButton
                {...defaultProps}
                isSubscribed={false}
                setIsSubscribed={setIsSubscribed}
            />
        );

        await userEvent.click(screen.getByRole("button"));

        expect(setIsSubscribed).toHaveBeenCalledWith(true);
    });
});
