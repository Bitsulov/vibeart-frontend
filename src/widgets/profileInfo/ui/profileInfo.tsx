import c from "./profileInfo.module.scss";
import {useTranslation} from "react-i18next";
import {ChevronDown, Heart, Image, UsersRound} from "lucide-react";
import {selectUserInfo, type UserType} from "entities/user";
import defaultAvatar from "shared/icons/icon-user.svg";
import {CopyButton} from "features/copyButton";
import clsx from "clsx";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentLanguage} from "entities/appConfig";
import {getLocalTimeString} from "shared/lib/getLocalTimeString";
import {useState} from "react";
import {openDescriptionHandler} from "../model/openDescriptionHandler";
import {ProfileLink} from "features/profileLink";
import {useWindowWidth} from "shared/hooks/useWindowWidth";
import {getShortNumber} from "shared/lib/getShortNumber";
import {ProfileIcons} from "features/profileIcons";
import {StatItem} from "features/statItem";
import {showHint} from "../model/showHint";
import {hideHint} from "../model/hideHint";

interface ProfileInfoProps {
    userInfo: UserType;
}

export const ProfileInfo = ({ userInfo }: ProfileInfoProps) => {
    const { t } = useTranslation();
    const language = useSelector(selectCurrentLanguage);
    const principalUserInfo = useSelector(selectUserInfo);

    const windowWidth = useWindowWidth();

    const [isOpened, setIsOpened] = useState<boolean>(false);

    const avatarImg = userInfo.avatarUrl || defaultAvatar;
    const avatarAlt = `${t("profile.avatarAlt")} ${userInfo.name}`;
    const isPrincipalUser = userInfo.id === principalUserInfo.id;

    const resultDate = getLocalTimeString(language, userInfo.createdAt);
    const works = getShortNumber(userInfo.worksCount);
    const subscribers = getShortNumber(userInfo.subscribersCount);
    const subscribes = getShortNumber(userInfo.subscribesCount);

    const dispatch = useDispatch();

	return (
		<section className={c.info}>
            <div className={c.content_wrapper}>
                <div className={c.info_inner}>
                    {windowWidth < 1200 &&
                        <ProfileIcons
                            isBlocked={userInfo.isBlocked}
                            trustStatus={userInfo.trustStatus}
                            className={c.bad_icons}
                            classNameIcons={c.icon}
                        />
                    }
                    <ProfileLink isPrincipalUser={isPrincipalUser} name={userInfo.name} ULID={userInfo.ULID} />
                    <div className={c.left}>
                        <div className={clsx(c.avatar_wrapper, userInfo.onlineStatus === "online" && c.online)}>
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
                                number={works}
                            />
                            <StatItem
                                onMouseEnter={() => showHint(dispatch, t("hint.subscribers"))}
                                onMouseLeave={() => hideHint(dispatch)}
                                Icon={UsersRound}
                                className={c.subscribers_wrapper}
                                number={subscribers}
                            />
                            <StatItem
                                onMouseEnter={() => showHint(dispatch, t("hint.subscribes"))}
                                onMouseLeave={() => hideHint(dispatch)}
                                Icon={Heart}
                                className={c.subscribes_wrapper}
                                number={subscribes}
                            />
                        </div>
                    </div>
                    <div className={c.right}>
                        <h1 className={c.name}>{userInfo.name}</h1>
                        <div className={c.username_wrapper}>
                            <p className={c.username}>{userInfo.username}</p>
                            <CopyButton
                                className={c.copy_button}
                                text={userInfo.username}
                            />
                        </div>
                        {windowWidth >= 1200 &&
                            <ProfileIcons
                                isBlocked={userInfo.isBlocked}
                                trustStatus={userInfo.trustStatus}
                                className={c.bad_icons}
                                classNameIcons={c.icon}
                            />
                        }
                        <div className={c.description_wrapper}>
                            {!isOpened && windowWidth < 1200 &&
                                <button aria-label={t("ariaLabel.openDescription")} onClick={() => openDescriptionHandler(setIsOpened)} className={c.description_button}>
                                    <ChevronDown width="24" height="24" className={c.description_arrow} />
                                </button>
                            }
                            <h3 className={c.description_sign}>{t("profile.description")}</h3>
                            <p className={clsx(c.description, !isOpened && windowWidth < 1200 && c.hide)}>{userInfo.description}</p>
                        </div>
                        <div className={c.date_wrapper}>
                            <h3 className={c.date_sign}>{t("profile.createdAt")}</h3>
                            <p className={c.date}>{resultDate}</p>
                        </div>
                    </div>
                </div>
            </div>
		</section>
	)
}
