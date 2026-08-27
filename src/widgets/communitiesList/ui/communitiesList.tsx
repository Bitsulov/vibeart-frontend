import c from "./communitiesList.module.scss";
import type { CommunityType } from "entities/community";
import { CommunityItem } from "features/communityItem";
import type { ComponentPropsWithoutRef, Dispatch, Ref, SetStateAction } from "react";
import { PagesButtons } from "features/pagesButtons";

/** Свойства компонента {@link CommunitiesList}. */
interface CommunitiesListProps extends ComponentPropsWithoutRef<"div"> {
    /** Список сообществ для отображения. */
    communitiesList: CommunityType[];
    /** Заголовок секции над списком. */
    title: string;
    /** Дополнительный CSS-класс для корневого элемента. */
    className?: string;
    /** Текст заглушки, отображаемый при пустом списке. */
    emptyTitle: string;
    /** Ref невидимого элемента-триггера в конце списка — при появлении во viewport запускает подгрузку следующей страницы сообществ. */
    loadMoreRef?: Ref<HTMLDivElement>;
    /** Общее количество страниц. При передаче под списком отображаются кнопки постраничной навигации. */
    pagesCount?: number;
    /** Номер текущей активной страницы. */
    currentPage?: number;
    /** Функция обновления текущей страницы. */
    setCurrentPage?: Dispatch<SetStateAction<number>>;
    /** Радиус окна отображаемых страниц вокруг текущей — см. {@link PagesButtons}. */
    pagesDelta?: number;
    /** Признак того, что текущий пользователь — владелец всех сообществ в списке. */
    isOwnedList?: boolean;
}

/**
 * Список сообществ с заголовком секции.
 *
 * При пустом списке отображает заглушку с текстом.
 * Каждое сообщество отрисовывается через {@link CommunityItem}.
 * Поддерживает либо подгрузку по прокрутке через `loadMoreRef`, либо
 * постраничную навигацию через `pagesCount`/`currentPage`/`setCurrentPage`/`pagesDelta` — не одновременно.
 */
export const CommunitiesList = ({
    communitiesList,
    title,
    className = "",
    emptyTitle = "",
    loadMoreRef,
    pagesCount,
    currentPage,
    setCurrentPage,
    pagesDelta,
    isOwnedList = false,
    ...props
}: CommunitiesListProps) => {
    const isExistsCommunities = communitiesList && communitiesList.length > 0;

    return (
        <div className={`${c.communities_list} ${className}`} {...props}>
            <h1 className={c.title}>{title}</h1>
            <div className={c.list}>
                {isExistsCommunities ? (
                    communitiesList.map(community => (
                        <CommunityItem
                            key={community.UUID}
                            imageUrl={community.imageUrl}
                            UUID={community.UUID}
                            title={community.title}
                            description={community.description}
                            subscribersCount={community.subscribers}
                            isSubscribed={community.isSubscribed}
                            isOwner={isOwnedList}
                        />
                    ))
                ) : (
                    <h2 className={c.empty}>{emptyTitle}</h2>
                )}
            </div>
            {loadMoreRef && (
                <div ref={loadMoreRef} aria-hidden="true" className={c.load_more} />
            )}
            {pagesCount !== undefined &&
                currentPage !== undefined &&
                setCurrentPage &&
                pagesDelta !== undefined && (
                    <PagesButtons
                        pagesCount={pagesCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        pagesDelta={pagesDelta}
                    />
                )}
        </div>
    );
};
