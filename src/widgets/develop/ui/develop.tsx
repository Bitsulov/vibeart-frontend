import c from "./develop.module.scss";
import {useTranslation} from "react-i18next";
import {StylizedLink} from "features/stylizedLink";
import {StylizedButton} from "features/stylizedButton";
import {useNavigate} from "react-router-dom";
import {returnBackHandler} from "../model/returnBackHandler";

/** Заглушка для страниц в разработке с кнопкой «назад» и ссылкой на главную. */
export const Develop = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

	return (
		<section className={c.develop}>
			<div className="container">
                <div className={c.develop_inner}>
                    <h1 className={c.title}>{t("develop.title")}</h1>
                    <div className={c.buttons}>
                        <StylizedButton
                            ariaLabel={t("ariaLabel.goBack")}
                            onClick={() => returnBackHandler(navigate)}
                            className={c.button}
                        >
                            {t("develop.back")}
                        </StylizedButton>
                        <StylizedLink
                            ariaLabel={t("ariaLabel.goToHome")}
                            href="/"
                            className={c.button}
                        >
                            {t("develop.returnToHome")}
                        </StylizedLink>
                    </div>
                </div>
            </div>
		</section>
	)
}
