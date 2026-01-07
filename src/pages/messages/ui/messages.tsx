import classes from "./messages.module.scss";
import { Layout } from "widgets/layout";
import { ChatList } from "widgets/chatList";
import { PageTitle } from "widgets/pageTitle";
import { chatsMock } from "entities/chats";
import { useLoadPageStatus } from "entities/pageStats";
import { useTranslation } from "react-i18next";

const Messages = () => {
	const { t } = useTranslation();
    const isPageLoaded = useLoadPageStatus();

    return (
        <Layout pageStatus={isPageLoaded}>
            <main className={classes.messages}>
                <PageTitle title={t("Messages")} />
                <ChatList list={chatsMock} />
            </main>
        </Layout>
    );
};

export { Messages };
