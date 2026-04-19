import c from "./layout.module.scss";
import {Header} from "widgets/header";
import React, {type ComponentPropsWithoutRef, useState} from "react";
import {Modal} from "widgets/modal";
import {languagesConfig} from "../config/languagesConfig";
import {Footer} from "widgets/footer";
import {MouseHint} from "features/mouseHint";

interface LayoutProps extends ComponentPropsWithoutRef<"main"> {
    children?: React.ReactNode;
    isShowFooter?: boolean;
    isSmallTitle?: boolean;
    className?: string;
}

/** Обёртка страницы: шапка, модальное окно языков, подсказка мыши, основной контент, опциональный футер.
 * 
 * @param className - Класс для основного контента.
 * @param children - Контент страницы.
 * @param isSmallTitle - Уменьшенный заголовок страницы.
 * @param isShowFooter - Показывать ли подвал.
 * */
export const Layout = ({
    isShowFooter = true,
    children,
    isSmallTitle = false,
    className = "",
    ...props
}: LayoutProps) => {
    const [isShowChangeLanguage, setIsShowChangeLanguage] = useState(false);

	return (
		<>
			<Header
                isShowChangeLanguage={isShowChangeLanguage}
                languagesConfig={languagesConfig}
                setIsShowChangeLanguage={setIsShowChangeLanguage}
                isSmallTitle={isSmallTitle}
            />

            <main className={`${c.main} ${className}`} {...props}>
                <Modal
                    languagesConfig={languagesConfig}
                    isShowChangeLanguage={isShowChangeLanguage}
                    setIsShowChangeLanguage={setIsShowChangeLanguage}
                />
                <MouseHint />
                {children}
            </main>
            {isShowFooter &&
                <Footer />
            }
		</>
	)
}
