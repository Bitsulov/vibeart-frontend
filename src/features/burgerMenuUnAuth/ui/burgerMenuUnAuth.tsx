import c from "./burgerMenuUnAuth.module.scss";
import {Link, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {linksConfig} from "../config/linksConfig";
import clsx from "clsx";

export const BurgerMenuUnAuth = ({ ...props }) => {
    const { t } = useTranslation();
    const path = useLocation().pathname;

	return (
        <nav className={c.menu_burger_nav} {...props}>
            {linksConfig.map(item => (
                <Link
                    key={item.id}
                    to={item.url}
                    aria-current={path === item.url ? "page" : undefined}
                    className={clsx(c.nav_burger_item, path === item.url && c.active)}
                    aria-label={t(item.labelKey)}
                >
                    {t(item.textKey)}
                </Link>
            ))}
        </nav>
	)
}
