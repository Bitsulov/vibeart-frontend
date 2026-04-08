import {describe, it, expect, vi} from "vitest";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {PostListModal} from "./postListModal";
import {screen} from "@testing-library/react";
import {profileAlbum1PostsMock} from "entities/post";

const defaultProps = {
    postList: [],
    pagesCount: 10,
    currentPage: 1,
    setCurrentPage: vi.fn(),
    pagesDelta: 2,
    setPagesDelta: vi.fn(),
    selectedPosts: [],
    setSelectedPosts: vi.fn(),
};

describe("PostListModal - список постов для добавления в альбом", () => {
    it("Показывает сообщение при пустом списке постов", () => {
        renderWithProviders(<PostListModal {...defaultProps} />);
        expect(screen.getByText("emptyPosts")).toBeInTheDocument();
    });

    it("Рендерит посты, если список не пуст", () => {
        renderWithProviders(
            <PostListModal {...defaultProps} postList={profileAlbum1PostsMock} />
        );
        expect(screen.queryByText("emptyPosts")).not.toBeInTheDocument();
    });

    it("Отображает пагинацию при наличии постов", () => {
        renderWithProviders(
            <PostListModal {...defaultProps} postList={profileAlbum1PostsMock} />
        );
        expect(screen.getAllByRole("button", { name: /ariaLabel\.changePage/ }).length).toBeGreaterThan(0);
    });
});
