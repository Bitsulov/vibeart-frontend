import c from "./communitiesSubscribeButton.module.scss";
import { useTranslation } from "react-i18next";
import React, { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { subscribeClickHandler } from "../model/subscribeClickHandler";
import { toggleSubscriptionErrorHandler } from "../model/toggleSubscriptionErrorHandler";
import { toggleSubscriptionSuccessHandler } from "../model/toggleSubscriptionSuccessHandler";
import { toggleCommunitySubscription } from "entities/community";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { AppError } from "shared/lib/types";

/** Свойства компонента {@link CommunitiesSubscribeButton}. */
interface CommunitiesSubscribeButtonProps extends ComponentPropsWithoutRef<"button"> {
    /** UUID сообщества. */
    UUID: string;
    /** Текущее состояние подписки. Определяет текст кнопки и визуальный стиль. */
    isSubscribed: boolean;
    /** Функция обновления состояния подписки. */
    setIsSubscribed: React.Dispatch<React.SetStateAction<boolean>>;
    /** Функция обновления количества подписчиков. */
    setSubscribersCount: React.Dispatch<React.SetStateAction<number>>;
    /** Дополнительный CSS-класс для корневого элемента. */
    className?: string;
}

/**
 * Кнопка подписки и отписки на сообщество.
 *
 * Текст меняется в зависимости от `isSubscribed`. Состояние подписки и счётчик
 * подписчиков обновляются оптимистично, запрос отправляется через {@link toggleCommunitySubscription}.
 * При ошибке оптимистичное изменение откатывается и показывается уведомление.
 */
export const CommunitiesSubscribeButton = ({
    UUID,
    isSubscribed,
    setIsSubscribed,
    setSubscribersCount,
    className = "",
    ...props
}: CommunitiesSubscribeButtonProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const toggleSubscriptionMutation = useMutation({
        mutationFn: toggleCommunitySubscription,
        onSuccess: () => toggleSubscriptionSuccessHandler(queryClient),
        onError: (error: AxiosError<AppError>) =>
            toggleSubscriptionErrorHandler(
                error,
                dispatch,
                isSubscribed,
                setIsSubscribed,
                setSubscribersCount
            )
    });

    const text = isSubscribed ? "unscribe" : "subscribe";

    return (
        <button
            onClick={() =>
                subscribeClickHandler(
                    setSubscribersCount,
                    isSubscribed,
                    setIsSubscribed,
                    UUID,
                    toggleSubscriptionMutation.mutateAsync
                )
            }
            className={clsx(c.button, isSubscribed && c.subscribed, className)}
            {...props}
        >
            {t(text)}
        </button>
    );
};
