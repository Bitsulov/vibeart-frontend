import c from "./policyText.module.scss";
import {useTranslation} from "react-i18next";

/** Текст политики конфиденциальности в виде структурированного списка. */
export const PolicyText = ({ ...props }) => {
    const { t } = useTranslation();

	return (
		<section className={c.policy_text} {...props}>
            <div className="container">
                <h1 className={c.title}>{t("policy.title")}</h1>
                <p className={`${c.paragraph} ${c.bold}`}>{t("policy.subtitle")}</p>
                <p className={`${c.paragraph} ${c.bold}`}>{t("policy.number")}</p>
                <ol className={c.list}>
                    <li className={c.subtitle}>{t("policy.title1")}
                        <ol className={c.list}>
                            <li className={c.list_item}>{t("policy.text1_1")}</li>
                            <li className={c.list_item}>{t("policy.text1_2")}</li>
                            <li className={c.list_item}>{t("policy.text1_3")}</li>
                            <li className={c.list_item}>{t("policy.text1_4")}</li>
                        </ol>
                    </li>
                    <li className={c.subtitle}>{t("policy.title2")}
                        <ol className={c.list}>
                            <li className={c.list_item}>{t("policy.text2_1")}</li>
                            <li className={c.list_item}>{t("policy.text2_2")}</li>
                            <li className={c.list_item}>{t("policy.text2_3")}</li>
                            <li className={c.list_item}>{t("policy.text2_4")}</li>
                            <li className={c.list_item}>{t("policy.text2_5")}</li>
                            <li className={c.list_item}>{t("policy.text2_6")}</li>
                            <li className={c.list_item}>{t("policy.text2_7")}</li>
                            <li className={c.list_item}>{t("policy.text2_8")}</li>
                            <li className={c.list_item}>{t("policy.text2_9")}</li>
                            <li className={c.list_item}>{t("policy.text2_10")}</li>
                            <li className={c.list_item}>{t("policy.text2_11")}</li>
                            <li className={c.list_item}>{t("policy.text2_12")}</li>
                            <li className={c.list_item}>{t("policy.text2_13")}</li>
                        </ol>
                    </li>
                    <li className={c.subtitle}>{t("policy.title3")}
                        <ol className={c.list}>
                            <li className={c.list_item}>{t("policy.text3_1")}
                                <ul className={c.list_ul}>
                                    <li className={c.list_item_ul}>{t("policy.text3_1_1")}</li>
                                    <li className={c.list_item_ul}>{t("policy.text3_1_2")}</li>
                                    <li className={c.list_item_ul}>{t("policy.text3_1_3")}</li>
                                </ul>
                            </li>
                            <li className={c.list_item}>{t("policy.text3_2")}</li>
                            <li className={c.list_item}>{t("policy.text3_3")}</li>
                        </ol>
                    </li>
                    <li className={c.subtitle}>{t("policy.title4")}
                        <ol className={c.list}>
                            <li className={c.list_item}>{t("policy.text4_1")}</li>
                            <li className={c.list_item}>{t("policy.text4_2")}
                                <ul className={c.list_ul}>
                                    <li className={c.list_item_ul}>{t("policy.text4_2_1")}</li>
                                    <li className={c.list_item_ul}>{t("policy.text4_2_2")}</li>
                                    <li className={c.list_item_ul}>{t("policy.text4_2_2")}</li>
                                    <li className={c.list_item_ul}>{t("policy.text4_2_3")}</li>
                                </ul>
                            </li>
                            <li className={c.list_item}>{t("policy.text4_3")}
                                <ul className={c.list_ul}>
                                    <li className={c.list_item_ul}>{t("policy.text4_3_1")}</li>
                                    <li className={c.list_item_ul}>{t("policy.text4_3_2")}</li>
                                    <li className={c.list_item_ul}>{t("policy.text4_3_3")}</li>
                                </ul>
                            </li>
                            <li className={c.list_item}>{t("policy.text4_4")}
                                <ul className={c.list_ul}>
                                    <li className={c.list_item_ul}>{t("policy.text4_4_1")}</li>
                                    <li className={c.list_item_ul}>{t("policy.text4_4_2")}</li>
                                    <li className={c.list_item_ul}>{t("policy.text4_4_3")}</li>
                                </ul>
                            </li>
                            <li className={c.list_item}>{t("policy.text4_5")}</li>
                            <li className={c.list_item}>{t("policy.text4_6")}</li>
                        </ol>
                    </li>
                    <li className={c.subtitle}>{t("policy.title5")}
                        <ol className={c.list}>
                            <li className={c.list_item}>{t("policy.text5_1")}</li>
                            <li className={c.list_item}>{t("policy.text5_2")}</li>
                            <li className={c.list_item}>{t("policy.text5_3")}</li>
                        </ol>
                    </li>
                </ol>
            </div>
		</section>
	)
}
