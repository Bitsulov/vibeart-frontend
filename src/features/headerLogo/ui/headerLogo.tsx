import c from "./headerLogo.module.scss";
import logoIcon from "shared/icons/icon-logo-white.svg";
import {Link, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const HeaderLogo = ({ ...props }) => {
    const { t } = useTranslation();
    const path = useLocation().pathname;

	return (
        <Link
            to="/"
            aria-current={path === "/" ? "page" : undefined}
            className={c.logo_link}
            aria-label={t("ariaLabel.goToHome")}
            {...props}
        >
            <img
                src={logoIcon}
                alt={t("alt-logo")}
                width="54"
                height="29"
                className={c.logo_img}
                loading="lazy"
            />
        </Link>
	)
}
