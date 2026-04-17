import c from "./profileIcons.module.scss";
import {Ban, ShieldX} from "lucide-react";
import React from "react";

interface ProfileIconsProps extends React.HTMLAttributes<HTMLDivElement> {
    classNameIcons?: string;
    isBlocked: boolean;
    trustStatus: "trust" | "untrust"
}

/**
 * Иконки статуса пользователя: блокировка и недоверенный статус.
 *
 * @param classNameIcons - Дополнительный CSS-класс для каждой иконки.
 * @param isBlocked - Заблокирован ли пользователь.
 * @param trustStatus - Статус доверия к пользователю.
 */
export const ProfileIcons = ({
    isBlocked,
    trustStatus,
    className = "",
    classNameIcons = "",
    ...props
}: ProfileIconsProps) => {
	return (
        <div className={`${c.bad_icons} ${className}`} {...props}>
            {isBlocked &&
                <Ban className={`${c.icon} ${c.ban} ${classNameIcons}`} width="24" height="24" />
            }
            {trustStatus === "untrust" &&
                <ShieldX className={`${c.icon} ${c.AI} ${classNameIcons}`} width="24" height="24" />
            }
        </div>
	)
}
