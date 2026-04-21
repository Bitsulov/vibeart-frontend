import {describe, it, expect, vi} from "vitest";
import {screen, fireEvent} from "@testing-library/react";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {CommunityModal} from "./communityModal";
import type {UserType} from "entities/user";

const owner: UserType = {
    id: 1,
    ULID: "01ARZ3NDEKTSV4RRFFQ69G5FAV",
    email: "owner@test.com",
    name: "Owner Name",
    username: "owner",
    description: "",
    worksCount: 0,
    subscribersCount: 0,
    subscribesCount: 0,
    albumList: [],
    createdAt: "2026-01-01T00:00:00.000Z",
    trustStatus: "trust",
    isAuthenticated: true,
    isBlocked: false,
    onlineStatus: "online",
    role: "user",
    avatarUrl: "",
};

const admin: UserType = {
    ...owner,
    id: 2,
    ULID: "01ARZ3NDEKTSV4RRFFQ69G5FAA",
    name: "Admin Name",
    username: "admin",
};

const defaultProps = {
    isShow: true,
    setIsShow: vi.fn(),
    description: "Описание сообщества",
    createdAt: "2026-01-10T10:00:00.000Z",
    owner,
    admins: [admin],
};

describe("CommunityModal - модальное окно информации о сообществе", () => {
    it("Отображает описание сообщества", () => {
        renderWithProviders(<CommunityModal {...defaultProps} />);

        expect(screen.getByText("Описание сообщества")).toBeInTheDocument();
    });

    it("Отображает имя владельца", () => {
        renderWithProviders(<CommunityModal {...defaultProps} />);

        expect(screen.getByText("Owner Name")).toBeInTheDocument();
    });

    it("Отображает имена администраторов", () => {
        renderWithProviders(<CommunityModal {...defaultProps} />);

        expect(screen.getByText("Admin Name")).toBeInTheDocument();
    });

    it("Не рендерится когда isShow=false", () => {
        renderWithProviders(<CommunityModal {...defaultProps} isShow={false} />);

        expect(screen.queryByText("Описание сообщества")).not.toBeInTheDocument();
    });

    it("Закрывается по клику на кнопку закрытия", () => {
        vi.useFakeTimers();
        const setIsShow = vi.fn();
        renderWithProviders(<CommunityModal {...defaultProps} setIsShow={setIsShow} />);

        fireEvent.click(screen.getByRole("button", {name: "ariaLabel.closeLanguageModal"}));
        vi.runAllTimers();

        expect(setIsShow).toHaveBeenCalledWith(false);
        vi.useRealTimers();
    });
});
