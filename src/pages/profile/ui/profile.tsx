import c from "./profile.module.scss";
import { Layout } from "widgets/layout";
import { ProfileInfo } from "widgets/profileInfo";
import { useTranslation } from "react-i18next";
import { createUser, getUserByUUID, selectUserInfo } from "entities/user";
import { AlbumSlider } from "widgets/albumSlider";
import { profileAlbumsMock } from "entities/album";
import { Navigation } from "widgets/navigation";
import { useWindowWidth } from "shared/hooks/useWindowWidth";
import { useEffect, useMemo, useState } from "react";
import { PostList } from "widgets/postList";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import axios from "axios";
import type { AppError } from "shared/lib/types";
import { showToast } from "features/toast";
import { useNavigate } from "react-router-dom";

/**
 * Страница профиля пользователя с информационным блоком, слайдером альбомов и списком публикаций.
 *
 * Выбранный в {@link AlbumSlider} альбом определяет, публикации какого альбома отображаются
 * в {@link PostList}. Специальное значение `"all"` соответствует всем публикациям пользователя.
 */
export const Profile = () => {
    const { uuid } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const windowWidth = useWindowWidth();
    const userInfo = useSelector(selectUserInfo);

    const [selectedAlbum, setSelectedAlbum] = useState<string>("all");
    const pages = 12;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pagesDelta, setPagesDelta] = useState<number>(2);

    const currentAlbum = useMemo(
        () => profileAlbumsMock.find(album => album.UUID === selectedAlbum),
        [selectedAlbum]
    );

    const UUID = uuid || "";

    const { data, error, isLoading } = useQuery({
        queryKey: [`user ${UUID}`],
        queryFn: () => getUserByUUID(UUID),
        enabled: !!UUID
    });

    const userData = createUser({
        UUID,
        title: data?.data.name || "",
        username: data?.data.username || "",
        description: data?.data.description || "",
        worksCount: data?.data.worksCount || 0,
        subscribersCount: data?.data.subscribersCount || 0,
        subscribesCount: data?.data.subscribesCount || 0,
        albumList: profileAlbumsMock,
        createdAt: data?.data.createdAt || new Date().toISOString(),
        trustStatus: data?.data.trustStatus || "TRUST",
        isAuthenticated: false,
        isBlocked: false,
        onlineStatus: data?.data.onlineStatus || "OFFLINE",
        role: "USER",
        avatarUrl: data?.data.avatarUrl || ""
    });

    useEffect(() => {
        if (!error) return;

        if (axios.isAxiosError<AppError>(error)) {
            if (!error.response) {
                dispatch(showToast({ message: "api.networkError", type: "error" }));
                return;
            }
            if (error.response.status === 404) {
                dispatch(showToast({ message: "api.thisUserNotFound", type: "error" }));
                navigate("/unknown_page", { replace: true });
                return;
            }
            dispatch(showToast({ message: "api.serverError", type: "error" }));
        } else {
            console.error(error);
        }
    }, [error, dispatch, navigate]);

    return (
        <Layout>
            <title>{t("titles.profile")}</title>
            <meta name="description" content={t("description.profile")} />
            <meta property="og:title" content={t("titles.profile")} />
            <meta property="og:description" content={t("description.profile")} />
            <div className="container">
                <div className={c.main}>
                    {windowWidth >= 1200 && (
                        <Navigation role={userInfo.role} UUID={userInfo.UUID} />
                    )}
                    <div className={c.content}>
                        <ProfileInfo isLoadingData={isLoading} userInfo={userData} />
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
    );
};
