import {describe, it, expect, vi} from "vitest";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {SearchInput} from "./searchInput";
import {screen, fireEvent} from "@testing-library/react";

describe("SearchInput - поле поиска с иконкой", () => {
    it("Рендерится input", () => {
        renderWithProviders(<SearchInput value="" onChange={vi.fn()} />);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("Отображает переданный placeholder", () => {
        renderWithProviders(<SearchInput value="" onChange={vi.fn()} placeholder="Найти..." />);
        expect(screen.getByPlaceholderText("Найти...")).toBeInTheDocument();
    });

    it("Отображает переданное значение", () => {
        renderWithProviders(<SearchInput value="пейзаж" onChange={vi.fn()} />);
        expect(screen.getByDisplayValue("пейзаж")).toBeInTheDocument();
    });

    it("Вызывает onChange при вводе текста", () => {
        const onChange = vi.fn();
        renderWithProviders(<SearchInput value="" onChange={onChange} />);
        fireEvent.change(screen.getByRole("textbox"), { target: { value: "test" } });
        expect(onChange).toHaveBeenCalledTimes(1);
    });
});
