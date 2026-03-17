import {Layout} from "widgets/layout";
import {AgreementText} from "widgets/agreementText";
import {useTranslation} from "react-i18next";

export const Agreement = () => {
    const { t } = useTranslation();

	return (
		<Layout>
            <title>{t("titles.agreement")}</title>
            <meta name="description" content={t("description.agreement")} />
            <AgreementText />
		</Layout>
	)
}
