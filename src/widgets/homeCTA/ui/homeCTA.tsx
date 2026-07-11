import c from "./homeCTA.module.scss";
import { useTranslation } from "react-i18next";
import { StylizedLink } from "features/stylizedLink";
import type { ComponentPropsWithoutRef } from "react";

/** Свойства секции призыва к действию на главной странице */
interface HomeCTAProps extends ComponentPropsWithoutRef<"section"> {
    /** Признак авторизованного пользователя */
    isAuthenticated?: boolean;
}

/** Секция призыва к действию на главной странице с кнопкой регистрации. */
export const HomeCTA = ({ isAuthenticated = false, ...props }: HomeCTAProps) => {
    const { t } = useTranslation();

    const href = isAuthenticated ? "/gallery" : "/register";
    const ariaLabel = isAuthenticated
        ? "ariaLabel.goToGallery"
        : "ariaLabel.goToRegister";

    return (
        <section className={c.cta} {...props}>
            <div className="container">
                <div className={c.cta_inner}>
                    <h2 className={c.title}>{t("home.CTATitle")}</h2>
                    <p className={c.description}>{t("home.CTADescription")}</p>
                    <StylizedLink ariaLabel={t(ariaLabel)} className={c.link} href={href}>
                        {t("home.CTALink")}
                    </StylizedLink>
                </div>
            </div>
        </section>
    );
};
