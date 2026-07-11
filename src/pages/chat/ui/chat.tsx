import { Layout } from "widgets/layout";
import { useTranslation } from "react-i18next";
import { ChatWindow } from "widgets/chatWindow";
import { profileUserMock, selectUserInfo } from "entities/user";
import { messagesMock } from "entities/message";
import c from "./chat.module.scss";
import { Navigation } from "widgets/navigation";
import { useWindowWidth } from "shared/hooks/useWindowWidth";
import { useSelector } from "react-redux";

/** Страница чата с навигацией и окном переписки. */
export const Chat = () => {
    const { t } = useTranslation();

    const windowWidth = useWindowWidth();
    const userInfo = useSelector(selectUserInfo);

    return (
        <Layout isShowFooter={false}>
            <title>{t("titles.chat")}</title>
            <meta name="description" content={t("description.chat")} />
            <meta property="og:title" content={t("titles.chat")} />
            <meta property="og:description" content={t("description.chat")} />
            <div className="container">
                <div className={c.main}>
                    {windowWidth >= 1200 && (
                        <Navigation role={userInfo.role} UUID={userInfo.UUID} />
                    )}
                    <ChatWindow
                        messages={messagesMock}
                        name={profileUserMock.name}
                        UUID={profileUserMock.UUID}
                        avatarUrl={profileUserMock.avatarUrl}
                        onlineStatus={profileUserMock.onlineStatus}
                    />
                </div>
            </div>
        </Layout>
    );
};
