import type React from "react";
import classes from "./profileUserInfo.module.scss";
import { ProfileUserTag } from "features/profileUserTag";
import { ProfileButtonsUser } from "features/profileButtonsUser";
import { parseNumber } from "shared/lib/parseNumber";
import { useTranslation } from "react-i18next";

interface ProfileUserInfoPropsType {
    srcImg: string;
    fullName: string;
    userName: string;
    isOwnProfile: boolean;
    description: string;
    subscribers: number;
    subscribes: number;
    works: number;
    isSubscribe: boolean;
    setIsSubscribe: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileUserInfo = ({
    srcImg,
    fullName,
    userName,
    isOwnProfile = false,
    description = "",
    subscribers = 0,
    subscribes = 0,
    works = 0,
    isSubscribe,
    setIsSubscribe,
    ...props
}: ProfileUserInfoPropsType) => {
	const { t } = useTranslation();

    return (
        <section className={classes.info} {...props}>
            <img src={srcImg} alt={userName} className={classes.info__avatar}></img>
            <h1 className={classes.info__username}>{fullName}</h1>
            <ProfileUserTag userName={userName} />
            <ProfileButtonsUser
                userName={userName}
                isOwnProfile={isOwnProfile}
                isSubscribe={isSubscribe}
                setIsSubscribe={setIsSubscribe}
            />
            <p className={classes.info__description}>{description}</p>
            <div className={classes.info__stats}>
                <span className={classes.statsSubscribers} title={String(subscribers)}>
					{t("subscribers")}: {parseNumber(subscribers)}
                </span>{" "}
                <span className={classes.spliter}>|</span>{" "}
                <span className={classes.statsSubscribes} title={String(subscribes)}>
					{t("subscribes")}: {parseNumber(subscribes)}
                </span>{" "}
                <span className={classes.spliter}>|</span>{" "}
                <span className={classes.statsWorks} title={String(works)}>
					{t("works")}: {parseNumber(works)}
                </span>
            </div>
        </section>
    );
};

export { ProfileUserInfo };
