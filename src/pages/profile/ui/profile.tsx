import c from "./profile.module.scss";
import {Layout} from "widgets/layout";
import {ProfileInfo} from "widgets/profileInfo";
import {useTranslation} from "react-i18next";
import {principalUserMock, profileUserMock} from "entities/user";
import {AlbumSlider} from "widgets/albumSlider";
import {profileAlbumsMock} from "entities/album";
import {Navigation} from "widgets/navigation";
import {useWindowWidth} from "shared/hooks/useWindowWidth";
import {useMemo, useState} from "react";
import {PostList} from "widgets/postList";

export const Profile = () => {
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
		<Layout>
            <title>{t("titles.profile")}</title>
            <meta name="description" content={t("description.profile")} />
            <div className="container">
                <div className={c.main}>
                    {windowWidth >= 1200 &&
                        <Navigation role={profileUserMock.role} ULID={profileUserMock.ULID} />
                    }
                    <div className={c.content}>
                        <ProfileInfo userInfo={principalUserMock} />
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
