import {Layout} from "widgets/layout";
import {AlbumCard} from "widgets/albumCard";
import {principalUserMock, selectUserInfo} from "entities/user";
import {useSelector} from "react-redux";
import {albumMock} from "entities/album";
import {useTranslation} from "react-i18next";

export const Album = () => {
    const { t } = useTranslation();
    const userInfo = useSelector(selectUserInfo);

	return (
		<Layout>
            <title>{t("titles.album")}</title>
            <meta name="description" content={t("description.album")} />
            <AlbumCard
                isOwner={principalUserMock.id === userInfo.id}
                ULID={albumMock.ULID}
                authorULID={principalUserMock.ULID}
                title={albumMock.name}
                imageUrl={albumMock.imageUrl}
                description={albumMock.description}
                worksCount={albumMock.postCount}
                postList={albumMock.postsList}
                date={albumMock.createdAt}
            />
		</Layout>
	)
}
