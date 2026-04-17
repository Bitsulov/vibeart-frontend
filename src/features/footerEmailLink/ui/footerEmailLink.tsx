import c from "./footerEmailLink.module.scss";
import {useTranslation} from "react-i18next";
import {CopyButton} from "features/copyButton";

/** Email-ссылка в футере с кнопкой копирования адреса. */
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
            <CopyButton className={c.copy} text="vibeartfake@mail.ru" />
        </div>
	)
}
