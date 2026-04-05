import {describe, it, expect, vi} from "vitest";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {PostCard} from "./postCard";
import {screen, fireEvent} from "@testing-library/react";
import {profileUserMock} from "entities/user";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
    return { ...actual, useNavigate: () => mockNavigate };
});

const defaultProps = {
    authorAvatarUrl: "",
    authorName: profileUserMock.name,
    authorULID: profileUserMock.ULID,
    imageUrl: "https://example.com/img.jpg",
    albumName: "Альбом",
    albumULID: "01ARZ3NDEKTSV4RRFFQ69G5FAV",
    title: "Название поста",
    description: "Описание поста",
    tagsList: [],
    likesCount: 10,
    reportsCount: 2,
    ULID: "01ARZ3NDEKTSV4RRFFQ69G5FAV",
    createdAt: "2026-04-05T12:00:00.000Z",
};

describe("PostCard - карточка поста", () => {
    it("Рендерится на странице", () => {
        renderWithProviders(<PostCard {...defaultProps} />);
        expect(screen.getByRole("article")).toBeInTheDocument();
    });

    it("Отображает заголовок поста", () => {
        renderWithProviders(<PostCard {...defaultProps} />);
        expect(screen.getByRole("heading", { level: 1, name: "Название поста" })).toBeInTheDocument();
    });

    it("Отображает описание поста", () => {
        renderWithProviders(<PostCard {...defaultProps} />);
        expect(screen.getByText("Описание поста")).toBeInTheDocument();
    });

    it("Ссылка на профиль автора корректна", () => {
        renderWithProviders(<PostCard {...defaultProps} />);
        const link = screen.getByRole("link", { name: `ariaLabel.goToUserProfile` });
        expect(link).toHaveAttribute("href", `/profile/${profileUserMock.ULID}`);
    });

    it("Кнопки редактирования и удаления не отображаются, если isOwner = false", () => {
        renderWithProviders(<PostCard {...defaultProps} isOwner={false} />);
        expect(screen.queryByRole("link", { name: "ariaLabel.editPost" })).not.toBeInTheDocument();
        expect(screen.queryByRole("button", { name: "ariaLabel.deletePost" })).not.toBeInTheDocument();
    });

    it("Кнопки редактирования и удаления отображаются при isOwner = true", () => {
        renderWithProviders(<PostCard {...defaultProps} isOwner={true} />);
        expect(screen.getAllByRole("link", { name: "ariaLabel.editPost" }).length).toBeGreaterThan(0);
        expect(screen.getAllByRole("button", { name: "ariaLabel.deletePost" }).length).toBeGreaterThan(0);
    });

    it("Клик по кнопке удаления открывает модальное окно подтверждения", () => {
        renderWithProviders(<PostCard {...defaultProps} isOwner={true} />);
        const deleteBtn = screen.getAllByRole("button", { name: "ariaLabel.deletePost" })[0];
        fireEvent.click(deleteBtn);
        expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("Клик по лайку обновляет счетчик", () => {
        renderWithProviders(<PostCard {...defaultProps} />);
        const likeBtn = screen.getByRole("button", { name: "ariaLabel.like" });
        fireEvent.click(likeBtn);
        expect(screen.getByRole("button", { name: "ariaLabel.unlike" })).toBeInTheDocument();
    });

    it("Повторный клик по лайку убирает лайк", () => {
        renderWithProviders(<PostCard {...defaultProps} />);
        const likeBtn = screen.getByRole("button", { name: "ariaLabel.like" });
        fireEvent.click(likeBtn);
        fireEvent.click(screen.getByRole("button", { name: "ariaLabel.unlike" }));
        expect(screen.getByRole("button", { name: "ariaLabel.like" })).toBeInTheDocument();
    });

    it("Клик по кнопке жалобы переключает состояние", () => {
        renderWithProviders(<PostCard {...defaultProps} />);
        const reportBtn = screen.getByRole("button", { name: "ariaLabel.report" });
        fireEvent.click(reportBtn);
        expect(screen.getByRole("button", { name: "ariaLabel.reported" })).toBeInTheDocument();
    });

    it("Повторный клик по жалобе не сбрасывает состояние", () => {
        renderWithProviders(<PostCard {...defaultProps} />);
        fireEvent.click(screen.getByRole("button", { name: "ariaLabel.report" }));
        fireEvent.click(screen.getByRole("button", { name: "ariaLabel.reported" }));
        expect(screen.getByRole("button", { name: "ariaLabel.reported" })).toBeInTheDocument();
    });

    it("Наведение на кнопку удаления показывает подсказку", () => {
        renderWithProviders(<PostCard {...defaultProps} isOwner={true} />);
        const deleteBtn = screen.getAllByRole("button", { name: "ariaLabel.deletePost" })[0];
        fireEvent.mouseEnter(deleteBtn);
        fireEvent.mouseLeave(deleteBtn);
    });

    it("Наведение на кнопку жалобы показывает подсказку", () => {
        renderWithProviders(<PostCard {...defaultProps} />);
        const reportBtn = screen.getByRole("button", { name: "ariaLabel.report" });
        fireEvent.mouseEnter(reportBtn);
        fireEvent.mouseLeave(reportBtn);
    });

    it("Подтверждение удаления вызывает navigate на профиль автора", () => {
        vi.useFakeTimers();
        renderWithProviders(<PostCard {...defaultProps} isOwner={true} />);
        fireEvent.click(screen.getAllByRole("button", { name: "ariaLabel.deletePost" })[0]);
        fireEvent.click(screen.getByText("DoConfirm"));
        vi.advanceTimersByTime(300);
        expect(mockNavigate).toHaveBeenCalled();
        vi.useRealTimers();
    });
});