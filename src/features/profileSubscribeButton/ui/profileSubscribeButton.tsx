import c from "./profileSubscribeButton.module.scss";
import { UserCheck, UserPlus } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { toggleUserSubscription } from "entities/user";
import { subscribeClickHandler } from "../model/subscribeClickHandler";
import { toggleSubscriptionErrorHandler } from "../model/toggleSubscriptionErrorHandler";
import clsx from "clsx";
import type { AxiosError } from "axios";
import type { AppError } from "shared/lib/types";

/** Свойства компонента {@link ProfileSubscribeButton}. */
interface ProfileSubscribeButtonProps {
    /** UUID пользователя, на которого оформляется подписка. */
    UUID: string;
    /** Имя пользователя — используется в aria-label кнопки. */
    name: string;
    /** Текущее состояние подписки. */
    isSubscribed: boolean;
    /** Сеттер состояния подписки. */
    setIsSubscribed: Dispatch<SetStateAction<boolean>>;
}

/**
 * Кнопка подписки на пользователя на странице профиля.
 *
 * Состояние переключается оптимистично, запрос отправляется через {@link toggleUserSubscription}.
 * При ошибке оптимистичное изменение откатывается и показывается уведомление.
 */
export const ProfileSubscribeButton = ({
    UUID,
    name,
    isSubscribed,
    setIsSubscribed
}: ProfileSubscribeButtonProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const toggleSubscriptionMutation = useMutation({
        mutationFn: toggleUserSubscription,
        onError: (error: AxiosError<AppError>) =>
            toggleSubscriptionErrorHandler(error, dispatch, isSubscribed, setIsSubscribed)
    });

    const Icon = isSubscribed ? UserCheck : UserPlus;

    return (
        <button
            aria-label={t(
                isSubscribed ? "ariaLabel.unsubscribeUser" : "ariaLabel.subscribeUser",
                { name }
            )}
            onClick={() =>
                subscribeClickHandler(
                    isSubscribed,
                    setIsSubscribed,
                    UUID,
                    toggleSubscriptionMutation.mutateAsync
                )
            }
            className={clsx(c.button, isSubscribed && c.subscribed)}
        >
            <Icon className={c.icon} />
        </button>
    );
};
