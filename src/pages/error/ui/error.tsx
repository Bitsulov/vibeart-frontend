import { Layout } from "widgets/layout";
import { ErrorInfo } from "widgets/errorInfo";
import { useTranslation } from "react-i18next";

/** Свойства компонента {@link Error}. */
interface ErrorProps {
    /** HTTP-код ошибки, передаётся в {@link ErrorInfo}. По умолчанию `404`. */
    errorCode?: number;
}

/** Страница ошибки. */
export const Error = ({ errorCode }: ErrorProps) => {
    const { t } = useTranslation();

    return (
        <Layout isShowFooter={false}>
            <title>{t("titles.error")}</title>
            <meta name="description" content={t("description.error")} />
            <meta property="og:title" content={t("titles.error")} />
            <meta property="og:description" content={t("description.error")} />
            <ErrorInfo errorCode={errorCode} />
        </Layout>
    );
};
