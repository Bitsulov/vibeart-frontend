import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { CreateCommunityWidget } from "./createCommunityWidget";
import { communityAdminsMock, principalUserMock } from "entities/user";

const defaultProps = {
    userInfo: principalUserMock,
    communityInfo: {},
    setCommunityInfo: vi.fn(),
    isCreateNewCommunity: true,
    communityUUID: "",
    originalTitle: "",
    originalDescription: "",
    originalUsername: "",
    originalTags: [],
    originalAdmins: []
};

describe("CreateCommunityWidget - форма создания сообщества", () => {
    it("Отображает настройку аватара", () => {
        renderWithProviders(<CreateCommunityWidget {...defaultProps} />);

        expect(screen.getByText("createCommunity.avatarTitle")).toBeInTheDocument();
    });

    it("Отображает настройку названия", () => {
        renderWithProviders(<CreateCommunityWidget {...defaultProps} />);

        expect(screen.getByText("createCommunity.nameTitle")).toBeInTheDocument();
    });

    it("Отображает настройку описания", () => {
        renderWithProviders(<CreateCommunityWidget {...defaultProps} />);

        expect(screen.getByText("createCommunity.textTitle")).toBeInTheDocument();
    });

    it("Отображает настройку уникального id", () => {
        renderWithProviders(<CreateCommunityWidget {...defaultProps} />);

        expect(screen.getByText("createCommunity.idTitle")).toBeInTheDocument();
    });

    it("Отображает настройку добавления администраторов", () => {
        renderWithProviders(<CreateCommunityWidget {...defaultProps} />);

        expect(screen.getByText("createCommunity.adminsTitle")).toBeInTheDocument();
    });

    it("Отображает кнопку отправки формы", () => {
        renderWithProviders(<CreateCommunityWidget {...defaultProps} />);

        expect(
            screen.getByRole("button", { name: "ariaLabel.saveCommunity" })
        ).toBeInTheDocument();
    });

    it("Поле id содержит префикс @", () => {
        renderWithProviders(<CreateCommunityWidget {...defaultProps} />);

        expect(screen.getByText("@")).toBeInTheDocument();
    });

    it("Кнопка отправки показывает текст создания в режиме создания", () => {
        renderWithProviders(<CreateCommunityWidget {...defaultProps} />);

        expect(screen.getByText("createCommunity.editMobile")).toBeInTheDocument();
    });

    it("Кнопка отправки показывает текст сохранения в режиме редактирования", () => {
        renderWithProviders(
            <CreateCommunityWidget {...defaultProps} isCreateNewCommunity={false} />
        );

        expect(screen.getByText("createCommunity.saveMobile")).toBeInTheDocument();
    });

    it("Предзаполняет название, описание и id данными редактируемого сообщества", () => {
        renderWithProviders(
            <CreateCommunityWidget
                {...defaultProps}
                isCreateNewCommunity={false}
                communityInfo={{
                    title: "Клуб художников",
                    description: "Описание клуба",
                    username: "art-club"
                }}
            />
        );

        expect(
            screen.getByRole("textbox", { name: "createCommunity.namePlaceholder" })
        ).toHaveValue("Клуб художников");
        expect(
            screen.getByRole("textbox", { name: "createCommunity.textPlaceholder" })
        ).toHaveValue("Описание клуба");
        expect(
            screen.getByRole("textbox", { name: "createCommunity.idPlaceholder" })
        ).toHaveValue("art-club");
    });

    it("Передаёт исходных администраторов в виджет выбора администраторов", async () => {
        const [firstAdmin] = communityAdminsMock;

        renderWithProviders(
            <CreateCommunityWidget
                {...defaultProps}
                isCreateNewCommunity={false}
                originalAdmins={[firstAdmin]}
            />
        );

        expect(
            await screen.findByRole("link", { name: "ariaLabel.deleteAdmin" })
        ).toBeInTheDocument();
    });
});
