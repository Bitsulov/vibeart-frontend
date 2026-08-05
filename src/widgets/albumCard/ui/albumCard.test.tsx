import { describe, it, expect, afterEach } from "vitest";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { AlbumCard } from "./albumCard";
import { screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { galleryPostsMock } from "entities/post";

const baseProps = {
    UUID: "00000000-0000-4000-8000-00000000000b",
    authorUUID: "00000000-0000-4000-8000-00000000000b",
    title: "Test Album",
    description: "Album description",
    imageUrl: "/test-image.jpg",
    worksCount: 5,
    date: "2026-03-24T18:48:16.175Z",
    isOwner: false
};

describe("AlbumCard - карточка страницы альбома", () => {
    it("Отображает заголовок альбома", () => {
        renderWithProviders(<AlbumCard {...baseProps} />);
        expect(
            screen.getByRole("heading", { level: 1, name: "Test Album" })
        ).toBeInTheDocument();
    });

    it("Отображает изображение альбома с корректным alt", () => {
        renderWithProviders(<AlbumCard {...baseProps} />);
        expect(screen.getByRole("img", { name: "Test Album" })).toBeInTheDocument();
    });

    it("Не рендерит изображение при пустом imageUrl", () => {
        renderWithProviders(<AlbumCard {...baseProps} imageUrl="" />);
        expect(screen.queryByRole("img", { name: "Test Album" })).not.toBeInTheDocument();
    });

    it("Отображает описание альбома", () => {
        renderWithProviders(<AlbumCard {...baseProps} />);
        expect(screen.getByText("Album description")).toBeInTheDocument();
    });

    it("Скрывает кнопки владельца, если isOwner=false", () => {
        renderWithProviders(<AlbumCard {...baseProps} />);
        expect(screen.queryByLabelText("ariaLabel.deleteAlbum")).not.toBeInTheDocument();
        expect(screen.queryByLabelText("ariaLabel.editAlbum")).not.toBeInTheDocument();
    });

    it("Показывает кнопки удаления и редактирования, если isOwner=true", () => {
        renderWithProviders(<AlbumCard {...baseProps} isOwner={true} />);
        expect(screen.getByLabelText("ariaLabel.deleteAlbum")).toBeInTheDocument();
        expect(screen.getByLabelText("ariaLabel.editAlbum")).toBeInTheDocument();
    });

    it("Отображает публикации, полученные от API", async () => {
        renderWithProviders(<AlbumCard {...baseProps} />);

        await waitFor(() => {
            expect(screen.getAllByRole("article")).toHaveLength(
                galleryPostsMock.length + 1
            );
        });
    });

    it("Не форматирует и не отображает дату при пустом date", () => {
        const { container } = renderWithProviders(<AlbumCard {...baseProps} date="" />);
        expect(container.querySelector(".date")).toHaveTextContent("");
    });

    describe("Переполнение описания", () => {
        afterEach(() => {
            Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
                configurable: true,
                get: () => 0
            });
        });

        it("Не показывает кнопку раскрытия, если описание не переполнено", () => {
            renderWithProviders(<AlbumCard {...baseProps} />);
            expect(
                screen.queryByRole("button", { name: "ariaLabel.openDescription" })
            ).not.toBeInTheDocument();
        });

        it("Показывает кнопку раскрытия, если описание переполнено", () => {
            Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
                configurable: true,
                get: () => 300
            });

            renderWithProviders(<AlbumCard {...baseProps} />);

            expect(
                screen.getByRole("button", { name: "ariaLabel.openDescription" })
            ).toBeInTheDocument();
        });

        it("Клик по кнопке раскрывает описание, и кнопка скрывается", async () => {
            Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
                configurable: true,
                get: () => 300
            });

            renderWithProviders(<AlbumCard {...baseProps} />);

            await userEvent.click(
                screen.getByRole("button", { name: "ariaLabel.openDescription" })
            );

            expect(
                screen.queryByRole("button", { name: "ariaLabel.openDescription" })
            ).not.toBeInTheDocument();
        });
    });
});
