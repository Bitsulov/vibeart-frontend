import c from "./footerEmailLink.module.scss";
import {useTranslation} from "react-i18next";
import {copyClickHandler} from "../model/copyClickHandler";
import {CopyIcon} from "lucide-react";

export const FooterEmailLink = ({ ...props }) => {
    const { t } = useTranslation();

	return (
        <div className={c.link_wrapper}>
            <a
                aria-label={t("ariaLabel.goToEmail")}
                href="mailto:vibeartfake@mail.ru"
                className={c.link}
                {...props}
            >
                vibeartfake@mail.ru
            </a>
            <button aria-label={t("ariaLabel.copy")} onClick={() => copyClickHandler("vibeartfake@mail.ru")} className={c.copy}>
                <CopyIcon width="15" height="15" className={c.copy_img} />
            </button>
        </div>
	)
}
