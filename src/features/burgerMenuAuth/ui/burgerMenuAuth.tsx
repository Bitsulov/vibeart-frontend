import c from "./burgerMenuAuth.module.scss";
import {Link, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {selectUserInfo} from "entities/user";
import clsx from "clsx";
import {linksConfig} from "../config/linksConfig";

export const BurgerMenuAuth = ({ ...props }) => {
    const { t } = useTranslation();
    const path = useLocation().pathname;

    const userInfo = useSelector(selectUserInfo);

	return (
        <nav className={c.menu_burger_nav} {...props}>
            {linksConfig.map(item => {
                if(item.isAdmin) {
                    if(userInfo.role === "admin") {
                        return (
                            <Link
                                key={item.id}
                                to={item.url}
                                aria-current={path === item.url ? "page" : undefined}
                                className={clsx(c.nav_burger_item, path === item.url && c.active)}
                                aria-label={t(item.labelKey)}
                            >
                                {t(item.textKey)}
                            </Link>
                        )
                    }
                } else {
                    return (
                        <Link
                            key={item.id}
                            to={item.url}
                            aria-current={path === item.url ? "page" : undefined}
                            className={clsx(c.nav_burger_item, path === item.url && c.active)}
                            aria-label={t(item.labelKey)}
                        >
                            {t(item.textKey)}
                        </Link>
                    )
                }
            })}
        </nav>
	)
}
