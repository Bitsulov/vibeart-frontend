import {describe, it, expect, vi} from "vitest";
import {screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {CommunitiesSubscribeButton} from "./communitiesSubscribeButton";

const setIsSubscribed = vi.fn();

describe("CommunitiesSubscribeButton - Кнопка подписки", () => {
    it("Отображается как кнопка", () => {
        renderWithProviders(<CommunitiesSubscribeButton isSubscribed={false} setIsSubscribed={setIsSubscribed} />);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("Отображает ключ подписки когда не подписан", () => {
        renderWithProviders(<CommunitiesSubscribeButton isSubscribed={false} setIsSubscribed={setIsSubscribed} />);
        expect(screen.getByText("subscribe")).toBeInTheDocument();
    });

    it("Отображает ключ отписки когда подписан", () => {
        renderWithProviders(<CommunitiesSubscribeButton isSubscribed={true} setIsSubscribed={setIsSubscribed} />);
        expect(screen.getByText("unscribe")).toBeInTheDocument();
    });

    it("Вызывает setIsSubscribed при клике", async () => {
        const handler = vi.fn();
        renderWithProviders(<CommunitiesSubscribeButton isSubscribed={false} setIsSubscribed={handler} />);
        await userEvent.click(screen.getByRole("button"));
        expect(handler).toHaveBeenCalledTimes(1);
    });
});
