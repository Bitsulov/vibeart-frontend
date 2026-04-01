import {Layout} from "widgets/layout";
import {RegisterForm} from "widgets/registerForm";
import {useTranslation} from "react-i18next";

export const Register = () => {
    const { t } = useTranslation();

	return (
        <Layout isShowFooter={false}>
            <title>{t("titles.register")}</title>
            <meta name="description" content={t("description.register")} />
            <RegisterForm />
        </Layout>
    )
}
