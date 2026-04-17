import c from "./header.module.scss";
import {useTranslation} from "react-i18next";
import {pagesTitleConfig} from "../config/pagesTitleConfig";
import {useLocation} from "react-router-dom";
import React, {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {selectUserInfo} from "entities/user";
import {HeaderLogo} from "features/headerLogo";
import {HeaderLanguageButton} from "features/headerLanguageButton";
import {BurgerButton} from "features/burgerButton";
import {BurgerMenuUnAuth} from "features/burgerMenuUnAuth";
import {BurgerMenuAuth} from "features/burgerMenuAuth";
import clsx from "clsx";
import {useWindowWidth} from "shared/hooks/useWindowWidth";
import {HeaderProfileButton} from "features/headerProfileButton";

interface HeaderProps {
    setIsShowChangeLanguage: React.Dispatch<React.SetStateAction<boolean>>;
    isShowChangeLanguage: boolean;
    languagesConfig: Record<string, string[]>
}

/** Шапка сайта с логотипом, заголовком страницы, кнопками языка и профиля/бургера.
 *
 * @param isShowChangeLanguage - Флаг показа модального окна смены языка.
 * @param setIsShowChangeLanguage - Сеттер флага показа окна смены языка.
 * @param languagesConfig - Список языков в формате: [флаг, название, ariaLabel, alt, значение].
 */
export const Header = ({
    setIsShowChangeLanguage,
    isShowChangeLanguage,
    languagesConfig
}: HeaderProps) => {
    const { t } = useTranslation();
    const location = useLocation();

    const currentWindowWidth = useWindowWidth();

    const userInfo = useSelector(selectUserInfo);

    const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(false);
    const BurgerNav = userInfo.isAuthenticated ? BurgerMenuAuth : BurgerMenuUnAuth;

    const HeaderButton = currentWindowWidth < 1200 ? BurgerButton : HeaderProfileButton;

    const mainLocation = useMemo(
        () => pagesTitleConfig[location.pathname.split("/", 2)[1]] ?? "pages.error",
        [location.pathname]
    );

    useEffect(() => {
        setIsBurgerOpen(false);
    }, [location.pathname]);

	return (
		<header className={c.header}>
			<div className={c.header_left}>
                <HeaderLogo />
                {t(mainLocation) &&
                    <h3 className={c.page_title}>
                        <span aria-hidden="true" className={c.arrow}>&gt; </span>{t(mainLocation)}
                    </h3>
                }
            </div>
            <div className={c.header_right}>
                {currentWindowWidth > 1200 &&
                    <a
                        aria-label={t("ariaLabel.goToEmail")}
                        href="mailto:vibeartfake@mail.ru"
                        className={c.email_link}
                    >
                        vibeartfake@mail.ru
                    </a>
                }
                <HeaderLanguageButton
                    isBurgerOpen={isBurgerOpen}
                    languagesConfig={languagesConfig}
                    isShowChangeLanguage={isShowChangeLanguage}
                    setIsShowChangeLanguage={setIsShowChangeLanguage}
                />
                <HeaderButton
                    isBurgerOpen={isBurgerOpen}
                    setIsBurgerOpen={setIsBurgerOpen}
                    imageUrl={userInfo.avatarUrl}
                    name={userInfo.name}
                    userULID={userInfo.ULID}
                    isAuthenticated={userInfo.isAuthenticated}
                />
            </div>
            {currentWindowWidth < 1200 && (
                <div className={clsx(c.menu_burger, isBurgerOpen && c.open)} id="burgerMenu">
                    <div className="container">
                        <BurgerNav />
                    </div>
                </div>
            )}
            <span className={clsx(c.line, isBurgerOpen && c.active)} aria-hidden="true"></span>
		</header>
	)
}
