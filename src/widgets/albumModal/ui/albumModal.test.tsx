import { describe, it, expect, vi } from "vitest";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { AlbumModal } from "./albumModal";
import { fireEvent, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { server } from "shared/tests/mswServer";
import { postResponseMock, postsPageResponseMock } from "entities/post";

const baseProps = {
    isShowModal: false,
    setIsShowModal: vi.fn(),
    authorUUID: "00000000-0000-4000-8000-00000000000b",
    albumUUID: "00000000-0000-4000-8000-00000000000a"
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

    it("Ищет публикации автора по введённому запросу с задержкой", async () => {
        let receivedQuery: string | null = null;
        let receivedAuthorUuid: string | null = null;
        let receivedAlbumUuid: string | null = null;
        server.use(
            http.get("*/post/search", ({ request }) => {
                const params = new URL(request.url).searchParams;
                receivedQuery = params.get("query");
                receivedAuthorUuid = params.get("authorUuid");
                receivedAlbumUuid = params.get("albumUuid");
                return HttpResponse.json({
                    ...postsPageResponseMock,
                    content: [{ ...postResponseMock, title: "найденный пост" }]
                });
            })
        );

        renderWithProviders(<AlbumModal {...baseProps} isShowModal={true} />);

        fireEvent.change(screen.getByRole("textbox"), {
            target: { value: "портрет" }
        });

        expect(await screen.findByText("найденный пост")).toBeInTheDocument();
        expect(receivedQuery).toBe("портрет");
        expect(receivedAuthorUuid).toBe(baseProps.authorUUID);
        expect(receivedAlbumUuid).toBe(baseProps.albumUUID);
    });

    it("Без поискового запроса отображает все публикации автора", async () => {
        renderWithProviders(<AlbumModal {...baseProps} isShowModal={true} />);
        expect((await screen.findAllByText("post 1 name")).length).toBeGreaterThan(0);
    });
});
