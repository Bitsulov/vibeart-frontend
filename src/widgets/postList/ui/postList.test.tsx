import {describe, it, expect, vi} from "vitest";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {PostList} from "./postList";
import {screen} from "@testing-library/react";
import {profileAlbum1PostsMock} from "entities/post";

const setCurrentPage = vi.fn();
const setPagesDelta = vi.fn();

const defaultProps = {
    title: "Мои посты",
    postList: profileAlbum1PostsMock,
    pagesCount: 3,
    currentPage: 1,
    setCurrentPage,
    pagesDelta: 2,
    setPagesDelta,
};

describe("PostList - список постов", () => {
    it("Рендерится на странице", () => {
        const {container} = renderWithProviders(<PostList {...defaultProps} />);
        expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("Отображает заголовок при наличии постов", () => {
        renderWithProviders(<PostList {...defaultProps} />);
        expect(screen.getByRole("heading", {level: 1, name: "Мои посты"})).toBeInTheDocument();
    });

    it("Отображает нужное количество постов", () => {
        renderWithProviders(<PostList {...defaultProps} />);
        expect(screen.getAllByRole("article").length).toBe(profileAlbum1PostsMock.length);
    });

    it("Показывает сообщение об отсутствии постов при пустом списке", () => {
        renderWithProviders(<PostList {...defaultProps} postList={[]} />);
        expect(screen.getByRole("heading", {name: "emptyPosts"})).toBeInTheDocument();
    });

    it("Показывает сообщение об отсутствии постов при undefined", () => {
        renderWithProviders(<PostList {...defaultProps} postList={undefined} />);
        expect(screen.getByRole("heading", {name: "emptyPosts"})).toBeInTheDocument();
    });

    it("Кнопка добавления поста отображается на последней странице при isShowAddButton=true", () => {
        renderWithProviders(<PostList {...defaultProps} isShowAddButton={true} currentPage={3} pagesCount={3} />);
        expect(screen.getByRole("button", {name: "ariaLabel.addPostAlbum"})).toBeInTheDocument();
    });

    it("Кнопка добавления поста не отображается при isShowAddButton=false", () => {
        renderWithProviders(<PostList {...defaultProps} isShowAddButton={false} currentPage={3} pagesCount={3} />);
        expect(screen.queryByRole("button", {name: "ariaLabel.addPostAlbum"})).not.toBeInTheDocument();
    });

    it("Кнопка добавления поста не отображается, если текущая страница не последняя", () => {
        renderWithProviders(<PostList {...defaultProps} isShowAddButton={true} currentPage={1} pagesCount={3} />);
        expect(screen.queryByRole("button", {name: "ariaLabel.addPostAlbum"})).not.toBeInTheDocument();
    });
});
