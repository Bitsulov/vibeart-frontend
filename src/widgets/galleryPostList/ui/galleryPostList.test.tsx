import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { GalleryPostList } from "./galleryPostList";
import { screen, fireEvent, act } from "@testing-library/react";
import { galleryPostsMock } from "entities/post";

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

        expect(
            screen.getByRole("link", { name: "ariaLabel.goToCreatePostPage" })
        ).toBeInTheDocument();
    });

    it("Отображает посты из переданного списка", () => {
        renderWithProviders(<GalleryPostList postList={galleryPostsMock} />);

        const postArticles = screen.getAllByRole("article", {
            name: /ariaLabel.goToPost/
        });
        expect(postArticles.length).toBe(galleryPostsMock.length);
    });

    it("При пустом списке постов не отображает карточки", () => {
        renderWithProviders(<GalleryPostList postList={[]} />);

        expect(
            screen.queryAllByRole("article", { name: /ariaLabel.goToPost/ })
        ).toHaveLength(0);
    });

    it("Не отображает карточки при isLoading, даже если список не пуст", () => {
        renderWithProviders(
            <GalleryPostList postList={galleryPostsMock} isLoading={true} />
        );

        expect(
            screen.queryAllByRole("article", { name: /ariaLabel.goToPost/ })
        ).toHaveLength(0);
    });

    it("Корректно обрабатывает значение postList, равное undefined", () => {
        renderWithProviders(<GalleryPostList postList={undefined} />);

        expect(
            screen.queryAllByRole("article", { name: /ariaLabel.goToPost/ })
        ).toHaveLength(0);
    });

    it("Обновляет список постов при изменении свойства postList", () => {
        const { rerender } = renderWithProviders(<GalleryPostList postList={[]} />);
        expect(
            screen.queryAllByRole("article", { name: /ariaLabel.goToPost/ })
        ).toHaveLength(0);

        rerender(<GalleryPostList postList={galleryPostsMock} />);

        expect(
            screen.getAllByRole("article", { name: /ariaLabel.goToPost/ })
        ).toHaveLength(galleryPostsMock.length);
    });

    it("Передаёт признак isLiked поста в карточку", () => {
        const likedPost = { ...galleryPostsMock[0], isLiked: true };

        renderWithProviders(<GalleryPostList postList={[likedPost]} />);

        expect(
            screen.getByRole("button", { name: "ariaLabel.unlike" })
        ).toBeInTheDocument();
    });

    it("Устанавливает loadMoreRef на элемент-триггер в конце списка", () => {
        let refNode: HTMLDivElement | null = null;
        const loadMoreRef = (node: HTMLDivElement | null) => {
            refNode = node;
        };

        renderWithProviders(
            <GalleryPostList postList={galleryPostsMock} loadMoreRef={loadMoreRef} />
        );

        expect(refNode).not.toBeNull();
    });

    it("Отображает initialSearchValue в поле поиска", () => {
        renderWithProviders(
            <GalleryPostList postList={galleryPostsMock} initialSearchValue="кот" />
        );

        expect(screen.getByRole("textbox")).toHaveValue("кот");
    });

    describe("onSearchChange", () => {
        beforeEach(() => {
            vi.useFakeTimers({ shouldAdvanceTime: true });
        });

        afterEach(() => {
            vi.useRealTimers();
        });

        it("Вызывает onSearchChange с обрезанным значением после задержки ввода", async () => {
            const onSearchChange = vi.fn();

            renderWithProviders(
                <GalleryPostList
                    postList={galleryPostsMock}
                    onSearchChange={onSearchChange}
                />
            );

            fireEvent.change(screen.getByRole("textbox"), {
                target: { value: "  кот  " }
            });
            await act(() => vi.advanceTimersByTimeAsync(400));

            expect(onSearchChange).toHaveBeenCalledWith("кот");
        });

        it("Не вызывает onSearchChange раньше, чем истечёт задержка", async () => {
            const onSearchChange = vi.fn();

            renderWithProviders(
                <GalleryPostList
                    postList={galleryPostsMock}
                    onSearchChange={onSearchChange}
                />
            );

            fireEvent.change(screen.getByRole("textbox"), { target: { value: "кот" } });
            await act(() => vi.advanceTimersByTimeAsync(300));

            expect(onSearchChange).not.toHaveBeenCalledWith("кот");
        });
    });
});
