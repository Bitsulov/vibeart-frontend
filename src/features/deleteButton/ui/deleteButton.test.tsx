import {describe, it, expect, vi} from "vitest";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {DeleteButton} from "./deleteButton";
import {screen, fireEvent} from "@testing-library/react";

describe("DeleteButton - кнопка удаления", () => {
    it("Рендерится на странице", () => {
        renderWithProviders(<DeleteButton ariaLabel="Удалить пост" />);
        expect(screen.getByRole("button", { name: "Удалить пост" })).toBeInTheDocument();
    });

    it("Вызывает onClick при клике", () => {
        const onClick = vi.fn();
        renderWithProviders(<DeleteButton ariaLabel="Удалить" onClick={onClick} />);
        fireEvent.click(screen.getByRole("button", { name: "Удалить" }));
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("Вызывает onMouseEnter при наведении", () => {
        const onMouseEnter = vi.fn();
        renderWithProviders(<DeleteButton ariaLabel="Удалить" onMouseEnter={onMouseEnter} />);
        fireEvent.mouseEnter(screen.getByRole("button", { name: "Удалить" }));
        expect(onMouseEnter).toHaveBeenCalledTimes(1);
    });

    it("Вызывает onMouseLeave при уходе курсора", () => {
        const onMouseLeave = vi.fn();
        renderWithProviders(<DeleteButton ariaLabel="Удалить" onMouseLeave={onMouseLeave} />);
        fireEvent.mouseLeave(screen.getByRole("button", { name: "Удалить" }));
        expect(onMouseLeave).toHaveBeenCalledTimes(1);
    });

    it("Принимает дополнительный className", () => {
        renderWithProviders(<DeleteButton ariaLabel="Удалить" className="extra" />);
        const button = screen.getByRole("button", { name: "Удалить" });
        expect(button.className).toContain("extra");
    });
});
