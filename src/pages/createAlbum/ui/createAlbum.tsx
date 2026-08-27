import c from "./createAlbum.module.scss";
import { Layout } from "widgets/layout";
import { useTranslation } from "react-i18next";
import { BackLink } from "features/backLink";
import { AlbumSlide } from "features/albumSlide";
import { useEffect, useState } from "react";
import { getAlbum, type AlbumType } from "entities/album";
import { CreateAlbumWidget } from "widgets/createAlbumWidget";
import { onSubmitForm } from "../model/onSubmitForm";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "entities/user";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import axios from "axios";
import type { AppError } from "shared/lib/types";
import { showToast } from "features/toast";

/**
 * Страница создания или редактирования альбома с живым предпросмотром обложки и формой заполнения данных.
 *
 * Если в адресе передан параметр `album`, страница переходит в режим
 * редактирования: загружает данные альбома и предзаполняет ими форму.
 * Если передан параметр `community`, альбом создаётся от имени
 * указанного сообщества, а не текущего пользователя.
 */
export const CreateAlbum = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const principalUser = useSelector(selectUser);

    const [albumInfo, setAlbumInfo] = useState<Partial<AlbumType>>({});

    const [selectedAlbum, setSelectedAlbum] = useState<string>("all");

    const [loadedFile, setLoadedFile] = useState<File>();
    const [isErrorImg, setIsErrorImg] = useState<boolean>(false);

    const [searchParams, _setSearchParams] = useSearchParams();

    const loadedAlbum = useQuery({
        queryKey: [`album ${searchParams.get("album")}`],
        queryFn: () => getAlbum(searchParams.get("album") || ""),
        enabled: !!searchParams.get("album")
    });

    const [createNewAlbum, setCreateNewAlbum] = useState<boolean>(true);
    const communityId = searchParams.get("community");

    useEffect(() => {
        if (loadedFile) {
            setIsErrorImg(false);
        }
    }, [loadedFile]);

    useEffect(() => {
        if (!loadedAlbum.data) return;

        const album = loadedAlbum.data.data;

        setAlbumInfo({
            UUID: album.uuid,
            name: album.title,
            description: album.description,
            postCount: album.worksCount,
            imageUrl: album.imageUrl,
            createdAt: album.createdAt
        });
        setCreateNewAlbum(false);
    }, [loadedAlbum.data]);

    useEffect(() => {
        if (!loadedAlbum.error) return;

        if (axios.isAxiosError<AppError>(loadedAlbum.error)) {
            if (!loadedAlbum.error.response) {
                dispatch(showToast({ message: "api.networkError", type: "error" }));
                return;
            }
            if (loadedAlbum.error.response.status === 404) {
                dispatch(showToast({ message: "api.albumNotFound", type: "error" }));
                return;
            }
            dispatch(showToast({ message: "api.serverError", type: "error" }));
        } else {
            console.error(loadedAlbum.error);
        }
    }, [loadedAlbum.error, dispatch]);

    return (
        <Layout>
            <title>{t("titles.albumCreate")}</title>
            <meta name="description" content={t("description.albumCreate")} />
            <meta property="og:title" content={t("titles.albumCreate")} />
            <meta property="og:description" content={t("description.albumCreate")} />
            <section className={c.content}>
                <div className="container">
                    <div className={c.content_inner}>
                        <BackLink className={c.back} />
                        <AlbumSlide
                            imageUrl={albumInfo.imageUrl ?? ""}
                            name={albumInfo.name ?? ""}
                            UUID={albumInfo.UUID ?? ""}
                            className={clsx(c.item, isErrorImg && c.error)}
                            selectedAlbum={selectedAlbum}
                            setSelectedAlbum={setSelectedAlbum}
                            animateName
                        />
                        <CreateAlbumWidget
                            className={c.form}
                            albumInfo={albumInfo}
                            setAlbumInfo={setAlbumInfo}
                            setLoadedFile={setLoadedFile}
                            loadedFile={loadedFile}
                            albumName={loadedAlbum.data?.data.title ?? ""}
                            albumDescription={loadedAlbum.data?.data.description ?? ""}
                            isCreateNewAlbum={createNewAlbum}
                            UUID={communityId || principalUser.UUID}
                            onSubmit={() => onSubmitForm(loadedFile, setIsErrorImg)}
                        />
                    </div>
                </div>
            </section>
        </Layout>
    );
};
