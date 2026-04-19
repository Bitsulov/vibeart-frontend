import {describe, it, expect} from "vitest";
import {screen} from "@testing-library/react";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {CommunitiesAddButton} from "./communitiesAddButton";

describe("CommunitiesAddButton - Кнопка создания сообщества", () => {
    it("Отображается как ссылка", () => {
        renderWithProviders(<CommunitiesAddButton />);
        expect(screen.getByRole("link")).toBeInTheDocument();
    });

    it("Ссылка ведёт на /communities/add", () => {
        renderWithProviders(<CommunitiesAddButton />);
        expect(screen.getByRole("link")).toHaveAttribute("href", "/communities/add");
    });

    it("Отображает текст из локали", () => {
        renderWithProviders(<CommunitiesAddButton />);
        expect(screen.getByText("communities.addCommunity")).toBeInTheDocument();
    });
});
