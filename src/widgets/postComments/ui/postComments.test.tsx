import { describe, it, expect } from "vitest";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { PostComments } from "./postComments";
import { screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { server } from "shared/tests/mswServer";
import { commentsMock } from "entities/comment";
import { userResponseMock } from "entities/user";

const defaultProps = {
    postUUID: "post-uuid"
};

describe("PostComments - секция комментариев поста", () => {
    it("Рендерится на странице", () => {
        renderWithProviders(<PostComments {...defaultProps} />);
        expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    });

    it("Отображает форму добавления комментария", () => {
        renderWithProviders(<PostComments {...defaultProps} />);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("Отображает список комментариев, загруженных с сервера", async () => {
        renderWithProviders(<PostComments {...defaultProps} />);
        const links = await screen.findAllByRole("link", {
            name: /ariaLabel.goToUserProfile/
        });
        expect(links).toHaveLength(commentsMock.length);
    });

    it("Отображает счётчик комментариев из ответа сервера", async () => {
        renderWithProviders(<PostComments {...defaultProps} />);
        const heading = screen.getByRole("heading", { level: 2 });
        await waitFor(() =>
            expect(heading).toHaveTextContent(`(${commentsMock.length})`)
        );
    });

    it("Отображает имя автора комментария", async () => {
        renderWithProviders(<PostComments {...defaultProps} />);
        const names = await screen.findAllByText(userResponseMock.name);
        expect(names).toHaveLength(commentsMock.length);
    });

    it("Отображает заглушку при отсутствии комментариев", async () => {
        server.use(
            http.get("*/comment", () =>
                HttpResponse.json({
                    content: [],
                    number: 0,
                    size: 20,
                    totalElements: 0,
                    totalPages: 0,
                    first: true,
                    last: true,
                    empty: true
                })
            )
        );

        renderWithProviders(<PostComments {...defaultProps} />);

        expect(await screen.findByText("post.emptyComments")).toBeInTheDocument();
    });
});
