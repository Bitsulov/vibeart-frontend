import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { CommunityAddPostButton } from "./communityAddPostButton";

const communityUUID = "00000000-0000-4000-8000-00000000001d";

describe("CommunityAddPostButton - Кнопка создания поста", () => {
    it("Отображается как ссылка", () => {
        renderWithProviders(<CommunityAddPostButton communityUUID={communityUUID} />);
        expect(screen.getByRole("link")).toBeInTheDocument();
    });

    it("Ссылка ведёт на создание поста от имени сообщества", () => {
        renderWithProviders(<CommunityAddPostButton communityUUID={communityUUID} />);
        expect(screen.getByRole("link")).toHaveAttribute(
            "href",
            `/post/add?community=${communityUUID}`
        );
    });

    it("Отображает текст из локали", () => {
        renderWithProviders(<CommunityAddPostButton communityUUID={communityUUID} />);
        expect(screen.getByText("community.addPost")).toBeInTheDocument();
    });
});
