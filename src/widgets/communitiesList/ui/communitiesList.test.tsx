import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { CommunitiesList } from "./communitiesList";
import { communitiesMyMock } from "entities/community";

describe("CommunitiesList - Список сообществ", () => {
    it("Отображает заголовок секции", () => {
        renderWithProviders(
            <CommunitiesList
                communitiesList={communitiesMyMock}
                title="Мои сообщества"
                emptyTitle="Нет сообществ"
            />
        );
        expect(
            screen.getByRole("heading", { level: 1, name: "Мои сообщества" })
        ).toBeInTheDocument();
    });

    it("Отображает нужное количество карточек", () => {
        renderWithProviders(
            <CommunitiesList
                communitiesList={communitiesMyMock}
                title="Мои сообщества"
                emptyTitle="Нет сообществ"
            />
        );
        expect(screen.getAllByRole("article")).toHaveLength(communitiesMyMock.length);
    });

    it("При пустом списке карточки не отображаются", () => {
        renderWithProviders(
            <CommunitiesList
                communitiesList={[]}
                title="Мои сообщества"
                emptyTitle="Нет сообществ"
            />
        );
        expect(screen.queryByRole("article")).not.toBeInTheDocument();
    });

    it("При пустом списке отображает emptyTitle", () => {
        renderWithProviders(
            <CommunitiesList
                communitiesList={[]}
                title="Мои сообщества"
                emptyTitle="Нет сообществ"
            />
        );
        expect(
            screen.getByRole("heading", { name: "Нет сообществ" })
        ).toBeInTheDocument();
    });

    it("При непустом списке emptyTitle не отображается", () => {
        renderWithProviders(
            <CommunitiesList
                communitiesList={communitiesMyMock}
                title="Мои сообщества"
                emptyTitle="Нет сообществ"
            />
        );
        expect(
            screen.queryByRole("heading", { name: "Нет сообществ" })
        ).not.toBeInTheDocument();
    });

    it("Не отображает элемент-триггер подгрузки без loadMoreRef", () => {
        const { container } = renderWithProviders(
            <CommunitiesList
                communitiesList={communitiesMyMock}
                title="Мои сообщества"
                emptyTitle="Нет сообществ"
            />
        );
        expect(
            container.querySelector("div[aria-hidden='true']")
        ).not.toBeInTheDocument();
    });

    it("Отображает элемент-триггер подгрузки при переданном loadMoreRef", () => {
        const { container } = renderWithProviders(
            <CommunitiesList
                communitiesList={communitiesMyMock}
                title="Мои сообщества"
                emptyTitle="Нет сообществ"
                loadMoreRef={() => {}}
            />
        );
        expect(container.querySelector("div[aria-hidden='true']")).toBeInTheDocument();
    });

    it("Не отображает кнопки страниц без пропсов пагинации", () => {
        renderWithProviders(
            <CommunitiesList
                communitiesList={communitiesMyMock}
                title="Мои сообщества"
                emptyTitle="Нет сообществ"
            />
        );
        expect(
            screen.queryByRole("button", { name: /changePage/ })
        ).not.toBeInTheDocument();
    });

    it("Отображает кнопки страниц при переданных пропсах пагинации", () => {
        renderWithProviders(
            <CommunitiesList
                communitiesList={communitiesMyMock}
                title="Мои сообщества"
                emptyTitle="Нет сообществ"
                pagesCount={3}
                currentPage={1}
                setCurrentPage={vi.fn()}
                pagesDelta={2}
            />
        );
        expect(
            screen.getAllByRole("button", { name: "ariaLabel.changePage" }).length
        ).toBeGreaterThan(0);
    });

    it("Не отображает кнопки подписки при isOwnedList", () => {
        renderWithProviders(
            <CommunitiesList
                communitiesList={communitiesMyMock}
                title="Мои сообщества"
                emptyTitle="Нет сообществ"
                isOwnedList
            />
        );
        expect(screen.queryByRole("button", { name: /subscribe|unscribe/ })).toBeNull();
    });
});
