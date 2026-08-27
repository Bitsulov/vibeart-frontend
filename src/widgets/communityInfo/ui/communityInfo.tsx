import c from "./communityInfo.module.scss";
import { selectUserInfo } from "entities/user";
import { deleteCommunityByUUID, type CommunityType } from "entities/community";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useWindowWidth } from "shared/hooks/useWindowWidth";
import defaultAvatar from "shared/icons/icon-user.svg";
import { ProfileIcons } from "features/profileIcons";
import clsx from "clsx";
import { StatItem } from "features/statItem";
import { showHint } from "../model/showHint";
import { hideHint } from "../model/hideHint";
import { Heart, Image, Settings, UsersRound } from "lucide-react";
import { CopyButton } from "features/copyButton";
import { openDescriptionHandler } from "../model/openDescriptionHandler";
import { useEffect, useState } from "react";
import { CommunityModal } from "widgets/communityModal";
import { Link, useNavigate } from "react-router-dom";
import { DeleteButton } from "features/deleteButton";
import { ConfirmModal } from "../../confirmModal";
import { confirmDeleteCommunity } from "../model/confirmDeleteCommunity";
import { deleteCommunitySuccessHandler } from "../model/deleteCommunitySuccessHandler";
import { deleteCommunityErrorHandler } from "../model/deleteCommunityErrorHandler";
import { openConfirmModalHandler } from "../model/openConfirmModalHandler";
import { CommunitySubscribeButton } from "features/communitySubscribeButton";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { AppError } from "shared/lib/types";

/** Свойства компонента {@link CommunityInfo}. */
interface CommunityInfoProps {
    /** Объект сообщества, информация о котором отображается. */
    communityInfo: CommunityType;
}

/**
 * Блок информации о сообществе: аватар, название, имя пользователя, описание, статистика и кнопки управления.
 *
 * Определяет, является ли текущий пользователь владельцем сообщества, и при совпадении
 * отображает кнопки редактирования и удаления. Описание раскрывается в {@link CommunityModal}.
 * Удаление требует подтверждения через {@link ConfirmModal}.
 */
export const CommunityInfo = ({ communityInfo }: CommunityInfoProps) => {
    const { t } = useTranslation();
    const principalUserInfo = useSelector(selectUserInfo);
    const navigate = useNavigate();

    const windowWidth = useWindowWidth();

    const [isOpenedWindow, setIsOpenedWindow] = useState<boolean>(false);
    const [isShowConfirmModal, setIsShowConfirmModal] = useState<boolean>(false);

    const [isSubscribed, setIsSubscribed] = useState<boolean>(communityInfo.isSubscribed);

    useEffect(() => {
        setIsSubscribed(communityInfo.isSubscribed);
    }, [communityInfo.isSubscribed]);

    const avatarImg = communityInfo.imageUrl || defaultAvatar;
    const avatarAlt = `${t("profile.avatarAlt")} ${communityInfo.title}`;
    const isPrincipalUser = communityInfo.owner.UUID === principalUserInfo.UUID;

    const username = communityInfo.username ? communityInfo.username : communityInfo.UUID;

    const dispatch = useDispatch();

    const deleteCommunityMutation = useMutation({
        mutationFn: deleteCommunityByUUID,
        onSuccess: () => deleteCommunitySuccessHandler(navigate),
        onError: (error: AxiosError<AppError>) =>
            deleteCommunityErrorHandler(error, dispatch)
    });

    return (
        <section className={c.info}>
            <CommunityModal
                description={communityInfo.description || t("community.emptyDescription")}
                createdAt={communityInfo.createdAt}
                owner={communityInfo.owner}
                admins={communityInfo.admins}
                isShow={isOpenedWindow}
                setIsShow={setIsOpenedWindow}
            />
            <ConfirmModal
                text={t("modal.deleteCommunity")}
                ariaLabelConfirm={t("ariaLabel.deleteCommunity")}
                confirmFn={() =>
                    confirmDeleteCommunity(
                        communityInfo.UUID,
                        deleteCommunityMutation.mutateAsync
                    )
                }
                isShowModal={isShowConfirmModal}
                setIsShowModal={setIsShowConfirmModal}
            />
            <div className={c.content_wrapper}>
                <div className={c.info_inner}>
                    {windowWidth < 1200 && (
                        <ProfileIcons
                            isBlocked={communityInfo.isBlocked}
                            trustStatus={communityInfo.trustStatus}
                            className={c.bad_icons}
                            classNameIcons={c.icon}
                        />
                    )}
                    {isPrincipalUser && (
                        <div className={c.buttons}>
                            <Link
                                aria-label={t("ariaLabel.goToSettings")}
                                to={`/communities/add?community=${communityInfo.UUID}`}
                                className={c.settings_wrapper}
                                onMouseEnter={() =>
                                    showHint(dispatch, t("hint.settings"))
                                }
                                onMouseLeave={() => hideHint(dispatch)}
                                onClick={() => hideHint(dispatch)}
                            >
                                <Settings className={c.settings} width="31" height="31" />
                            </Link>
                            <DeleteButton
                                onMouseEnter={() =>
                                    showHint(dispatch, t("hint.deleteCommunity"))
                                }
                                onMouseLeave={() => hideHint(dispatch)}
                                onClick={() =>
                                    openConfirmModalHandler(setIsShowConfirmModal)
                                }
                                className={c.delete}
                            />
                        </div>
                    )}
                    {!isPrincipalUser && (
                        <CommunitySubscribeButton
                            UUID={communityInfo.UUID}
                            name={communityInfo.title}
                            isSubscribed={isSubscribed}
                            setIsSubscribed={setIsSubscribed}
                        />
                    )}
                    <div className={c.left}>
                        <div className={c.avatar_wrapper}>
                            <img
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
                                number={communityInfo.posts}
                            />
                            <StatItem
                                onMouseEnter={() =>
                                    showHint(dispatch, t("hint.subscribers"))
                                }
                                onMouseLeave={() => hideHint(dispatch)}
                                Icon={UsersRound}
                                className={c.subscribers_wrapper}
                                number={communityInfo.subscribers}
                            />
                            <StatItem
                                onMouseEnter={() =>
                                    showHint(dispatch, t("hint.subscribes"))
                                }
                                onMouseLeave={() => hideHint(dispatch)}
                                Icon={Heart}
                                className={c.subscribes_wrapper}
                                number={communityInfo.subscribes}
                            />
                        </div>
                    </div>
                    <div className={c.right}>
                        <h1 className={c.name}>{communityInfo.title}</h1>
                        <div className={c.username_wrapper}>
                            <p className={c.username}>@{username}</p>
                            <CopyButton className={c.copy_button} text={username} />
                        </div>
                        {windowWidth >= 1200 && (
                            <ProfileIcons
                                isBlocked={communityInfo.isBlocked}
                                trustStatus={communityInfo.trustStatus}
                                className={c.bad_icons}
                                classNameIcons={c.icon}
                            />
                        )}
                        <div className={c.description_wrapper}>
                            <button
                                aria-label={t("ariaLabel.openDescription")}
                                onClick={() => openDescriptionHandler(setIsOpenedWindow)}
                                className={c.description_button}
                            >
                                {t("moreShort")}
                            </button>
                            <h3 className={c.description_sign}>
                                {t("profile.description")}
                            </h3>
                            <p className={clsx(c.description, c.hide)}>
                                {communityInfo.description ||
                                    t("community.emptyDescription")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
