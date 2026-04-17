import c from "./messageItem.module.scss";
import clsx from "clsx";
import {statusesConfig} from "../config/statusesConfig";
import React from "react";

interface MessageItemProps extends React.HTMLAttributes<HTMLDivElement> {
    isYour: boolean;
    text: string;
    date: string;
    isNew?: boolean;
    status: "save" | "sent" | "read"
}

/**
 * Сообщение в чате с временем отправки и статусом доставки.
 *
 * @param isYour - Является ли сообщение отправленным текущим пользователем.
 * @param isNew - Новое ли сообщение (влияет на анимацию появления).
 * @param status - Статус доставки: `"save"` — сохранено, `"sent"` — отправлено, `"read"` — прочитано.
 */
export const MessageItem = ({ isYour, text, date, status, isNew, ...props }: MessageItemProps) => {
    const dateObject = new Date(date);
    const time = `${dateObject.getHours().toString().padStart(2, "0")}:${dateObject.getMinutes().toString().padStart(2, "0")}`;

    const StatusIcon = statusesConfig[status];

	return (
		<div className={clsx(c.message, isYour && c.your, isYour && isNew && c.new)} {...props}>
            <p className={c.text}>{text}</p>
            <div className={c.info}>
                {isYour &&
                    <StatusIcon className={c.icon} strokeWidth="2" width="13" height="13" />
                }
                <p className={c.time}>{time}</p>
            </div>
		</div>
	)
}
