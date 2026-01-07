import React from "react";
import classes from "./profileButtonsUser.module.scss";
import { toggleSubscribeHandler } from "../model/toggleSubscribeHandler";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ProfileButtonsUserType {
    isOwnProfile: boolean;
    isSubscribe: boolean;
    setIsSubscribe: React.Dispatch<React.SetStateAction<boolean>>;
    userName: string;
}

const ProfileButtonsUser = ({
    isOwnProfile,
    isSubscribe = false,
    setIsSubscribe,
    userName,
    ...props
}: ProfileButtonsUserType) => {
	const { t } = useTranslation();

    const dispatch = useDispatch();

    return (
        <>
            {isOwnProfile ? (
                <div className={classes.info__buttonsOwn} {...props}>
                    <button className={`${classes.info__buttonsItem} ${classes.info__editProfileBtn}`}>
                        {t("ProfileEdit")}
                    </button>
                    <button className={`${classes.info__buttonsItem} ${classes.info__settingsBtn}`}>{t("Settings")}</button>
                    <button className={`${classes.info__buttonsItem} ${classes.info__addPostBtn}`}>
					{t("ProfileAddPost")}
                    </button>
                    <button className={`${classes.info__buttonsItem} ${classes.info__manageAlbumsBtn}`}>{t("Albums")}</button>
                </div>
            ) : (
                <div className={classes.info__buttons} {...props}>
                    <button
                        className={
                            isSubscribe
                                ? `${classes.info__buttonsItem} ${classes.info__unscribeBtn}`
                                : `${classes.info__buttonsItem} ${classes.info__subscribeBtn}`
                        }
                        id="subscribe"
                        onClick={e => toggleSubscribeHandler(e, dispatch, isSubscribe, setIsSubscribe, userName)}
                    >
                        {isSubscribe ? t("Unscribe") : t("Subscribe")}
                    </button>
                    <Link to="#" className={`${classes.info__buttonsItem} ${classes.info__messageBtn}`}>
                        {t("ProfileWrite")}
                    </Link>
                </div>
            )}
        </>
    );
};

export { ProfileButtonsUser };
