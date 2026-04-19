import {Layout} from "widgets/layout";
import c from "./communities.module.scss";
import {Navigation} from "widgets/navigation";
import {profileUserMock} from "entities/user";
import {useTranslation} from "react-i18next";
import {useWindowWidth} from "shared/hooks/useWindowWidth";
import {CommunitiesLists} from "widgets/communitiesLists";
import {communitiesAllMock, communitiesMyMock} from "entities/community";

/** Страница списка сообществ */
export const Communities = () => {
    const { t } = useTranslation();

    const windowWidth = useWindowWidth();

	return (
		<Layout isSmallTitle={true}>
            <title>{t("titles.communities")}</title>
            <meta name="description" content={t("description.communities")} />
            <div className="container">
                <div className={c.main}>
                    {windowWidth >= 1200 &&
                        <Navigation role={profileUserMock.role} ULID={profileUserMock.ULID} />
                    }
                    <div className={c.content}>
                        <CommunitiesLists
                            communitiesListMy={communitiesMyMock}
                            communitiesListAll={communitiesAllMock}
                        />
                    </div>
                </div>
            </div>
		</Layout>
	)
}
