import c from "./chatItem.module.scss";
import {Link, type LinkProps} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {getChatDate} from "shared/lib/getChatDate";
import {useSelector} from "react-redux";
import {selectCurrentLanguage} from "entities/appConfig";
import defaultAvatar from "shared/icons/icon-user.svg";

interface ChatItemProps extends Omit<LinkProps, "to"> {
    ULID: string;
    title: string;
    className?: string;
    imageUrl: string;
    lastMessage: string;
    date: string;
}

/** Элемент списка чатов: аватар собеседника, имя, последнее сообщение и дата. */
export const ChatItem = ({
    className = "",
    title,
    ULID,
    imageUrl,
    lastMessage,
    date,
    ...props
}: ChatItemProps) => {
    const { t } = useTranslation();
    const currentLanguage = useSelector(selectCurrentLanguage);

    const resultDate = getChatDate(currentLanguage, date);

	return (
		<Link
            aria-label={t("ariaLabel.goToChat", {name: title})}
            className={`${c.chat} ${className}`}
            to={`/chats/${ULID}`}
            {...props}
        >
            <img src={imageUrl || defaultAvatar} alt={`${t("avatar")} ${title}`} className={c.img} />
            <div className={c.info}>
                <h2 className={c.title}>{title}</h2>
                <div className={c.bottom}>
                    <p className={c.text}>{lastMessage}</p>
                    <p className={c.date}>{resultDate}</p>
                </div>
            </div>
		</Link>
	)
}
