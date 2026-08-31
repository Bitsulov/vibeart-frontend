import c from "./addAdmins.module.scss";
import { SearchInput } from "features/searchInput";
import { createUser, getFriends, getFriendsBySearch, type UserType } from "entities/user";
import {
    type ComponentPropsWithoutRef,
    type Dispatch,
    type SetStateAction,
    useMemo,
    useState
} from "react";
import { changeSearchHandler } from "../model/changeSearchHandler";
import { CommunityUserItem } from "features/communityUserItem";
import { userClickHandler } from "../model/userClickHandler";
import { authorClickHandler } from "../model/authorClickHandler";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedValue } from "shared/hooks/useDebouncedValue";

/** Свойства компонента {@link AddAdmins}. */
interface AddAdminsProps extends ComponentPropsWithoutRef<"div"> {
    /** Объект пользователя — владельца сообщества. Всегда отображается первым и не может быть снят. */
    author: UserType;
    /** Дополнительный CSS-класс для корневого элемента. */
    className?: string;
    /** Текущий список выбранных администраторов. */
    selectedAdmins?: UserType[];
    /** Сеттер списка выбранных администраторов. */
    setSelectedAdmins: Dispatch<SetStateAction<UserType[]>>;
}

/**
 * Виджет выбора администраторов сообщества.
 *
 * Отображает поле поиска и список друзей текущего пользователя через {@link CommunityUserItem}.
 * Без поискового запроса показывает всех друзей, с запросом — результат поиска среди друзей,
 * с задержкой в 400 мс после последнего ввода.
 * Автор сообщества всегда показывается первым с пометкой «Вы» и не может быть снят.
 * Остальные пользователи переключаются кликом: выбранные подсвечиваются рамкой
 * и галочкой через CSS-класс `.select`.
 */
export const AddAdmins = ({
    className = "",
    author,
    selectedAdmins = [],
    setSelectedAdmins,
    ...props
}: AddAdminsProps) => {
    const { t } = useTranslation();
    const [searchValue, setSearchValue] = useState<string>("");
    const debouncedSearchValue = useDebouncedValue(searchValue.trim(), 400);

    const friendsQuery = useQuery({
        queryKey: [`friends ${debouncedSearchValue}`],
        queryFn: () =>
            debouncedSearchValue
                ? getFriendsBySearch(debouncedSearchValue, { size: 10 })
                : getFriends({ size: 10 })
    });

    const friends = useMemo(
        () =>
            (friendsQuery.data?.data.content ?? []).map(friend =>
                createUser({
                    UUID: friend.uuid,
                    title: friend.name,
                    username: friend.username,
                    description: friend.description,
                    worksCount: friend.worksCount,
                    subscribersCount: friend.subscribersCount,
                    subscribesCount: friend.subscribesCount,
                    albumList: [],
                    createdAt: friend.createdAt,
                    trustStatus: friend.trustStatus,
                    isAuthenticated: false,
                    isBlocked: false,
                    onlineStatus: friend.onlineStatus,
                    role: "USER",
                    avatarUrl: friend.avatarUrl
                })
            ),
        [friendsQuery.data]
    );

    const selectedAdminsNotInList = selectedAdmins.filter(
        admin => !friends.some(friend => friend.UUID === admin.UUID)
    );

    const displayedFriends = [...selectedAdminsNotInList, ...friends];

    return (
        <div className={`${c.admins} ${className}`} {...props}>
            <h2 className={c.title}>{t("createCommunity.adminsTitle")}</h2>
            <SearchInput
                className={c.search}
                value={searchValue}
                onChange={e => changeSearchHandler(e, setSearchValue)}
            />
            <ul className={c.list}>
                <li className={c.item}>
                    <CommunityUserItem
                        onClick={e => authorClickHandler(e)}
                        className={`${c.user} ${c.select}`}
                        imageUrl={author.avatarUrl}
                        name={`${author.title || author.UUID} ${t("You")}`}
                        UUID={author.UUID}
                    />
                </li>
                {displayedFriends.map(user => (
                    <li key={`add admin wrapper ${user.UUID}`} className={c.item}>
                        <CommunityUserItem
                            onClick={e =>
                                userClickHandler(
                                    e,
                                    selectedAdmins,
                                    setSelectedAdmins,
                                    user
                                )
                            }
                            aria-label={t(
                                selectedAdmins?.some(admin => admin.UUID === user.UUID)
                                    ? "ariaLabel.deleteAdmin"
                                    : "ariaLabel.addAdmin",
                                { name: user.title || user.UUID }
                            )}
                            className={clsx(
                                c.user,
                                selectedAdmins?.some(admin => admin.UUID === user.UUID) &&
                                    c.select
                            )}
                            imageUrl={user.avatarUrl}
                            name={user.title || user.UUID}
                            key={`add admin ${user.UUID}`}
                            UUID={user.UUID}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};
