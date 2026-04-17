import c from "./authBackLink.module.scss";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {ArrowLeft} from "lucide-react";

/** Ссылка «назад» на страницах авторизации — возвращает на главную страницу. */
export const AuthBackLink = ({ ...props }) => {
    const { t } = useTranslation();

	return (
        <Link aria-label={t("ariaLabel.goToHome")} to="/" className={c.back_wrapper} {...props}>
            <ArrowLeft aria-hidden="true" className={c.back_img} width="18" height="18" />
            <p className={c.back_title}>{t("auth.backTitle")}</p>
        </Link>
	)
}
