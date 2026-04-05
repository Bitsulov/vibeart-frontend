import {describe, it, expect} from "vitest";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {PostComments} from "./postComments";
import {screen} from "@testing-library/react";
import {commentsMock} from "entities/comment";
import {principalUserMock} from "entities/user";

const defaultProps = {
    commentsCount: 5,
    commentsList: commentsMock,
    userInfo: principalUserMock,
};

describe("PostComments - секция комментариев поста", () => {
    it("Рендерится на странице", () => {
        renderWithProviders(<PostComments {...defaultProps} />);
        expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    });

    it("Отображает заголовок секции", () => {
        renderWithProviders(<PostComments {...defaultProps} />);
        expect(screen.getAllByRole("heading", { level: 2 }).length).toBeGreaterThan(0);
    });

    it("Отображает форму добавления комментария", () => {
        renderWithProviders(<PostComments {...defaultProps} />);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("Отображает список комментариев", () => {
        renderWithProviders(<PostComments {...defaultProps} />);
        const links = screen.getAllByRole("link", { name: /ariaLabel.goToUserProfile/ });
        expect(links.length).toBe(commentsMock.length);
    });
});
