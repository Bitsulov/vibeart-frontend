import {describe, expect, it, vi} from "vitest";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import {HeaderLanguageButton} from "./headerLanguageButton";

describe("headerLanguageButton - Кнопка переключения модального окна со сменой языков", () => {
    it("Нажатие, aria-label, aria-expanded", async () => {
        const setIsShowChangeLanguage = vi.fn();

        renderWithProviders(
            <HeaderLanguageButton
                setIsShowChangeLanguage={setIsShowChangeLanguage}
                isShowChangeLanguage={false}
                isBurgerOpen={false}
                languagesConfig={{"en": [""]}}
            />
        );

        const button = screen.getByRole("button", {name: "ariaLabel.showLanguageToggler", expanded: false});
        await userEvent.click(button);

        expect(setIsShowChangeLanguage).toHaveBeenCalledWith(true);
    })
});
