import { Layout } from "widgets/layout";
import c from "./gallery.module.scss";
import { useTranslation } from "react-i18next";
import { Navigation } from "widgets/navigation";
import { selectUserInfo } from "entities/user";
import { useMediaQuery } from "shared/hooks/useMediaQuery";
import { GalleryPostList } from "widgets/galleryPostList";
import { galleryPostsMock } from "entities/post";
import { useSelector } from "react-redux";

/** Страница галереи со списком постов и навигацией. */
export const Gallery = () => {
    const { t } = useTranslation();

    const isDesktop = useMediaQuery("(width >= 1200px)");
    const userInfo = useSelector(selectUserInfo);

    return (
        <Layout>
            <title>{t("titles.gallery")}</title>
            <meta name="description" content={t("description.gallery")} />
            <meta property="og:title" content={t("titles.gallery")} />
            <meta property="og:description" content={t("description.gallery")} />
            <div className="container">
                <div className={c.main}>
                    {isDesktop && (
                        <Navigation role={userInfo.role} UUID={userInfo.UUID} />
                    )}
                    <div className={c.content}>
                        <GalleryPostList postList={galleryPostsMock} />
                    </div>
                </div>
            </div>
        </Layout>
    );
};
