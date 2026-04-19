import {describe, it, expect} from "vitest";
import {screen} from "@testing-library/react";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {CommunitiesLists} from "./communitiesLists";
import {communitiesMyMock, communitiesAllMock} from "entities/community";

const defaultProps = {
    communitiesListMy: communitiesMyMock,
    communitiesListAll: communitiesAllMock,
};

describe("CommunitiesLists - Секция страницы сообществ", () => {
    it("Отображается как section", () => {
        const {container} = renderWithProviders(<CommunitiesLists {...defaultProps} />);
        expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("Содержит поле поиска", () => {
        renderWithProviders(<CommunitiesLists {...defaultProps} />);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("Содержит ссылку-кнопку создания сообщества", () => {
        renderWithProviders(<CommunitiesLists {...defaultProps} />);
        expect(screen.getByRole("link", {name: "ariaLabel.goToCreateCommunityPage"})).toBeInTheDocument();
    });

    it("Отображает заголовок 'Мои сообщества'", () => {
        renderWithProviders(<CommunitiesLists {...defaultProps} />);
        expect(screen.getByRole("heading", {name: "communities.myCommunities"})).toBeInTheDocument();
    });

    it("Отображает заголовок 'Все сообщества'", () => {
        renderWithProviders(<CommunitiesLists {...defaultProps} />);
        expect(screen.getByRole("heading", {name: "communities.allCommunities"})).toBeInTheDocument();
    });

    it("Отображает суммарное количество карточек из обоих списков", () => {
        renderWithProviders(<CommunitiesLists {...defaultProps} />);
        expect(screen.getAllByRole("article")).toHaveLength(communitiesMyMock.length + communitiesAllMock.length);
    });
});
