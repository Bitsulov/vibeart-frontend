import c from "./chats.module.scss";
import { Layout } from "widgets/layout";
import { ChatsList } from "widgets/chatsList";
import { chatsMock } from "entities/chat";
import { Navigation } from "widgets/navigation";
import { selectUserInfo } from "entities/user";
import { useWindowWidth } from "shared/hooks/useWindowWidth";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

/** Страница списка чатов. */
export const Chats = () => {
    const { t } = useTranslation();

    const windowWidth = useWindowWidth();
    const userInfo = useSelector(selectUserInfo);

    return (
        <Layout>
            <title>{t("titles.chats")}</title>
            <meta name="description" content={t("description.chats")} />
            <meta property="og:title" content={t("titles.chats")} />
            <meta property="og:description" content={t("description.chats")} />
            <div className="container">
                <div className={c.main}>
                    {windowWidth >= 1200 && (
                        <Navigation role={userInfo.role} UUID={userInfo.UUID} />
                    )}
                    <div className={c.content}>
                        <ChatsList chatsList={chatsMock} />
                    </div>
                </div>
            </div>
        </Layout>
    );
};
