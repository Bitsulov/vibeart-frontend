import {describe, expect, it, vi} from "vitest";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import {AlbumSlide} from "./albumSlide";

describe("albumSlide - кнопка для выбора текущего выбранного альбома", () => {
    it("Существует на странице", () => {
        const setSelectedAlbum = vi.fn();

        renderWithProviders(
            <AlbumSlide
                imageUrl=""
                name=""
                selectedAlbum="1"
                setSelectedAlbum={setSelectedAlbum}
                ariaLabel="button"
                ULID="2"
            />
        )

        const button = screen.getByRole("button", {name: "button"});
        expect(button).toBeInTheDocument();
    });
    it("Выбор альбома", async () => {
        const setSelectedAlbum = vi.fn();

        renderWithProviders(
            <AlbumSlide
                imageUrl=""
                name=""
                selectedAlbum="1"
                setSelectedAlbum={setSelectedAlbum}
                ariaLabel="button"
                ULID="2"
            />
        );

        const button = screen.getByRole("button", {name: "button"});

        await userEvent.click(button);
        expect(setSelectedAlbum).toHaveBeenCalledWith("2");
        expect(setSelectedAlbum).toHaveBeenCalledTimes(1);
    });
});
