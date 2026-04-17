import {Layout} from "widgets/layout";
import {useTranslation} from "react-i18next";
import {ChatWindow} from "widgets/chatWindow";
import {profileUserMock} from "entities/user";
import {messagesMock} from "entities/message";
import c from "./chat.module.scss";
import {Navigation} from "widgets/navigation";
import {useWindowWidth} from "shared/hooks/useWindowWidth";

/** Страница чата с навигацией и окном переписки. */
export const Chat = () => {
    const { t } = useTranslation();

    const windowWidth = useWindowWidth();

	return (
		<Layout isShowFooter={false}>
            <title>{t("titles.chat")}</title>
            <meta name="description" content={t("description.chat")} />
            <div className="container">
                <div className={c.main}>
                    {windowWidth >= 1200 &&
                        <Navigation role={profileUserMock.role} ULID={profileUserMock.ULID} />
                    }
                    <ChatWindow
                        messages={messagesMock}
                        name={profileUserMock.name}
                        ULID={profileUserMock.ULID}
                        avatarUrl={profileUserMock.avatarUrl}
                        onlineStatus={profileUserMock.onlineStatus}
                    />
                </div>
            </div>
		</Layout>
	)
}
