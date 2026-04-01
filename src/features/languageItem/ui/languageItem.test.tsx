import {describe, expect, it, vi} from "vitest";
import {screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {LanguageItem} from "./languageItem";
import * as handler from "../model/changeLanguageClickHandler";

const defaultProps = {
    imageUrl: "/flags/en.svg",
    title: "English",
    ariaLabel: "ariaLabel.english",
    alt: "alt.englishFlag",
    value: "en",
};

describe("LanguageItem - элемент списка выбора языка", () => {
    it("Существует на странице", () => {
        renderWithProviders(<LanguageItem {...defaultProps} />);

        const button = screen.getByRole("button", {name: "ariaLabel.english"});

        expect(button).toBeInTheDocument();
    });

    it("Отображает заголовок языка", () => {
        renderWithProviders(<LanguageItem {...defaultProps} />);

        expect(screen.getByText("English")).toBeInTheDocument();
    });

    it("Отображает флаг с alt-текстом", () => {
        renderWithProviders(<LanguageItem {...defaultProps} />);

        const img = screen.getByRole("img", {name: "alt.englishFlag"});

        expect(img).toBeInTheDocument();
    });

    it("Вызывает changeLanguageClickHandler с нужным значением при клике", async () => {
        const spy = vi.spyOn(handler, "changeLanguageClickHandler");

        renderWithProviders(<LanguageItem {...defaultProps} />);

        await userEvent.click(screen.getByRole("button", {name: "ariaLabel.english"}));

        expect(spy).toHaveBeenCalledWith(
            "en",
            expect.any(Object),
            expect.any(Function),
            expect.any(Function),
            expect.any(Object),
        );
    });
});
