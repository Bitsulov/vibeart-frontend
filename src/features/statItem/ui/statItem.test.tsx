import {describe, expect, it, vi} from "vitest";
import {screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {StatItem} from "./statItem";
import {Heart} from "lucide-react";

const initialProps = {
    Icon: Heart,
    number: 42,
    ariaLabel: "ariaLabel.like",
};

describe("StatItem - Числовой показатель", () => {
    describe("Тип default", () => {
        it("Отображается как div (без роли link или button)", () => {
            renderWithProviders(<StatItem {...initialProps} type="default" />);

            expect(screen.queryByRole("link")).not.toBeInTheDocument();
            expect(screen.queryByRole("button")).not.toBeInTheDocument();
        });

        it("Отображает число", () => {
            renderWithProviders(<StatItem {...initialProps} type="default" />);

            expect(screen.getByText("42")).toBeInTheDocument();
        });
    });

    describe("Тип link", () => {
        it("Отображается как ссылка", () => {
            renderWithProviders(<StatItem {...initialProps} type="link" href="/post/1#comments" />);

            expect(screen.getByRole("link", {name: initialProps.ariaLabel})).toBeInTheDocument();
        });

        it("Ссылка имеет атрибут href", () => {
            renderWithProviders(<StatItem {...initialProps} type="link" href="/post/1#comments" />);

            expect(screen.getByRole("link", {name: initialProps.ariaLabel})).toHaveAttribute("href", "/post/1#comments");
        });

        it("Отображает число", () => {
            renderWithProviders(<StatItem {...initialProps} type="link" href="/post/1#comments" />);

            expect(screen.getByText("42")).toBeInTheDocument();
        });

        it("Не отображается как кнопка", () => {
            renderWithProviders(<StatItem {...initialProps} type="link" href="/post/1#comments" />);

            expect(screen.queryByRole("button")).not.toBeInTheDocument();
        });
    });

    describe("Тип button", () => {
        it("Отображается как кнопка", () => {
            renderWithProviders(<StatItem {...initialProps} type="button" />);

            expect(screen.getByRole("button", {name: initialProps.ariaLabel})).toBeInTheDocument();
        });

        it("Вызывает onClick при клике", async () => {
            const onClick = vi.fn();

            renderWithProviders(<StatItem {...initialProps} type="button" onClick={onClick} />);

            await userEvent.click(screen.getByRole("button", {name: initialProps.ariaLabel}));

            expect(onClick).toHaveBeenCalledTimes(1);
        });

        it("Отображает число", () => {
            renderWithProviders(<StatItem {...initialProps} type="button" />);

            expect(screen.getByText("42")).toBeInTheDocument();
        });

        it("Не отображается как ссылка", () => {
            renderWithProviders(<StatItem {...initialProps} type="button" />);

            expect(screen.queryByRole("link")).not.toBeInTheDocument();
        });
    });
});