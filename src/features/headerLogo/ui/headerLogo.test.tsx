import {describe, expect, it} from "vitest";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {screen} from "@testing-library/react";
import {HeaderLogo} from "./headerLogo";

describe("headerLogo - Логотип в шапке", () => {
    it("есть aria-current и aria-label", () => {
        renderWithProviders(
            <HeaderLogo />
        );

        const link = screen.getByRole("link", {name: "ariaLabel.goToHome", current: "page"});

        expect(link).toBeInTheDocument();
    })
});
