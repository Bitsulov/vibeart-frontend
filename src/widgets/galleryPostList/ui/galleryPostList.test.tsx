import {describe, it, expect} from "vitest";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {GalleryPostList} from "./galleryPostList";
import {screen} from "@testing-library/react";
import {galleryPostsMock} from "entities/post";

describe("GalleryPostList - список постов галереи (masonic)", () => {
    it("Отображает заголовок секции", () => {
        renderWithProviders(<GalleryPostList postList={galleryPostsMock} />);

        expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });

    it("Отображает поле поиска", () => {
        renderWithProviders(<GalleryPostList postList={galleryPostsMock} />);

        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("Отображает ссылку на создание поста", () => {
        renderWithProviders(<GalleryPostList postList={galleryPostsMock} />);

        expect(screen.getByRole("link", { name: "ariaLabel.goToCreatePostPage" })).toBeInTheDocument();
    });

    it("Отображает посты из переданного списка", () => {
        renderWithProviders(<GalleryPostList postList={galleryPostsMock} />);

        const postArticles = screen.getAllByRole("article", { name: /ariaLabel.goToPost/ });
        expect(postArticles.length).toBe(galleryPostsMock.length);
    });

    it("При пустом списке постов не отображает карточки", () => {
        renderWithProviders(<GalleryPostList postList={[]} />);

        expect(screen.queryAllByRole("article", { name: /ariaLabel.goToPost/ })).toHaveLength(0);
    });
});