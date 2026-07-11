import c from "./profileInfo.module.scss";
import { useTranslation } from "react-i18next";
import { ChevronDown, Heart, Image, UsersRound } from "lucide-react";
import { selectUserInfo, type UserType } from "entities/user";
import defaultAvatar from "shared/icons/icon-user.svg";
import { CopyButton } from "features/copyButton";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentLanguage } from "entities/appConfig";
import { getLocalTimeString } from "shared/lib/getLocalTimeString";
import { useState, useRef, useEffect } from "react";
import { openDescriptionHandler } from "../model/openDescriptionHandler";
import { ProfileLink } from "features/profileLink";
import { useWindowWidth } from "shared/hooks/useWindowWidth";
import { ProfileIcons } from "features/profileIcons";
import { StatItem } from "features/statItem";
import { showHint } from "../model/showHint";
import { hideHint } from "../model/hideHint";

/** Свойства компонента {@link ProfileInfo}. */
interface ProfileInfoProps {
    /** Объект пользователя, профиль которого отображается. */
    userInfo: UserType;
    /** Статус загрузки данных */
    isLoadingData?: boolean;
}

/**
 * Блок информации профиля: аватар, имя, имя пользователя, описание, статистика и статусные иконки.
 *
 * Определяет, является ли просматриваемый профиль собственным, и передаёт этот признак
 * в {@link ProfileLink}. На узких экранах (< 1200 px) описание сворачивается с кнопкой
 * раскрытия. Дата регистрации форматируется через {@link getLocalTimeString}.
 */
export const ProfileInfo = ({ userInfo, isLoadingData = false }: ProfileInfoProps) => {
    const { t } = useTranslation();
    const language = useSelector(selectCurrentLanguage);
    const principalUserInfo = useSelector(selectUserInfo);

    const windowWidth = useWindowWidth();

    const [isOpened, setIsOpened] = useState<boolean>(false);

    const [isExpandable, setIsExpandable] = useState<boolean>(false);
    const descriptionRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (!descriptionRef.current || !userInfo.description || windowWidth >= 1200) {
            setIsExpandable(false);
            return;
        }
        setIsExpandable(
            descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight
        );
    }, [userInfo.description, windowWidth]);

    const avatarImg = userInfo.avatarUrl || defaultAvatar;
    const avatarAlt = isLoadingData
        ? t("loading...")
        : `${t("profile.avatarAlt")} ${userInfo.name}`;
    const isPrincipalUser = userInfo.UUID === principalUserInfo.UUID;

    const resultDate = isLoadingData
        ? t("loading...")
        : getLocalTimeString(language, userInfo.createdAt);

    const dispatch = useDispatch();

    const name = isLoadingData
        ? t("loading...")
        : userInfo.name || t("profile.emptyName");
    const description = isLoadingData
        ? t("loading...")
        : userInfo.description || t("community.emptyDescription");

    return (
        <section className={c.info}>
            <div className={c.content_wrapper}>
                <div className={c.info_inner}>
                    {windowWidth < 1200 && (
                        <ProfileIcons
                            isBlocked={userInfo.isBlocked}
                            trustStatus={userInfo.trustStatus}
                            className={c.bad_icons}
                            classNameIcons={c.icon}
                        />
                    )}
                    {!isLoadingData && (
                        <ProfileLink
                            isPrincipalUser={isPrincipalUser}
                            name={userInfo.name}
                            UUID={userInfo.UUID}
                        />
                    )}
                    <div className={c.left}>
                        <div
                            className={clsx(
                                c.avatar_wrapper,
                                userInfo.onlineStatus === "ONLINE" && c.online
                            )}
                        >
                            <img
                                decoding="async"
                                width="125"
                                height="125"
                                src={avatarImg}
                                alt={avatarAlt}
                                className={c.avatar}
                            />
                        </div>
                        <div className={c.stats}>
                            <StatItem
                                onMouseEnter={() => showHint(dispatch, t("hint.works"))}
                                onMouseLeave={() => hideHint(dispatch)}
                                Icon={Image}
                                className={c.works_wrapper}
                                number={userInfo.worksCount}
                            />
                            <StatItem
                                onMouseEnter={() =>
                                    showHint(dispatch, t("hint.subscribers"))
                                }
                                onMouseLeave={() => hideHint(dispatch)}
                                Icon={UsersRound}
                                className={c.subscribers_wrapper}
                                number={userInfo.subscribersCount}
                            />
                            <StatItem
                                onMouseEnter={() =>
                                    showHint(dispatch, t("hint.subscribes"))
                                }
                                onMouseLeave={() => hideHint(dispatch)}
                                Icon={Heart}
                                className={c.subscribes_wrapper}
                                number={userInfo.subscribesCount}
                            />
                        </div>
                    </div>
                    <div className={c.right}>
                        <h1 className={c.name}>{name}</h1>
                        <div className={c.username_wrapper}>
                            <p className={c.username}>
                                {userInfo.username || userInfo.UUID}
                            </p>
                            <CopyButton
                                className={c.copy_button}
                                text={userInfo.username || userInfo.UUID}
                            />
                        </div>
                        {windowWidth >= 1200 && (
                            <ProfileIcons
                                isBlocked={userInfo.isBlocked}
                                trustStatus={userInfo.trustStatus}
                                className={c.bad_icons}
                                classNameIcons={c.icon}
                            />
                        )}
                        <div className={c.description_wrapper}>
                            {!isOpened && windowWidth < 1200 && isExpandable && (
                                <button
                                    aria-label={t("ariaLabel.openDescription")}
                                    onClick={() => openDescriptionHandler(setIsOpened)}
                                    className={c.description_button}
                                >
                                    <ChevronDown
                                        width="24"
                                        height="24"
                                        className={c.description_arrow}
                                    />
                                </button>
                            )}
                            <h3 className={c.description_sign}>
                                {t("profile.description")}
                            </h3>
                            <p
                                ref={descriptionRef}
                                className={clsx(
                                    c.description,
                                    !isOpened && windowWidth < 1200 && c.hide,
                                    !isOpened &&
                                        windowWidth < 1200 &&
                                        isExpandable &&
                                        c.expandable
                                )}
                            >
                                {description}
                            </p>
                        </div>
                        <div className={c.date_wrapper}>
                            <h3 className={c.date_sign}>{t("profile.createdAt")}</h3>
                            <p className={c.date}>{resultDate}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
