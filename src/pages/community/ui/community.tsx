import {Layout} from "widgets/layout";
import c from "./community.module.scss";
import {Navigation} from "widgets/navigation";
import {profileUserMock} from "entities/user";
import {useTranslation} from "react-i18next";
import {useWindowWidth} from "shared/hooks/useWindowWidth";
import {AlbumSlider} from "widgets/albumSlider";
import {profileAlbumsMock} from "entities/album";
import {PostList} from "widgets/postList";
import {useMemo, useState} from "react";
import {CommunityInfo} from "widgets/communityInfo";
import {communityMock} from "entities/community";

/** Страница сообщества */
export const Community = () => {
    const { t } = useTranslation();
    const windowWidth = useWindowWidth();

    const [selectedAlbum, setSelectedAlbum] = useState<string>("all");
    const pages = 12;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pagesDelta, setPagesDelta] = useState<number>(2);

    const currentAlbum = useMemo(
        () => profileAlbumsMock.find(album => album.ULID === selectedAlbum),
        [selectedAlbum]
    );

	return (
        <Layout isSmallTitle={true}>
            <title>{t("titles.community")}</title>
            <meta name="description" content={t("description.community")} />
            <div className="container">
                <div className={c.main}>
                    {windowWidth >= 1200 &&
                        <Navigation role={profileUserMock.role} ULID={profileUserMock.ULID} />
                    }
                    <div className={c.content}>
                        <CommunityInfo communityInfo={communityMock} />
                        <AlbumSlider
                            selectedAlbum={selectedAlbum}
                            setSelectedAlbum={setSelectedAlbum}
                            albumsList={profileAlbumsMock}
                        />
                        <PostList
                            title={currentAlbum?.name}
                            postList={currentAlbum?.postsList}
                            pagesCount={pages}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            pagesDelta={pagesDelta}
                            setPagesDelta={setPagesDelta}
                        />
                    </div>
                </div>
            </div>
        </Layout>
	)
}
