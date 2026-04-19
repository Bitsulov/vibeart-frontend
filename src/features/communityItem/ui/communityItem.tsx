import c from "./communityItem.module.scss";
import React, {useState} from "react";
import {StatItem} from "../../statItem";
import {UsersRound} from "lucide-react";
import {TransparentLink} from "../../transparentLink";
import {CommunitiesSubscribeButton} from "../../communitiesSubscribeButton";
import {showHint} from "../model/showHint";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {hideHint} from "../model/hideHint";

interface CommunitiesItemProps extends React.ComponentPropsWithoutRef<"article"> {
    imageUrl?: string;
    ULID: string;
    title?: string;
    description?: string;
    subscribersCount?: number;
    isSubscribed?: boolean;
}

/**
 * Карточка сообщества с изображением, названием, описанием и кнопками действий.
 * @param imageUrl - URL изображения сообщества
 * @param ULID - уникальный идентификатор сообщества
 * @param title - название сообщества
 * @param description - описание сообщества
 * @param subscribersCount - количество подписчиков
 * @param isSubscribed - подписан ли текущий пользователь
 * @param props - остальные пропсы `article`
 */
export const CommunityItem = ({
    imageUrl,
    ULID,
    title = "",
    description = "",
    subscribersCount = 0,
    isSubscribed = false,
    ...props
}: CommunitiesItemProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [isSubscribedCommunity, setIsSubscribedCommunity] = useState<boolean>(isSubscribed);

	return (
		<article className={c.community} {...props}>
            <div className={c.info}>
                <div className={c.left}>
                    <img src={imageUrl} alt={title} className={c.img} />
                    <StatItem
                        onMouseEnter={() => showHint(dispatch, t("hint.subscribers"))}
                        onMouseLeave={() => hideHint(dispatch)}
                        Icon={UsersRound}
                        number={subscribersCount}
                        className={c.subscribers}
                    />
                </div>
                <div className={c.right}>
                    <h3 className={c.title}>{title}</h3>
                    <p className={c.description}>{description}</p>
                </div>
            </div>
            <div className={c.buttons}>
                <TransparentLink className={c.link} href={`/communities/${ULID}`}>{t("goLink")}</TransparentLink>
                <CommunitiesSubscribeButton
                    setIsSubscribed={setIsSubscribedCommunity}
                    className={c.subscribe}
                    isSubscribed={isSubscribedCommunity}
                />
            </div>
		</article>
	)
}
