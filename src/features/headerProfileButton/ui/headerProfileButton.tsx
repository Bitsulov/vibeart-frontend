import c from "./headerProfileButton.module.scss";
import {Link} from "react-router-dom";
import defaultAvatar from "shared/icons/icon-user.svg";
import {useTranslation} from "react-i18next";
import React from "react";

interface HeaderProfileButtonProps {
    imageUrl: string;
    isAuthenticated: boolean;
    userULID: string;
    name: string;
    isBurgerOpen: boolean;
    setIsBurgerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HeaderProfileButton = ({
    imageUrl,
    name,
    userULID,
    isAuthenticated,
    isBurgerOpen: _isBurgerOpen,
    setIsBurgerOpen: _setIsBurgerOpen,
    ...props
}: HeaderProfileButtonProps) => {
    const { t } = useTranslation();
    const alt = isAuthenticated ? name : "user";
    const image = isAuthenticated ? imageUrl || defaultAvatar : defaultAvatar;
    const href = isAuthenticated ? `/profile/${userULID}` : "/auth"
    const ariaLabel = isAuthenticated ? t("ariaLabel.goToProfile") : t("ariaLabel.goToAuth")

	return (
		<Link className={c.link} to={href} aria-label={ariaLabel} {...props}>
            <img
                decoding="async"
                loading="lazy"
                width="80"
                height="80"
                src={image}
                alt={alt}
                className={c.avatar_img}
            />
		</Link>
	)
}
