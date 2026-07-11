import { describe, it, expect, vi } from "vitest";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { CommentsForm } from "./commentsForm";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { principalUserSessionMock } from "entities/user/const/mockConst";

const defaultProps = {
    user: principalUserSessionMock,
    setComments: vi.fn()
};

describe("CommentsForm - форма добавления комментария", () => {
    it("Рендерит поле ввода", () => {
        renderWithProviders(<CommentsForm {...defaultProps} />);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("Рендерит кнопку отправки", () => {
        renderWithProviders(<CommentsForm {...defaultProps} />);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("Отправка пустой формы не вызывает setComments", async () => {
        const setComments = vi.fn();
        renderWithProviders(
            <CommentsForm user={principalUserSessionMock} setComments={setComments} />
        );
        fireEvent.submit(screen.getByRole("button").closest("form")!);
        expect(setComments).not.toHaveBeenCalled();
    });

    it("Отправка заполненной формы вызывает setComments и очищает поле", async () => {
        const setComments = vi.fn();
        renderWithProviders(
            <CommentsForm user={principalUserSessionMock} setComments={setComments} />
        );
        await userEvent.type(screen.getByRole("textbox"), "Новый комментарий");
        fireEvent.submit(screen.getByRole("button").closest("form")!);
        await waitFor(() => expect(setComments).toHaveBeenCalled());
    });
});
