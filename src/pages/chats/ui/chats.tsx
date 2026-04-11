import c from "./chats.module.scss";
import {Layout} from "widgets/layout";
import {ChatsList} from "widgets/chatsList";
import {chatsMock} from "entities/chat";
import {Navigation} from "widgets/navigation";
import {profileUserMock} from "entities/user";
import {useWindowWidth} from "shared/hooks/useWindowWidth";
import {useTranslation} from "react-i18next";

export const Chats = () => {
    const { t } = useTranslation();

    const windowWidth = useWindowWidth();

	return (
		<Layout>
            <title>{t("titles.chats")}</title>
            <meta name="description" content={t("description.chats")} />
            <div className="container">
                <div className={c.main}>
                    {windowWidth >= 1200 &&
                        <Navigation role={profileUserMock.role} ULID={profileUserMock.ULID} />
                    }
                    <div className={c.content}>
                        <ChatsList chatsList={chatsMock} />
                    </div>
                </div>
            </div>
		</Layout>
	)
}
