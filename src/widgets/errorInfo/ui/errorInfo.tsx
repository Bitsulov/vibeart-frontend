import c from "./errorInfo.module.scss";
import {useTranslation} from "react-i18next";
import {errorsConfig} from "../config/errorsConfig";
import {StylizedLink} from "features/stylizedLink";

interface ErrorInfoProps {
    errorCode?: number;
}

export const ErrorInfo = ({ errorCode = 404, ...props }: ErrorInfoProps) => {
    const { t } = useTranslation();

	return (
		<section className={c.error} {...props}>
            <div className="container">
                <h1 className={c.title}>{t("error.errorTitle")}</h1>
                <h2 className={c.code}>{errorCode}</h2>
                <p className={c.error_text}>
                    {t(errorsConfig[errorCode])}
                </p>
                <div className={c.links}>
                    <StylizedLink className={c.link} ariaLabel={t("ariaLabel.goToHome")} href="/">{t("error.returnToHome")}</StylizedLink>
                    <StylizedLink className={c.link} ariaLabel={t("ariaLabel.goToContacts")} href="/contacts">{t("error.report")}</StylizedLink>
                </div>
            </div>
		</section>
	)
}
