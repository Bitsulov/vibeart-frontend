import {describe, expect, it} from "vitest";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {FooterLogo} from "./footerLogo";
import {screen} from "@testing-library/react";

describe("footerLogo - Логотип в подвале", () => {
    it("есть aria-current и aria-label", () => {
        renderWithProviders(
            <FooterLogo />
        );

        const link = screen.getByRole("link", {name: "ariaLabel.goToHome", current: "page"});

        expect(link).toBeInTheDocument();
    })
});
