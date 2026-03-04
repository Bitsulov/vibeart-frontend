import c from "./layout.module.scss";
import {Header} from "widgets/header";
import {useState} from "react";
import {Modal} from "widgets/modal";
import {languagesConfig} from "../config/languagesConfig";
import {Footer} from "widgets/footer";

export const Layout = ({ ...props }) => {
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
            </main>
            <Footer />
		</>
	)
}
