import {describe, expect, it, vi} from "vitest";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {screen} from "@testing-library/react";
import {HeaderProfileButton} from "./headerProfileButton";
import default_avatar from "shared/icons/icon-user.svg";

describe("headerProfileButton - ссылка на профиль на десктопе", () => {
    const setIsBurgerOpen = vi.fn();

    it("верный ariaLabel и alt, не авторизован", () => {
        renderWithProviders(
            <HeaderProfileButton
                imageUrl=""
                isAuthenticated={false}
                userULID=""
                name=""
                isBurgerOpen={false}
                setIsBurgerOpen={setIsBurgerOpen}
            />
        );

        const link = screen.getByRole("link", {name: "ariaLabel.goToAuth"});
        const img = screen.getByAltText("user");

        expect(link).toHaveAttribute("href", "/auth");
        expect(img).toHaveAttribute("src", default_avatar);
    });
    it("верный ariaLabel и alt, img пустой, авторизован", () => {
        renderWithProviders(
            <HeaderProfileButton
                imageUrl=""
                isAuthenticated={true}
                userULID="123"
                name="n"
                isBurgerOpen={false}
                setIsBurgerOpen={setIsBurgerOpen}
            />
        );

        const link = screen.getByRole("link", {name: "ariaLabel.goToProfile"});
        const img = screen.getByAltText("n");

        expect(link).toHaveAttribute("href", "/profile/123");
        expect(img).toHaveAttribute("src", default_avatar);
    });
    it("верный ariaLabel и alt, img не пустой, авторизован", () => {
        renderWithProviders(
            <HeaderProfileButton
                imageUrl="a"
                isAuthenticated={true}
                userULID="123"
                name="n"
                isBurgerOpen={false}
                setIsBurgerOpen={setIsBurgerOpen}
            />
        );

        const img = screen.getByAltText("n");

        expect(img).toHaveAttribute("src", "a");
    });
});
