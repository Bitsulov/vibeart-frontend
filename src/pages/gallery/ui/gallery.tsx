import {Layout} from "widgets/layout";
import c from "./gallery.module.scss";
import {useTranslation} from "react-i18next";
import {Navigation} from "widgets/navigation";
import {profileUserMock} from "entities/user";
import {useWindowWidth} from "shared/hooks/useWindowWidth";
import {GalleryPostList} from "widgets/galleryPostList";
import {galleryPostsMock} from "entities/post";

export const Gallery = () => {
    const { t } = useTranslation();

    const windowWidth = useWindowWidth();

	return (
		<Layout>
            <title>{t("titles.gallery")}</title>
            <meta name="description" content={t("description.gallery")} />
            <div className="container">
                <div className={c.main}>
                    {windowWidth >= 1200 &&
                        <Navigation role={profileUserMock.role} ULID={profileUserMock.ULID} />
                    }
                    <div className={c.content}>
                        <GalleryPostList postList={galleryPostsMock} />
                    </div>
                </div>
            </div>
		</Layout>
	)
}
