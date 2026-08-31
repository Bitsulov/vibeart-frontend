import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { server } from "shared/tests/mswServer";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { AddTags } from "./addTags";

const defaultProps = {
    pagesDelta: 2,
    setPagesDelta: vi.fn(),
    chosenTags: [],
    setChosenTags: vi.fn()
};

describe("AddTags - виджет выбора тегов", () => {
    it("Отображает теги, загруженные с сервера", async () => {
        renderWithProviders(<AddTags {...defaultProps} />);

        const buttons = await screen.findAllByRole("button", { name: "chooseTag" });

        expect(buttons).toHaveLength(5);
    });

    it("Выбранный тег подсвечивается классом select", async () => {
        renderWithProviders(<AddTags {...defaultProps} chosenTags={["nature"]} />);

        expect(await screen.findByText("#nature")).toHaveClass("select");
        const unselectedTags = await screen.findAllByText("#aaa");
        unselectedTags.forEach(tag => expect(tag).not.toHaveClass("select"));
    });

    it("Клик по тегу добавляет его в выбранные", async () => {
        const setChosenTags = vi.fn();
        renderWithProviders(<AddTags {...defaultProps} setChosenTags={setChosenTags} />);

        fireEvent.click(await screen.findByText("#nature"));

        const updater = setChosenTags.mock.calls[0][0];
        expect(updater([])).toEqual(["nature"]);
    });

    it("Ввод в поле поиска загружает результаты поиска тегов", async () => {
        server.use(
            http.get("*/tag/search", () =>
                HttpResponse.json({
                    content: [{ title: "sunset", createdAt: "" }],
                    number: 0,
                    size: 10,
                    totalElements: 1,
                    totalPages: 1,
                    first: true,
                    last: true,
                    empty: false
                })
            )
        );

        renderWithProviders(<AddTags {...defaultProps} />);
        await screen.findByText("#nature");

        fireEvent.change(screen.getByRole("textbox"), { target: { value: "sun" } });

        expect(await screen.findByText("#sunset")).toBeInTheDocument();
    });
});
