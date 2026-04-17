import c from "./homeSteps.module.scss";
import {useTranslation} from "react-i18next";
import step1Img from "shared/icons/img-boxes.png";
import step2Img from "shared/icons/img-messages.png";
import step3Img from "shared/icons/img-pallete.png";

/** Секция шагов на главной странице с тремя карточками-шагами. */
export const HomeSteps = ({ ...props }) => {
    const { t } = useTranslation();

	return (
		<section className={c.steps} {...props}>
			<div className="container">
                <div className={c.steps_inner}>
                    <h2 className={c.title}>{t("home.stepsTitle")}</h2>
                    <div className={c.steps_list}>
                        <div className={`${c.step} ${c.step1}`}>
                            <div className={c.step_text}>
                                <h3 className={c.step_title}>{t("home.step1Title")}</h3>
                                <p className={c.step_description}>{t("home.step1Description")}</p>
                            </div>
                            <div className={c.step_img_wrapper}>
                                <img
                                    width="150"
                                    height="150"
                                    loading="lazy"
                                    decoding="async"
                                    src={step1Img}
                                    alt={t("home.step1AltImg")}
                                    className={c.step_img}
                                />
                            </div>
                        </div>
                        <div className={`${c.step} ${c.step2}`}>
                            <div className={c.step_text}>
                                <h3 className={c.step_title}>{t("home.step2Title")}</h3>
                                <p className={c.step_description}>{t("home.step2Description")}</p>
                            </div>
                            <div className={c.step_img_wrapper}>
                                <img
                                    width="150"
                                    height="150"
                                    loading="lazy"
                                    decoding="async"
                                    src={step2Img}
                                    alt={t("home.step2AltImg")}
                                    className={c.step_img}
                                />
                            </div>
                        </div>
                        <div className={`${c.step} ${c.step3}`}>
                            <div className={c.step_text}>
                                <h3 className={c.step_title}>{t("home.step3Title")}</h3>
                                <p className={c.step_description}>{t("home.step3Description")}</p>
                            </div>
                            <div className={c.step_img_wrapper}>
                                <img
                                    width="150"
                                    height="150"
                                    loading="lazy"
                                    decoding="async"
                                    src={step3Img}
                                    alt={t("home.step3AltImg")}
                                    className={c.step_img}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</section>
	)
}
