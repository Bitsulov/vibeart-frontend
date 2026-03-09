import c from "./layout.module.scss";
import {Header} from "widgets/header";
import React, {useState} from "react";
import {Modal} from "widgets/modal";
import {languagesConfig} from "../config/languagesConfig";
import {Footer} from "widgets/footer";

interface LayoutProps {
    children?: React.ReactNode;
    isShowFooter?: boolean;
}

export const Layout = ({ isShowFooter = true, children, ...props }: LayoutProps) => {
    const [isShowChangeLanguage, setIsShowChangeLanguage] = useState(false);

	return (
		<>
			<Header
                isShowChangeLanguage={isShowChangeLanguage}
                languagesConfig={languagesConfig}
                setIsShowChangeLanguage={setIsShowChangeLanguage}
            />
            <main className={c.main} {...props}>
                <Modal
                    languagesConfig={languagesConfig}
                    isShowChangeLanguage={isShowChangeLanguage}
                    setIsShowChangeLanguage={setIsShowChangeLanguage}
                />
                {children}
            </main>
            {isShowFooter &&
                <Footer />
            }
		</>
	)
}
