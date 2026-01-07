import classes from "./notifications.module.scss";
import { PageTitle } from "widgets/pageTitle";
import { NotificationsList } from "widgets/notificationsList";
import { Layout } from "widgets/layout";
import { noticesMock } from "entities/notification";
import { useLoadPageStatus } from "entities/pageStats";
import { useTranslation } from "react-i18next";

const Notifications = () => {
	const { t } = useTranslation();

    const isPageLoaded = useLoadPageStatus();

    return (
        <Layout pageStatus={isPageLoaded}>
            <main className={classes.notifications}>
                <PageTitle title={t("Notices")} />
                <NotificationsList noticesList={noticesMock} />
            </main>
        </Layout>
    );
};

export { Notifications };
