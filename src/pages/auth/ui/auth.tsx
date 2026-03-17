import {Layout} from "widgets/layout";
import {AuthForm} from "widgets/authForm";
import {useTranslation} from "react-i18next";

export const Auth = () => {
    const { t } = useTranslation();

	return (
		<Layout isShowFooter={false}>
            <title>{t("titles.auth")}</title>
            <meta name="description" content={t("description.auth")} />
            <AuthForm />
		</Layout>
	)
}
