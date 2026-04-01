import {afterEach, describe, expect, it, vi} from "vitest";
import {screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {Post} from "./post";
import type {UserType} from "entities/user";
import * as postClickHandlerModule from "../model/postClickHandler";
import * as toggleLikeHandlerModule from "../model/toggleLikeHandler";

const mockAuthor: UserType = {
    id: 1,
    ULID: "01ARZ3NDEKTSV4RRFFQ69G5FAV",
    name: "Test User",
    email: "test@test.com",
    username: "@test_user",
    description: "",
    worksCount: 0,
    subscribersCount: 0,
    subscribesCount: 0,
    albumList: [],
    createdAt: "2026-01-01T00:00:00.000Z",
    trustStatus: "untrust",
    isAuthenticated: false,
    isBlocked: false,
    onlineStatus: "offline",
    role: "user",
    avatarUrl: "",
};

const defaultProps = {
    ULID: "01ARZ3NDEKTSV4RRFFQ69G5FAW",
    title: "Test Post",
    author: mockAuthor,
    date: "2026-01-01T00:00:00.000Z",
    imageUrl: "/img/post.jpg",
    likesCount: 5,
    commentsCount: 3,
};

describe("Post - карточка поста", () => {
    afterEach(() => vi.restoreAllMocks());

    it("Клик по статье вызывает postClickHandler с нужным ULID", async () => {
        const spy = vi.spyOn(postClickHandlerModule, "postClickHandler").mockImplementation(() => {});

        renderWithProviders(<Post {...defaultProps} />);

        await userEvent.click(screen.getByRole("article"));

        expect(spy).toHaveBeenCalledWith(expect.any(Function), defaultProps.ULID);
    });

    it("Повторный клик по статье вызывает postClickHandler дважды", async () => {
        const spy = vi.spyOn(postClickHandlerModule, "postClickHandler").mockImplementation(() => {});

        renderWithProviders(<Post {...defaultProps} />);

        const article = screen.getByRole("article");
        await userEvent.click(article);
        await userEvent.click(article);

        expect(spy).toHaveBeenCalledTimes(2);
    });

    it("Клик по кнопке лайка вызывает toggleLikeHandler", async () => {
        const spy = vi.spyOn(toggleLikeHandlerModule, "toggleLikeHandler");

        renderWithProviders(<Post {...defaultProps} />);

        await userEvent.click(screen.getByRole("button", {name: "ariaLabel.like"}));

        expect(spy).toHaveBeenCalled();
    });

    it("Повторный клик по кнопке лайка снимает лайк (ariaLabel меняется)", async () => {
        renderWithProviders(<Post {...defaultProps} />);

        const likeButton = screen.getByRole("button", {name: "ariaLabel.like"});
        await userEvent.click(likeButton);

        expect(screen.getByRole("button", {name: "ariaLabel.unlike"})).toBeInTheDocument();
    });
});