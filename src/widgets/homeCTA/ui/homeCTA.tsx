import c from "./homeCTA.module.scss";
import {useTranslation} from "react-i18next";
import {StylizedLink} from "features/stylizedLink";

export const HomeCTA = ({ ...props }) => {
    const { t } = useTranslation();

	return (
		<section className={c.CTA} {...props}>
			<div className="container">
                <div className={c.CTA_inner}>
                    <h2 className={c.title}>{t("home.CTATitle")}</h2>
                    <p className={c.description}>{t("home.CTADescription")}</p>
                    <StylizedLink ariaLabel={t("ariaLabel.goToRegister")} className={c.link} href="/register">
                        {t("home.CTALink")}
                    </StylizedLink>
                </div>
            </div>
		</section>
	)
}
