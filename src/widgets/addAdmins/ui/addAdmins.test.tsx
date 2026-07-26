import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { AddAdmins } from "./addAdmins";
import { principalUserMock, communityAdminsMock } from "entities/user";

const defaultProps = {
    author: principalUserMock,
    setSelectedAdmins: vi.fn()
};

describe("AddAdmins - виджет выбора администраторов", () => {
    it("Отображает заголовок секции", () => {
        renderWithProviders(<AddAdmins {...defaultProps} />);

        expect(screen.getByText("createCommunity.adminsTitle")).toBeInTheDocument();
    });

    it("Отображает имя автора с пометкой «Вы»", () => {
        renderWithProviders(<AddAdmins {...defaultProps} />);

        expect(screen.getByText(`${principalUserMock.title} You`)).toBeInTheDocument();
    });

    it("Отображает всех пользователей из мок-данных", () => {
        renderWithProviders(<AddAdmins {...defaultProps} />);

        communityAdminsMock.forEach(user => {
            expect(screen.getByText(user.title)).toBeInTheDocument();
        });
    });

    it("Отображает поле поиска с плейсхолдером", () => {
        renderWithProviders(<AddAdmins {...defaultProps} />);

        expect(screen.getByPlaceholderText("searchPlaceholder")).toBeInTheDocument();
    });

    it("Выбранные администраторы отображаются", () => {
        const [firstAdmin] = communityAdminsMock;
        renderWithProviders(
            <AddAdmins {...defaultProps} selectedAdmins={[firstAdmin]} />
        );

        expect(screen.getByText(firstAdmin.title)).toBeInTheDocument();
    });
});
