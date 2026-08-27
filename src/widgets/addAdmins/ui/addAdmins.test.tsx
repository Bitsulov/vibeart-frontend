import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { AddAdmins } from "./addAdmins";
import {
    principalUserMock,
    communityAdminsMock,
    friendsResponseMock
} from "entities/user";

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

    it("Отображает друзей, полученных с сервера", async () => {
        renderWithProviders(<AddAdmins {...defaultProps} />);

        for (const friend of friendsResponseMock) {
            expect(await screen.findByText(friend.name)).toBeInTheDocument();
        }
    });

    it("Отображает поле поиска с плейсхолдером", () => {
        renderWithProviders(<AddAdmins {...defaultProps} />);

        expect(screen.getByPlaceholderText("searchPlaceholder")).toBeInTheDocument();
    });

    it("Выбранный администратор подсвечен и помечен на снятие", async () => {
        const [firstAdmin] = communityAdminsMock;
        renderWithProviders(
            <AddAdmins {...defaultProps} selectedAdmins={[firstAdmin]} />
        );

        const link = await screen.findByRole("link", { name: "ariaLabel.deleteAdmin" });

        expect(link).toHaveClass("select");
    });

    it("Невыбранные друзья помечены на добавление и не подсвечены", async () => {
        renderWithProviders(<AddAdmins {...defaultProps} selectedAdmins={[]} />);

        const links = await screen.findAllByRole("link", { name: "ariaLabel.addAdmin" });

        links.forEach(link => expect(link).not.toHaveClass("select"));
        expect(
            screen.queryByRole("link", { name: "ariaLabel.deleteAdmin" })
        ).not.toBeInTheDocument();
    });
});
