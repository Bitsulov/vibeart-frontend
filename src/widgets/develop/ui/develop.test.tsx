import {vi, describe, it, expect} from "vitest";
import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {Develop} from "./develop";
import {returnBackHandler} from "../model/returnBackHandler";

vi.mock("../model/returnBackHandler", () => ({
    returnBackHandler: vi.fn(),
}));

describe("Develop - страница в разработке", () => {
    it("Кнопка «назад» вызывает обработчик навигации при клике", async () => {
        renderWithProviders(<Develop />);

        await userEvent.click(screen.getByRole("button", {name: "ariaLabel.goBack"}));

        expect(returnBackHandler).toHaveBeenCalledTimes(1);
    });
});
