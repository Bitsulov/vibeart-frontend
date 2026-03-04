import c from "./footer.module.scss";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {selectServerStatus} from "entities/appConfig";
import {serverStatusesConfig} from "../config/serverStatusesConfig";
import {FooterLinksList} from "features/footerLinksList";
import {FooterEmailLink} from "features/footerEmailLink";
import {FooterLogo} from "features/footerLogo";

export const Footer = () => {
    const { t } = useTranslation();

    const serverStatus = useSelector(selectServerStatus);
    const currentYear = new Date().getFullYear();

	return (
		<footer className={c.footer}>
            <div className="container">
                <div className={c.footer_inner}>
                    <div className={c.info}>
                        <h3 className={c.title}>{t("Information")}</h3>
                        <FooterLinksList />
                    </div>
                    <div className={c.other}>
                        <div className={c.email}>
                            <h3 className={c.title}>{t("Email")}</h3>
                            <FooterEmailLink />
                        </div>
                        <div className={c.status}>
                            <h3 className={c.title}>{t("Status")}</h3>
                            <p className={c.server_status}>{t(serverStatusesConfig[serverStatus])}</p>
                        </div>
                    </div>
                    <div className={c.logo_wrapper}>
                        <FooterLogo />
                        <p className={c.rights}>© 2025–{currentYear} VibeArt</p>
                    </div>
                </div>
            </div>
		</footer>
	)
}
