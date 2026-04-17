import c from "./homeIntro.module.scss";
import {useTranslation} from "react-i18next";
import imgIntro from "shared/icons/img-intro.png";
import {StylizedLink} from "features/stylizedLink";

/** Вводная секция главной страницы с заголовком, описанием и кнопкой входа. */
export const HomeIntro = ({ ...props }) => {
    const { t } = useTranslation();

	return (
		<section className={c.homeIntro} {...props}>
			<div className="container">
                <div className={c.homeIntro_inner}>
                    <div className={c.info}>
                        <h1 className={c.title}>{t("home.introTitle")}</h1>
                        <p className={c.description}>
                            {t("home.introDescription")}
                        </p>
                        <StylizedLink className={c.link} href="/auth" aria-label={t("ariaLabel.goToAuth")}>
                            {t("home.introButton")}
                        </StylizedLink>
                    </div>
                    <div className={c.img_wrapper}>
                        <img
                            width="149"
                            height="229"
                            loading="lazy"
                            decoding="async"
                            src={imgIntro}
                            alt={t("home.introImgAlt")}
                            className={c.img}
                        />
                    </div>
                </div>
            </div>
		</section>
	)
}
