import c from "./layout.module.scss";
import {Header} from "widgets/header";
import React, {useState} from "react";
import {Modal} from "widgets/modal";
import {languagesConfig} from "../config/languagesConfig";
import {Footer} from "widgets/footer";
import {MouseHint} from "features/mouseHint";

interface LayoutProps {
    children?: React.ReactNode;
    isShowFooter?: boolean;
    className?: string;
}

/** Обёртка страницы: шапка, модалка языков, подсказка мыши, основной контент, опциональный футер.
 * 
 * @param className - Класс для основного контента.
 * @param isShowFooter - Показывать ли подвал.
 * */
export const Layout = ({
    isShowFooter = true,
    children,
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
