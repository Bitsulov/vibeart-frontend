import { Layout } from "widgets/layout";
import { AlbumCard } from "widgets/albumCard";
import { selectUserInfo } from "entities/user";
import { getAlbum } from "entities/album";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";
import type { AppError } from "shared/lib/types";
import { showToast } from "features/toast";

/** Страница альбома с карточкой альбома. */
export const Album = () => {
    const { t } = useTranslation();
    const userInfo = useSelector(selectUserInfo);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { uuid } = useParams();
    const albumUUID = uuid ?? "";

    const { data, error } = useQuery({
        queryKey: [`album ${albumUUID}`],
        queryFn: () => getAlbum(albumUUID)
    });

    useEffect(() => {
        if (!error) return;

        if (axios.isAxiosError<AppError>(error)) {
            if (!error.response) {
                dispatch(showToast({ message: "api.networkError", type: "error" }));
                return;
            }
            if (error.response.status === 404) {
                dispatch(showToast({ message: "api.albumNotFound", type: "error" }));
                navigate("/unknown_page", { replace: true });
                return;
            }
            dispatch(showToast({ message: "api.serverError", type: "error" }));
        } else {
            console.error(error);
        }
    }, [error, dispatch, navigate]);

    const album = data?.data;

    const isOwner =
        (album?.authorUser?.uuid === userInfo.UUID ||
            album?.authorCommunity?.owner.uuid === userInfo.UUID ||
            album?.authorCommunity?.admins.some(admin => admin.uuid === userInfo.UUID)) ??
        false;

    const authorUUID = album?.authorUser?.uuid ?? album?.authorCommunity?.uuid ?? "";
    const isCommunityAuthor = !!album?.authorCommunity;

    return (
        <Layout>
            <title>{t("titles.album")}</title>
            <meta name="description" content={t("description.album")} />
            <meta property="og:title" content={t("titles.album")} />
            <meta property="og:description" content={t("description.album")} />
            <AlbumCard
                isOwner={isOwner}
                UUID={album?.uuid ?? ""}
                authorUUID={authorUUID}
                isCommunityAuthor={isCommunityAuthor}
                title={album?.title ?? ""}
                imageUrl={album?.imageUrl ?? ""}
                description={album?.description ?? ""}
                worksCount={album?.worksCount ?? 0}
                date={album?.createdAt ?? ""}
            />
        </Layout>
    );
};
