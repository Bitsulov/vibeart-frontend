import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen, fireEvent, act } from "@testing-library/react";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { CommunitiesLists } from "./communitiesLists";
import { communitiesMyMock, communitiesAllMock } from "entities/community";

const defaultProps = {
    communitiesListOwned: communitiesMyMock,
    communitiesListMy: communitiesMyMock,
    communitiesListAll: communitiesAllMock
};

describe("CommunitiesLists - Секция страницы сообществ", () => {
    it("Отображается как section", () => {
        const { container } = renderWithProviders(<CommunitiesLists {...defaultProps} />);
        expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("Содержит поле поиска", () => {
        renderWithProviders(<CommunitiesLists {...defaultProps} />);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("Содержит ссылку-кнопку создания сообщества", () => {
        renderWithProviders(<CommunitiesLists {...defaultProps} />);
        expect(
            screen.getByRole("link", { name: "ariaLabel.goToCreateCommunityPage" })
        ).toBeInTheDocument();
    });

    it("Отображает заголовок 'Мои сообщества'", () => {
        renderWithProviders(<CommunitiesLists {...defaultProps} />);
        expect(
            screen.getByRole("heading", { name: "communities.myCommunities" })
        ).toBeInTheDocument();
    });

    it("Отображает заголовок 'Мои подписки'", () => {
        renderWithProviders(<CommunitiesLists {...defaultProps} />);
        expect(
            screen.getByRole("heading", { name: "communities.mySubscriptions" })
        ).toBeInTheDocument();
    });

    it("Отображает заголовок 'Все сообщества'", () => {
        renderWithProviders(<CommunitiesLists {...defaultProps} />);
        expect(
            screen.getByRole("heading", { name: "communities.allCommunities" })
        ).toBeInTheDocument();
    });

    it("Отображает суммарное количество карточек из всех списков", () => {
        renderWithProviders(<CommunitiesLists {...defaultProps} />);
        expect(screen.getAllByRole("article")).toHaveLength(
            communitiesMyMock.length +
                communitiesMyMock.length +
                communitiesAllMock.length
        );
    });

    it("Отображает кнопки страниц для списка «Мои сообщества» при переданной пагинации", () => {
        renderWithProviders(
            <CommunitiesLists
                {...defaultProps}
                ownedCommunitiesPagesCount={3}
                ownedCommunitiesCurrentPage={1}
                setOwnedCommunitiesCurrentPage={vi.fn()}
            />
        );
        expect(
            screen.getAllByRole("button", { name: "ariaLabel.changePage" }).length
        ).toBeGreaterThan(0);
    });

    it("Отображает кнопки страниц для списка «Мои подписки» при переданной пагинации", () => {
        renderWithProviders(
            <CommunitiesLists
                {...defaultProps}
                subscribedCommunitiesPagesCount={3}
                subscribedCommunitiesCurrentPage={1}
                setSubscribedCommunitiesCurrentPage={vi.fn()}
            />
        );
        expect(
            screen.getAllByRole("button", { name: "ariaLabel.changePage" }).length
        ).toBeGreaterThan(0);
    });

    describe("onSearchChange", () => {
        beforeEach(() => {
            vi.useFakeTimers({ shouldAdvanceTime: true });
        });

        afterEach(() => {
            vi.useRealTimers();
        });

        it("Вызывает onSearchChange с обрезанным значением после задержки ввода", async () => {
            const onSearchChange = vi.fn();

            renderWithProviders(
                <CommunitiesLists {...defaultProps} onSearchChange={onSearchChange} />
            );

            fireEvent.change(screen.getByRole("textbox"), {
                target: { value: "  арт  " }
            });
            await act(() => vi.advanceTimersByTimeAsync(400));

            expect(onSearchChange).toHaveBeenCalledWith("арт");
        });

        it("Не вызывает onSearchChange раньше, чем истечёт задержка", async () => {
            const onSearchChange = vi.fn();

            renderWithProviders(
                <CommunitiesLists {...defaultProps} onSearchChange={onSearchChange} />
            );

            fireEvent.change(screen.getByRole("textbox"), { target: { value: "арт" } });
            await act(() => vi.advanceTimersByTimeAsync(300));

            expect(onSearchChange).not.toHaveBeenCalledWith("арт");
        });
    });
});
