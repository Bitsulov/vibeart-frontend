import {describe, it, expect} from "vitest";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {Comment} from "./comment";
import {screen} from "@testing-library/react";
import {profileUserMock} from "entities/user";

const defaultProps = {
    authorULID: profileUserMock.ULID,
    authorName: profileUserMock.name,
    authorAvatarUrl: "",
    text: "Текст комментария",
    date: "2026-04-05T08:52:55.271Z",
};

describe("Comment - отображение комментария", () => {
    it("Рендерится на странице", () => {
        renderWithProviders(<Comment {...defaultProps} />);
        expect(screen.getByText("Текст комментария")).toBeInTheDocument();
    });

    it("Отображает имя автора", () => {
        renderWithProviders(<Comment {...defaultProps} />);
        expect(screen.getByText(profileUserMock.name)).toBeInTheDocument();
    });

    it("Ссылка ведет на профиль автора", () => {
        renderWithProviders(<Comment {...defaultProps} />);
        const link = screen.getByRole("link", { name: `ariaLabel.goToUserProfile` });
        expect(link).toHaveAttribute("href", `/profile/${profileUserMock.ULID}`);
    });

    it("Отображает аватар автора", () => {
        renderWithProviders(<Comment {...defaultProps} authorAvatarUrl="https://example.com/avatar.jpg" />);
        const img = screen.getByRole("img", { name: profileUserMock.name });
        expect(img).toHaveAttribute("src", "https://example.com/avatar.jpg");
    });

    it("Использует дефолтный аватар при пустом avatarUrl", () => {
        renderWithProviders(<Comment {...defaultProps} authorAvatarUrl="" />);
        const img = screen.getByRole("img", { name: profileUserMock.name });
        expect(img).toBeInTheDocument();
    });
});
