import c from "./navigationItem.module.scss";
import {Link, type LinkProps} from "react-router-dom";
import {useTranslation} from "react-i18next";
import type {LucideIcon} from "lucide-react";

interface NavigationItemProps extends Omit<LinkProps, "to"> {
    Icon: LucideIcon;
    ULID: string;
    link: {
        href: (ULID: string) => string;
        icon: LucideIcon;
        title: string;
        ariaLabel: string;
        isAdmin: boolean;
    };
    path: string;
    chatsNotices: number;
    notificationsNotices: number
}

/**
 * Пункт боковой навигации с иконкой и счётчиком уведомлений.
 *
 * @param link - Конфиг ссылки: URL-генератор (принимает ULID пользователя), иконка, заголовок, ключи локализации, флаг isAdmin пользователя.
 * @param path - Текущий путь для определения активного пункта.
 * @param chatsNotices - Количество непрочитанных сообщений в чатах.
 * @param notificationsNotices - Количество непрочитанных уведомлений.
 */
export const NavigationItem = ({
    Icon,
    ULID,
    link,
    path,
    chatsNotices,
    notificationsNotices,
    ...props
}: NavigationItemProps) => {
    const { t } = useTranslation();
    const href = link.href(ULID);

	return (
        <Link
            aria-current={href === path ? "page" : undefined}
            aria-label={t(link.ariaLabel)}
            to={href}
            className={c.link}
            {...props}
        >
            <Icon className={c.icon} width="42" height="42" />
            <span className={c.title}>{t(link.title)}</span>
            {href === "/chats" && chatsNotices > 0 ?
                <span className={c.number}>{chatsNotices}</span>
            : href === "/notifications" && chatsNotices > 0 ?
                <span className={c.number}>{notificationsNotices}</span>
            : <></>
            }
        </Link>
	)
}
