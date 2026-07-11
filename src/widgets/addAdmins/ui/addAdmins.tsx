import c from "./addAdmins.module.scss";
import { SearchInput } from "features/searchInput";
import { communityAdminsMock, type UserType } from "entities/user";
import {
    type ComponentPropsWithoutRef,
    type Dispatch,
    type SetStateAction,
    useState
} from "react";
import { changeSearchHandler } from "../model/changeSearchHandler";
import { CommunityUserItem } from "features/communityUserItem";
import { userClickHandler } from "../model/userClickHandler";
import { authorClickHandler } from "../model/authorClickHandler";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

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
 * Отображает поле поиска и список пользователей через {@link CommunityUserItem}.
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
                        name={`${author.name} ${t("You")}`}
                        UUID={author.UUID}
                    />
                </li>
                {communityAdminsMock.map(user => (
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
                                selectedAdmins?.includes(user)
                                    ? "ariaLabel.deleteAdmin"
                                    : "ariaLabel.addAdmin",
                                { name: user.name }
                            )}
                            className={clsx(
                                c.user,
                                selectedAdmins?.includes(user) && c.select
                            )}
                            imageUrl={user.avatarUrl}
                            name={user.name}
                            key={`add admin ${user.UUID}`}
                            UUID={user.UUID}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};
