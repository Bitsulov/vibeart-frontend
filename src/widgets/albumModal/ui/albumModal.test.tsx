import {describe, it, expect, vi} from "vitest";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {AlbumModal} from "./albumModal";
import {screen} from "@testing-library/react";
import {profileAlbum1PostsMock} from "entities/post";

const baseProps = {
    isShowModal: false,
    setIsShowModal: vi.fn(),
    postList: profileAlbum1PostsMock,
};

describe("AlbumModal - модальное окно добавления постов в альбом", () => {
    it("Не рендерится при isShowModal=false", () => {
        renderWithProviders(<AlbumModal {...baseProps} />);
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("Рендерится при isShowModal=true", () => {
        renderWithProviders(<AlbumModal {...baseProps} isShowModal={true} />);
        expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("Отображает заголовок и кнопки управления", () => {
        renderWithProviders(<AlbumModal {...baseProps} isShowModal={true} />);
        expect(screen.getByText("album.addPost")).toBeInTheDocument();
        expect(screen.getByText("Close")).toBeInTheDocument();
        expect(screen.getByText("Add")).toBeInTheDocument();
    });

    it("Отображает поле поиска", () => {
        renderWithProviders(<AlbumModal {...baseProps} isShowModal={true} />);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });
});
