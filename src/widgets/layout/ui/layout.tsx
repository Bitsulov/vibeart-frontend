import c from "./layout.module.scss";
import {Header} from "widgets/header";
import {useState} from "react";
import {Modal} from "widgets/modal";

export const Layout = ({ ...props }) => {
    const [isShowChangeLanguage, setIsShowChangeLanguage] = useState(false);

	return (
		<>
			<Header setIsShowChangeLanguage={setIsShowChangeLanguage} />
            <main className={c.main} {...props}>
                <Modal isShowChangeLanguage={isShowChangeLanguage} />
            </main>
		</>
	)
}
