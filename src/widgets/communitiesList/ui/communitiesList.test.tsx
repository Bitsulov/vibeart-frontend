import {describe, it, expect} from "vitest";
import {screen} from "@testing-library/react";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {CommunitiesList} from "./communitiesList";
import {communitiesMyMock} from "entities/community";

describe("CommunitiesList - Список сообществ", () => {
    it("Отображает заголовок секции", () => {
        renderWithProviders(<CommunitiesList communitiesList={communitiesMyMock} title="Мои сообщества" emptyTitle="Нет сообществ" />);
        expect(screen.getByRole("heading", {level: 1, name: "Мои сообщества"})).toBeInTheDocument();
    });

    it("Отображает нужное количество карточек", () => {
        renderWithProviders(<CommunitiesList communitiesList={communitiesMyMock} title="Мои сообщества" emptyTitle="Нет сообществ" />);
        expect(screen.getAllByRole("article")).toHaveLength(communitiesMyMock.length);
    });

    it("При пустом списке карточки не отображаются", () => {
        renderWithProviders(<CommunitiesList communitiesList={[]} title="Мои сообщества" emptyTitle="Нет сообществ" />);
        expect(screen.queryByRole("article")).not.toBeInTheDocument();
    });

    it("При пустом списке отображает emptyTitle", () => {
        renderWithProviders(<CommunitiesList communitiesList={[]} title="Мои сообщества" emptyTitle="Нет сообществ" />);
        expect(screen.getByRole("heading", {name: "Нет сообществ"})).toBeInTheDocument();
    });

    it("При непустом списке emptyTitle не отображается", () => {
        renderWithProviders(<CommunitiesList communitiesList={communitiesMyMock} title="Мои сообщества" emptyTitle="Нет сообществ" />);
        expect(screen.queryByRole("heading", {name: "Нет сообществ"})).not.toBeInTheDocument();
    });
});
