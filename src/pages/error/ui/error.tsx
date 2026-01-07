import classes from "./error.module.scss";
import { useGetErrorCode } from "../hooks/useGetErrorCode";
import { getErrorMessage } from "../lib/getErrorMessage";
import { Layout } from "widgets/layout";
import { ErrorInfo } from "widgets/errorInfo";
import { useLoadPageStatus } from "entities/pageStats";
import { useTranslation } from "react-i18next";

const Error = () => {
	const { t } = useTranslation();

    const isPageLoaded = useLoadPageStatus();
    const status = useGetErrorCode();
    const message = t(`errorCodes.${getErrorMessage(+status)}`);

    return (
        <Layout pageStatus={isPageLoaded}>
            <main className={classes.error}>
                <ErrorInfo status={+status} message={message} />
            </main>
        </Layout>
    );
};

export { Error };
