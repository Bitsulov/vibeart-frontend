import c from "./profileIcons.module.scss";
import { Ban, ShieldX } from "lucide-react";
import React from "react";

/** Свойства компонента {@link ProfileIcons}. */
interface ProfileIconsProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Дополнительный CSS-класс, применяемый к каждой отдельной иконке. */
    classNameIcons?: string;
    /** Признак блокировки аккаунта модерацией. При `true` отображается иконка запрета. */
    isBlocked: boolean;
    /** Уровень доверия к контенту пользователя. При значении `"UNTRUST"` отображается иконка предупреждения. */
    trustStatus: "TRUST" | "UNTRUST";
}

/**
 * Набор иконок, отражающих административный статус пользователя.
 *
 * Иконка блокировки отображается при `isBlocked === true`,
 * иконка недоверия — при `trustStatus === "UNTRUST"`.
 * Компонент не отрисовывает ничего, если оба условия ложны.
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
            {isBlocked && (
                <Ban
                    className={`${c.icon} ${c.ban} ${classNameIcons}`}
                    width="24"
                    height="24"
                />
            )}
            {trustStatus === "UNTRUST" && (
                <ShieldX
                    className={`${c.icon} ${c.AI} ${classNameIcons}`}
                    width="24"
                    height="24"
                />
            )}
        </div>
    );
};
