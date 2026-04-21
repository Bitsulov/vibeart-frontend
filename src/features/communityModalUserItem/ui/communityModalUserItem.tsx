import c from "./communityModalUserItem.module.scss";
import {Link, type LinkProps} from "react-router-dom";
import defaultAvatar from "shared/icons/icon-user.svg";

interface CommunityModalUserItemProps extends Omit<LinkProps, "to"> {
    imageUrl: string;
    name: string;
    ULID: string;
    className?: string;
}

/** Элемент списка пользователей в модальном окне сообщества: аватар и имя со ссылкой на профиль.
 *
 * @param imageUrl - URL аватара пользователя.
 * @param name - Отображаемое имя.
 * @param ULID - ULID пользователя для формирования ссылки на профиль.
 * @param className - Дополнительный CSS-класс.
 */
export const CommunityModalUserItem = ({
    imageUrl,
    name,
    ULID,
    className = "",
    ...props
}: CommunityModalUserItemProps) => {
	return (
		<Link to={`/profile/${ULID}`} className={`${c.user} ${className}`} {...props}>
            <img decoding="async" width="25" height="25" src={imageUrl || defaultAvatar} alt={name} className={c.img} />
            <p className={c.name}>{name}</p>
		</Link>
	)
}
