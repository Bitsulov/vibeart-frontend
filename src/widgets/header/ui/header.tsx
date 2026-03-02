import c from "./header.module.scss";
import {useTranslation} from "react-i18next";
import {pagesTitleConfig} from "../config/pagesTitleConfig";
import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectIsAuthenticated} from "entities/user";
import {HeaderLogo} from "features/headerLogo";
import {HeaderLanguageButton} from "features/headerLanguageButton";
import {BurgerButton} from "features/burgerButton";
import {BurgerMenuUnAuth} from "features/burgerMenuUnAuth";
import {BurgerMenuAuth} from "features/burgerMenuAuth";
import clsx from "clsx";

interface HeaderProps {
    setIsShowChangeLanguage: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({setIsShowChangeLanguage}: HeaderProps) => {
    const { t } = useTranslation();
    const location = useLocation();
    const [mainLocation, setMainLocation] = useState(t("loading..."));

    const isAuthenticated = useSelector(selectIsAuthenticated);

    const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(false);
    const BurgerNav = isAuthenticated ? BurgerMenuAuth : BurgerMenuUnAuth;

    useEffect(() => {
        setMainLocation(pagesTitleConfig[location.pathname.split("/", 2)[1] ?? ""]);
        setIsBurgerOpen(false);
    }, [location.pathname]);

	return (
		<header className={c.header}>
			<div className={c.header_left}>
                <HeaderLogo />
                <h3 className={c.page_title}>&gt; {t(mainLocation)}</h3>
            </div>
            <div className={c.header_right}>
                <HeaderLanguageButton setIsShowChangeLanguage={setIsShowChangeLanguage} />
                <BurgerButton isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} />
            </div>
            <div className={clsx(c.menu_burger, isBurgerOpen && c.open)} id="burgerMenu">
                <div className="container">
                    <BurgerNav />
                </div>
            </div>
            <span className={clsx(c.line, isBurgerOpen && c.active)} aria-hidden="true"></span>
		</header>
	)
}
