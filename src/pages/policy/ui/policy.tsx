import {Layout} from "widgets/layout";
import {PolicyText} from "widgets/policyText";
import {useTranslation} from "react-i18next";

export const Policy = () => {
    const { t } = useTranslation();

	return (
		<Layout>
            <title>{t("titles.policy")}</title>
            <meta name="description" content={t("description.policy")} />
            <PolicyText />
		</Layout>
	)
}
