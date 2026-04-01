import {describe, expect, it} from "vitest";
import {screen, waitFor} from "@testing-library/react";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {AlbumAdd} from "./albumAdd";
import {userEvent} from "@testing-library/user-event";
import {Route, Routes} from "react-router-dom";

const AlbumCreatePage = () => (
    <>
        <title>albumCreate</title>
        <div>Album Create Page</div>
    </>
);

describe("albumAdd - ссылка на страницу добавления альбома", () => {
    it("Существует на странице", () => {
        renderWithProviders(<AlbumAdd />)

        const link = screen.getByRole("link", {name: "ariaLabel.goToCreateAlbumPage"});
        expect(link).toBeInTheDocument();
    });
    it("Переход по ссылке", async () => {
        renderWithProviders(
            <Routes>
                <Route path="/" element={<AlbumAdd />} />
                <Route path="/album/add" element={<AlbumCreatePage />} />
            </Routes>
        );

        const link = screen.getByRole("link", {name: "ariaLabel.goToCreateAlbumPage"});

        await userEvent.click(link);
        await waitFor(() => {
            expect(document.title).toBe("albumCreate");
        });
    });
});
