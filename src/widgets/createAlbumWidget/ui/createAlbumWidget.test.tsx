import { describe, it, expect } from "vitest";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { CreateAlbumWidget } from "./createAlbumWidget";
import { screen } from "@testing-library/react";
import { albumMock } from "entities/album";

const defaultProps = {
    albumInfo: {},
    setAlbumInfo: () => {},
    loadedFile: undefined,
    setLoadedFile: () => {},
    isCreateNewAlbum: true,
    albumName: "",
    albumDescription: "",
    UUID: "00000000-0000-4000-8000-00000000000b"
};

describe("CreateAlbumWidget - форма создания и редактирования альбома", () => {
    it("Отображает заголовок создания альбома в режиме создания", () => {
        renderWithProviders(
            <CreateAlbumWidget {...defaultProps} isCreateNewAlbum={true} />
        );

        expect(
            screen.getByRole("heading", { level: 1, name: "createAlbum.titleCreate" })
        ).toBeInTheDocument();
    });

    it("Отображает заголовок редактирования альбома в режиме редактирования", () => {
        renderWithProviders(
            <CreateAlbumWidget {...defaultProps} isCreateNewAlbum={false} />
        );

        expect(
            screen.getByRole("heading", { level: 1, name: "createAlbum.titleEdit" })
        ).toBeInTheDocument();
    });

    it("Предзаполняет название и описание данными редактируемого альбома", () => {
        const albumInfo = { ...albumMock };

        renderWithProviders(
            <CreateAlbumWidget
                {...defaultProps}
                isCreateNewAlbum={false}
                albumInfo={albumInfo}
            />
        );

        expect(
            screen.getByRole("textbox", { name: "createAlbum.namePlaceholder" })
        ).toHaveValue(albumInfo.name);
        expect(
            screen.getByRole("textbox", { name: "createAlbum.textPlaceholder" })
        ).toHaveValue(albumInfo.description);
    });

    it("Отображает пустые поля названия и описания при создании нового альбома", () => {
        renderWithProviders(<CreateAlbumWidget {...defaultProps} />);

        expect(
            screen.getByRole("textbox", { name: "createAlbum.namePlaceholder" })
        ).toHaveValue("");
        expect(
            screen.getByRole("textbox", { name: "createAlbum.textPlaceholder" })
        ).toHaveValue("");
    });

    it("Отображает кнопку отправки формы", () => {
        renderWithProviders(<CreateAlbumWidget {...defaultProps} />);

        expect(
            screen.getByRole("button", { name: "ariaLabel.createAlbum" })
        ).toBeInTheDocument();
    });
});
