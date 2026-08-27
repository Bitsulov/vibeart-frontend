import c from "./communitySubscribeButton.module.scss";
import { UserCheck, UserPlus } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { toggleCommunitySubscription } from "entities/community";
import { subscribeClickHandler } from "../model/subscribeClickHandler";
import { toggleSubscriptionErrorHandler } from "../model/toggleSubscriptionErrorHandler";
import clsx from "clsx";
import type { AxiosError } from "axios";
import type { AppError } from "shared/lib/types";

/** Свойства компонента {@link CommunitySubscribeButton}. */
interface CommunitySubscribeButtonProps {
    /** UUID сообщества, на которое оформляется подписка. */
    UUID: string;
    /** Название сообщества — используется в aria-label кнопки. */
    name: string;
    /** Текущее состояние подписки. */
    isSubscribed: boolean;
    /** Сеттер состояния подписки. */
    setIsSubscribed: Dispatch<SetStateAction<boolean>>;
}

/**
 * Кнопка подписки на сообщество на странице сообщества.
 *
 * Состояние переключается оптимистично, запрос отправляется через {@link toggleCommunitySubscription}.
 * При ошибке оптимистичное изменение откатывается и показывается уведомление.
 */
export const CommunitySubscribeButton = ({
    UUID,
    name,
    isSubscribed,
    setIsSubscribed
}: CommunitySubscribeButtonProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const toggleSubscriptionMutation = useMutation({
        mutationFn: toggleCommunitySubscription,
        onError: (error: AxiosError<AppError>) =>
            toggleSubscriptionErrorHandler(error, dispatch, isSubscribed, setIsSubscribed)
    });

    const Icon = isSubscribed ? UserCheck : UserPlus;

    return (
        <button
            aria-label={t(
                isSubscribed
                    ? "ariaLabel.unsubscribeCommunity"
                    : "ariaLabel.subscribeCommunity",
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
