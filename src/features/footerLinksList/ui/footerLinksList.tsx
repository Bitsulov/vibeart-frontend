import c from "./footerLinksList.module.scss";
import {footerLinksConfig} from "../config/footerLinksConfig";
import {FooterLinksItem} from "features/footerLinksItem";
import {useTranslation} from "react-i18next";

export const FooterLinksList = ({ ...props }) => {
    const { t } = useTranslation();

	return (
        <ul className={c.links_list} {...props}>
            {footerLinksConfig.map(item =>
                    <FooterLinksItem key={`footer:${item.src}`} to={item.src} ariaLabel={t(item.ariaLabel)}>
                    {t(item.text)}
                </FooterLinksItem>
            )}
		</ul>
	)
}
