import c from "./footerLogo.module.scss";
import {useTranslation} from "react-i18next";
import {Link, useLocation} from "react-router-dom";
import logoIcon from "shared/icons/icon-logo-white.svg";

export const FooterLogo = ({ ...props }) => {
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
                width="100"
                height="54"
                className={c.logo_img}
                decoding="async"
                loading="lazy"
            />
        </Link>
    )
}
