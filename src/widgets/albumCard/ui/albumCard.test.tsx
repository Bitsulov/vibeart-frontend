import {describe, it, expect} from "vitest";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {AlbumCard} from "./albumCard";
import {screen} from "@testing-library/react";
import {profileAlbum1PostsMock} from "entities/post";

const baseProps = {
    ULID: "01ARZ3NDEKTSV4RRFFQ69G5FAV",
    authorULID: "01ARZ3NDEKTSV4RRFFQ69G5FAV",
    title: "Test Album",
    description: "Album description",
    imageUrl: "/test-image.jpg",
    worksCount: 5,
    date: "2026-03-24T18:48:16.175Z",
    postList: profileAlbum1PostsMock,
    isOwner: false,
};

describe("AlbumCard - карточка страницы альбома", () => {
    it("Отображает заголовок альбома", () => {
        renderWithProviders(<AlbumCard {...baseProps} />);
        expect(screen.getByRole("heading", { level: 1, name: "Test Album" })).toBeInTheDocument();
    });

    it("Отображает изображение альбома с корректным alt", () => {
        renderWithProviders(<AlbumCard {...baseProps} />);
        expect(screen.getByRole("img", { name: "Test Album" })).toBeInTheDocument();
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
});