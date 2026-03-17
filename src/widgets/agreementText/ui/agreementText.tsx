import c from "./agreementText.module.scss";
import {useTranslation} from "react-i18next";

export const AgreementText = ({ ...props }) => {
    const { t } = useTranslation();

	return (
		<section className={c.agreement_text} {...props}>
            <div className="container">
                <h1 className={c.title}>{t("agreement.title")}</h1>
                <p className={`${c.paragraph} ${c.bold}`}>{t("agreement.number")}</p>
                <p className={c.paragraph}>
                    {t("agreement.subtitle")}
                </p>
                <ol className={c.list}>
                    <li className={c.subtitle}>{t("agreement.title1")}
                        <ol className={c.list}>
                            <li className={c.list_item}>{t("agreement.text1_1")}</li>
                            <li className={c.list_item}>{t("agreement.text1_2")}</li>
                            <li className={c.list_item}>{t("agreement.text1_3")}</li>
                            <li className={c.list_item}>{t("agreement.text1_4")}</li>
                        </ol>
                    </li>
                    <li className={c.subtitle}>{t("agreement.title2")}
                        <ol className={c.list}>
                            <li className={c.list_item}>{t("agreement.text2_1")}</li>
                            <li className={c.list_item}>{t("agreement.text2_2")}</li>
                        </ol>
                    </li>
                    <li className={c.subtitle}>{t("agreement.title3")}
                        <ol className={c.list}>
                            <li className={c.list_item}>{t("agreement.text3_1")}</li>
                            <li className={c.list_item}>{t("agreement.text3_2")}
                                <ol className={c.list}>
                                    <li className={c.list_item}>{t("agreement.text3_2_1")}</li>
                                    <li className={c.list_item}>{t("agreement.text3_2_2")}</li>
                                </ol>
                            </li>
                            <li className={c.list_item}>{t("agreement.title3_3")}
                                <ol className={c.list}>
                                    <li className={c.list_item}>{t("agreement.text3_3_1")}</li>
                                    <li className={c.list_item}>{t("agreement.text3_3_2")}</li>
                                </ol>
                            </li>
                            <li className={c.list_item}>{t("agreement.title3_4")}
                                <ol className={c.list}>
                                    <li className={c.list_item}>{t("agreement.text3_4_1")}</li>
                                </ol>
                            </li>
                            <li className={c.list_item}>{t("agreement.text3_5")}</li>
                            <li className={c.list_item}>{t("agreement.text3_6")}</li>
                        </ol>
                    </li>
                    <li className={c.subtitle}>{t("agreement.title4")}
                        <ol className={c.list}>
                            <li className={c.list_item}>{t("agreement.text4_1")}</li>
                            <li className={c.list_item}>{t("agreement.text4_2")}</li>
                            <li className={c.list_item}>{t("agreement.text4_3")}</li>
                            <li className={c.list_item}>{t("agreement.text4_4")}</li>
                        </ol>
                    </li>
                    <li className={c.subtitle}>{t("agreement.title5")}
                        <ol className={c.list}>
                            <li className={c.list_item}>{t("agreement.text5_1")}</li>
                            <li className={c.list_item}>{t("agreement.text5_2")}</li>
                            <li className={c.list_item}>{t("agreement.text5_3")}</li>
                            <li className={c.list_item}>{t("agreement.text5_4")}</li>
                            <li className={c.list_item}>{t("agreement.text5_5")}</li>
                            <li className={c.list_item}>{t("agreement.text5_6")}
                                <ul className={c.list_ul}>
                                    <li className={c.list_item_ul}>{t("agreement.text5_6_1")}</li>
                                    <li className={c.list_item_ul}>{t("agreement.text5_6_2")}</li>
                                    <li className={c.list_item_ul}>{t("agreement.text5_6_3")}</li>
                                </ul>
                            </li>
                            <li className={c.list_item}>{t("agreement.text5_7")}</li>
                            <li className={c.list_item}>{t("agreement.text5_8")}</li>
                        </ol>
                    </li>
                    <li className={c.subtitle}>{t("agreement.title6")}
                        <ol className={c.list}>
                            <li className={c.list_item}>{t("agreement.text6_1")}</li>
                            <li className={c.list_item}>{t("agreement.text6_2")}</li>
                            <li className={c.list_item}>{t("agreement.text6_3")}</li>
                            <li className={c.list_item}>{t("agreement.text6_4")}</li>
                        </ol>
                    </li>
                    <li className={c.subtitle}>{t("agreement.title7")}
                        <ol className={c.list}>
                            <li className={c.list_item}>{t("agreement.text7_1")}</li>
                            <li className={c.list_item}>{t("agreement.text7_2")}</li>
                            <li className={c.list_item}>{t("agreement.text7_3")}</li>
                        </ol>
                    </li>
                    <h2 className={c.credits}>{t("agreement.title8")}</h2>
                    <p className={c.text}>{t("agreement.text8_1")}</p>
                    <p className={c.text}>{t("agreement.text8_2")}</p>
                </ol>
            </div>
		</section>
	)
}
