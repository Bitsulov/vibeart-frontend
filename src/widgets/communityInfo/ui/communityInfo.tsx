import c from "./communityInfo.module.scss";
import {selectUserInfo} from "entities/user";
import {type CommunityType} from "entities/community";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useWindowWidth} from "shared/hooks/useWindowWidth";
import defaultAvatar from "shared/icons/icon-user.svg";
import {ProfileIcons} from "features/profileIcons";
import clsx from "clsx";
import {StatItem} from "features/statItem";
import {showHint} from "../model/showHint";
import {hideHint} from "../model/hideHint";
import {Heart, Image, Settings, UsersRound} from "lucide-react";
import {CopyButton} from "features/copyButton";
import {openDescriptionHandler} from "../model/openDescriptionHandler";
import {useState} from "react";
import {CommunityModal} from "widgets/communityModal";
import {communityAdminsMock} from "entities/user";
import {Link, useNavigate} from "react-router-dom";
import {DeleteButton} from "features/deleteButton";
import {ConfirmModal} from "../../confirmModal";
import {deleteCommunityClickHandler} from "../model/deleteCommunityClickHandler";
import {openConfirmModalHandler} from "../model/openConfirmModalHandler";

interface CommunityInfoProps {
    communityInfo: CommunityType;
}

/** Блок информации о сообществе: аватар, название, username, описание, статистика и кнопки управления.
 *
 * @param communityInfo - Объект сообщества типа `CommunityType`.
 */
export const CommunityInfo = ({ communityInfo }: CommunityInfoProps) => {
    const { t } = useTranslation();
    const principalUserInfo = useSelector(selectUserInfo);
    const navigate = useNavigate();

    const windowWidth = useWindowWidth();

    const [isOpenedWindow, setIsOpenedWindow] = useState<boolean>(false);
    const [isShowConfirmModal, setIsShowConfirmModal] = useState<boolean>(false);

    const avatarImg = communityInfo.imageUrl || defaultAvatar;
    const avatarAlt = `${t("profile.avatarAlt")} ${communityInfo.title}`;
    const isPrincipalUser = communityInfo.owner.id === principalUserInfo.id;

    const dispatch = useDispatch();

    return (
        <section className={c.info}>
            <CommunityModal
                description={communityInfo.description}
                createdAt={communityInfo.createdAt}
                owner={communityInfo.owner}
                admins={communityAdminsMock}
                isShow={isOpenedWindow}
                setIsShow={setIsOpenedWindow}
            />
            <ConfirmModal
                text={t("modal.deleteCommunity")}
                ariaLabelConfirm={t("ariaLabel.deleteCommunity")}
                confirmFn={() => deleteCommunityClickHandler(navigate)}
                isShowModal={isShowConfirmModal}
                setIsShowModal={setIsShowConfirmModal}
            />
            <div className={c.content_wrapper}>
                <div className={c.info_inner}>
                    {windowWidth < 1200 &&
                        <ProfileIcons
                            isBlocked={communityInfo.isBlocked}
                            trustStatus={communityInfo.trustStatus}
                            className={c.bad_icons}
                            classNameIcons={c.icon}
                        />
                    }
                    {isPrincipalUser &&
                        <div className={c.buttons}>
                            <Link
                                aria-label={t("ariaLabel.goToSettings")}
                                to={`/communities/${communityInfo.ULID}/edit`}
                                className={c.settings_wrapper}
                                onMouseEnter={() => showHint(dispatch, t("hint.settings"))}
                                onMouseLeave={() => hideHint(dispatch)}
                                onClick={() => hideHint(dispatch)}
                            >
                                <Settings className={c.settings} width="31" height="31" />
                            </Link>
                            <DeleteButton
                                onMouseEnter={() => showHint(dispatch, t("hint.deleteCommunity"))}
                                onMouseLeave={() => hideHint(dispatch)}
                                onClick={() => openConfirmModalHandler(setIsShowConfirmModal)}
                                className={c.delete}
                            />
                        </div>
                    }
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
                                onMouseEnter={() => showHint(dispatch, t("hint.subscribers"))}
                                onMouseLeave={() => hideHint(dispatch)}
                                Icon={UsersRound}
                                className={c.subscribers_wrapper}
                                number={communityInfo.subscribers}
                            />
                            <StatItem
                                onMouseEnter={() => showHint(dispatch, t("hint.subscribes"))}
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
                            <p className={c.username}>@{communityInfo.username}</p>
                            <CopyButton
                                className={c.copy_button}
                                text={communityInfo.username}
                            />
                        </div>
                        {windowWidth >= 1200 &&
                            <ProfileIcons
                                isBlocked={communityInfo.isBlocked}
                                trustStatus={communityInfo.trustStatus}
                                className={c.bad_icons}
                                classNameIcons={c.icon}
                            />
                        }
                        <div className={c.description_wrapper}>
                            <button
                                aria-label={t("ariaLabel.openDescription")}
                                onClick={() => openDescriptionHandler(setIsOpenedWindow)}
                                className={c.description_button}
                            >
                                {t("moreShort")}
                            </button>
                            <h3 className={c.description_sign}>{t("profile.description")}</h3>
                            <p className={clsx(c.description, c.hide)}>{communityInfo.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
