import {describe, expect, it, vi} from "vitest";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {BurgerButton} from "./burgerButton";
import {screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

describe("BurgerButton - кнопка бургер меню (мобильная версия)", () => {
    it("Существует на странице", () => {
        const setIsBurgerOpen = vi.fn();

        renderWithProviders(
            <BurgerButton
                imageUrl=""
                isAuthenticated={true}
                name=""
                userULID=""
                isBurgerOpen={false}
                setIsBurgerOpen={setIsBurgerOpen}
            />
        );

        const button = screen.getByRole("button", {name: "ariaLabel.openBurgerMenu"});

        expect(button).toBeInTheDocument();
    });
    it("Открытие бургера", async () => {
        const setIsBurgerOpen = vi.fn();

        renderWithProviders(
            <BurgerButton
                imageUrl=""
                isAuthenticated={true}
                name=""
                userULID=""
                isBurgerOpen={true}
                setIsBurgerOpen={setIsBurgerOpen}
            />
        );

        const button = screen.getByRole("button", {name: "ariaLabel.openBurgerMenu"});

        await userEvent.click(button);

        const calledWith = setIsBurgerOpen.mock.calls[0][0]; // достаём функцию из мока
        expect(calledWith(false)).toBe(true);
        expect(calledWith(true)).toBe(false);
    });
});
