import c from "./communityItem.module.scss";
import { useEffect, useState } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { StatItem } from "../../statItem";
import { UsersRound } from "lucide-react";
import { TransparentLink } from "../../transparentLink";
import { CommunitiesSubscribeButton } from "../../communitiesSubscribeButton";
import { showHint } from "../model/showHint";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { hideHint } from "../model/hideHint";
import defaultAvatar from "shared/icons/icon-user.svg";
import clsx from "clsx";

/** Свойства компонента {@link CommunityItem}. */
interface CommunitiesItemProps extends ComponentPropsWithoutRef<"article"> {
    /** URL обложки сообщества. */
    imageUrl?: string;
    /** UUID сообщества для формирования ссылки `/communities/:uuid`. */
    UUID: string;
    /** Название сообщества. */
    title?: string;
    /** Краткое описание сообщества. */
    description?: string;
    /** Количество подписчиков. */
    subscribersCount?: number;
    /** Признак подписки текущего пользователя на это сообщество. */
    isSubscribed?: boolean;
    /** Признак того, что текущий пользователь — владелец сообщества. */
    isOwner?: boolean;
}

/**
 * Карточка сообщества в списке.
 *
 * Отображает обложку, счётчик подписчиков, название, описание,
 * ссылку на страницу сообщества и кнопку подписки/отписки.
 * Подписка и счётчик подписчиков обновляются оптимистично через {@link CommunitiesSubscribeButton}.
 */
export const CommunityItem = ({
    imageUrl,
    UUID,
    title = "",
    description = "",
    subscribersCount = 0,
    isSubscribed = false,
    isOwner = false,
    ...props
}: CommunitiesItemProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [isSubscribedCommunity, setIsSubscribedCommunity] =
        useState<boolean>(isSubscribed);
    const [subscribersCountState, setSubscribersCountState] =
        useState<number>(subscribersCount);

    useEffect(() => {
        setIsSubscribedCommunity(isSubscribed);
        setSubscribersCountState(subscribersCount);
    }, [isSubscribed, subscribersCount]);

    return (
        <article className={c.community} {...props}>
            <div className={c.info}>
                <div className={c.left}>
                    <img src={imageUrl || defaultAvatar} alt={title} className={c.img} />
                    <StatItem
                        onMouseEnter={() => showHint(dispatch, t("hint.subscribers"))}
                        onMouseLeave={() => hideHint(dispatch)}
                        Icon={UsersRound}
                        number={subscribersCountState}
                        className={c.subscribers}
                    />
                </div>
                <div className={c.right}>
                    <h3 className={c.title}>{title}</h3>
                    <p className={c.description}>{description}</p>
                </div>
            </div>
            <div className={c.buttons}>
                <TransparentLink
                    className={clsx(c.link, isOwner && c.link_full)}
                    href={`/communities/${UUID}`}
                >
                    {t("goLink")}
                </TransparentLink>
                {!isOwner && (
                    <CommunitiesSubscribeButton
                        UUID={UUID}
                        setIsSubscribed={setIsSubscribedCommunity}
                        setSubscribersCount={setSubscribersCountState}
                        className={c.subscribe}
                        isSubscribed={isSubscribedCommunity}
                    />
                )}
            </div>
        </article>
    );
};
