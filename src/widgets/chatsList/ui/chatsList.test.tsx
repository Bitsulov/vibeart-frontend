import {describe, it, expect} from "vitest";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {ChatsList} from "./chatsList";
import {chatsMock} from "entities/chat";
import {screen} from "@testing-library/react";

describe("ChatsList - список чатов", () => {
    it("Отображает заголовок секции", () => {
        renderWithProviders(<ChatsList chatsList={chatsMock} />);

        expect(screen.getByRole("heading", {level: 1})).toBeInTheDocument();
    });

    it("Отображает поле поиска", () => {
        renderWithProviders(<ChatsList chatsList={chatsMock} />);

        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("Отображает все чаты из переданного списка", () => {
        renderWithProviders(<ChatsList chatsList={chatsMock} />);

        expect(screen.getAllByRole("link")).toHaveLength(chatsMock.length);
    });

    it("При пустом списке не отображает ссылки на чаты", () => {
        renderWithProviders(<ChatsList chatsList={[]} />);

        expect(screen.queryAllByRole("link")).toHaveLength(0);
    });
});