import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { ProfileSubscribeButton } from "./profileSubscribeButton";

const defaultProps = {
    UUID: "00000000-0000-4000-8000-000000000015",
    name: "testUser",
    setIsSubscribed: vi.fn()
};

describe("ProfileSubscribeButton - кнопка подписки на пользователя", () => {
    it("Отображается как кнопка с меткой подписки, когда не подписан", () => {
        renderWithProviders(
            <ProfileSubscribeButton {...defaultProps} isSubscribed={false} />
        );

        expect(
            screen.getByRole("button", { name: "ariaLabel.subscribeUser" })
        ).toBeInTheDocument();
    });

    it("Отображается с меткой отписки, когда подписан", () => {
        renderWithProviders(
            <ProfileSubscribeButton {...defaultProps} isSubscribed={true} />
        );

        expect(
            screen.getByRole("button", { name: "ariaLabel.unsubscribeUser" })
        ).toBeInTheDocument();
    });

    it("Вызывает setIsSubscribed при клике", async () => {
        const setIsSubscribed = vi.fn();
        renderWithProviders(
            <ProfileSubscribeButton
                {...defaultProps}
                isSubscribed={false}
                setIsSubscribed={setIsSubscribed}
            />
        );

        await userEvent.click(screen.getByRole("button"));

        expect(setIsSubscribed).toHaveBeenCalledWith(true);
    });
});
