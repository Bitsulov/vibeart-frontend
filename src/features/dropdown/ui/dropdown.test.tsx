import {describe, it, expect, vi} from "vitest";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {Dropdown} from "./dropdown";
import {screen, fireEvent} from "@testing-library/react";
import {Trash2} from "lucide-react";

const defaultOptions = [
    {
        icon: Trash2,
        text: "Удалить",
        color: "#C40000",
        ariaLabel: "Удалить чат",
        onClick: vi.fn(),
    },
];

describe("Dropdown - выпадающее меню", () => {
    it("Не показывает пункты при isOpen=false", () => {
        renderWithProviders(
            <Dropdown id="test" isOpen={false} setIsOpen={vi.fn()} options={defaultOptions} />
        );
        expect(screen.getByRole("menu")).toBeInTheDocument();
        expect(screen.getByRole("menu")).toHaveAttribute("inert");
    });

    it("Показывает пункты при isOpen=true", () => {
        renderWithProviders(
            <Dropdown id="test" isOpen={true} setIsOpen={vi.fn()} options={defaultOptions} />
        );
        expect(screen.getByRole("menu")).not.toHaveAttribute("inert");
        expect(screen.getByText("Удалить")).toBeInTheDocument();
    });

    it("Вызывает onClick и закрывает меню при клике на пункт", () => {
        const onClick = vi.fn();
        const setIsOpen = vi.fn();
        const options = [{ ...defaultOptions[0], onClick }];

        renderWithProviders(
            <Dropdown id="test" isOpen={true} setIsOpen={setIsOpen} options={options} />
        );
        fireEvent.click(screen.getByRole("button", { name: "Удалить чат" }));
        expect(onClick).toHaveBeenCalledOnce();
        expect(setIsOpen).toHaveBeenCalledWith(false);
    });
});
