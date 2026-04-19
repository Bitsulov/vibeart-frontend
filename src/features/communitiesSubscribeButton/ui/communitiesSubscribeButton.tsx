import c from "./communitiesSubscribeButton.module.scss";
import {useTranslation} from "react-i18next";
import React, { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import {toggleSubscribeClickHandler} from "../model/toggleSubscribeClickHandler";

interface CommunitiesSubscribeButtonProps extends ComponentPropsWithoutRef<"button"> {
    isSubscribed: boolean;
    setIsSubscribed: React.Dispatch<React.SetStateAction<boolean>>;
    className?: string;
}

/**
 * Кнопка подписки/отписки на сообщество.
 * @param isSubscribed - текущее состояние подписки
 * @param setIsSubscribed - сеттер состояния подписки
 * @param className - дополнительный CSS-класс
 * @param props - остальные пропсы `button`
 */
export const CommunitiesSubscribeButton = ({
    isSubscribed,
    setIsSubscribed,
    className = "",
    ...props
}: CommunitiesSubscribeButtonProps) => {
    const { t } = useTranslation();

    const text = isSubscribed ? "unscribe" : "subscribe";

	return (
		<button
            onClick={() => toggleSubscribeClickHandler(setIsSubscribed)}
            className={clsx(c.button, isSubscribed && c.subscribed, className)}
            {...props}
        >
            {t(text)}
		</button>
	)
}
