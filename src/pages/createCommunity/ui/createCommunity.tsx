import { Layout } from "widgets/layout";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { createUser, getUserByUUID, selectUserInfo, type UserType } from "entities/user";
import { CreateCommunityWidget } from "widgets/createCommunityWidget";
import { useEffect, useMemo, useState } from "react";
import { getCommunity, type CommunityType } from "entities/community";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import axios from "axios";
import type { AppError } from "shared/lib/types";
import { showToast } from "features/toast";

/**
 * Страница создания или редактирования сообщества.
 *
 * Если в адресе передан параметр `community`, страница переходит в режим
 * редактирования: загружает данные сообщества и предзаполняет ими форму.
 */
export const CreateCommunity = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);
    const [communityInfo, setCommunityInfo] = useState<Partial<CommunityType>>({});

    const { data, error } = useQuery({
        queryKey: [`user ${userInfo.UUID}`],
        queryFn: () => getUserByUUID(userInfo.UUID),
        enabled: !!userInfo.UUID
    });

    const user = createUser({
        UUID: userInfo.UUID,
        albumList: [],
        avatarUrl: data?.data.avatarUrl || "",
        createdAt: data?.data.createdAt || "",
        description: data?.data.description || "",
        isAuthenticated: true,
        isBlocked: false,
        title: data?.data.name || "",
        onlineStatus: "ONLINE",
        role: userInfo.role,
        subscribersCount: data?.data.subscribersCount || 0,
        subscribesCount: data?.data.subscribesCount || 0,
        trustStatus: "TRUST",
        username: data?.data.username || "",
        worksCount: data?.data.worksCount || 0
    });

    const [searchParams, _setSearchParams] = useSearchParams();

    const loadedCommunity = useQuery({
        queryKey: [`community ${searchParams.get("community")}`],
        queryFn: () => getCommunity(searchParams.get("community") || ""),
        enabled: !!searchParams.get("community")
    });

    const [createNewCommunity, setCreateNewCommunity] = useState<boolean>(true);
    const [originalAdmins, setOriginalAdmins] = useState<UserType[]>([]);

    const originalTags = useMemo(
        () => loadedCommunity.data?.data.tags ?? [],
        [loadedCommunity.data]
    );

    useEffect(() => {
        if (!error) return;

        if (axios.isAxiosError<AppError>(error)) {
            if (!error.response) {
                dispatch(showToast({ message: "api.networkError", type: "error" }));
                return;
            }
            if (error.response.status === 404) {
                dispatch(
                    showToast({ message: "api.principalUserNotFound", type: "error" })
                );
                return;
            }
            dispatch(showToast({ message: "api.serverError", type: "error" }));
        } else {
            console.error(error);
        }
    }, [error, dispatch]);

    useEffect(() => {
        if (!loadedCommunity.data) return;

        const community = loadedCommunity.data.data;

        setCommunityInfo({
            UUID: community.uuid,
            title: community.name,
            username: community.username,
            description: community.description,
            imageUrl: community.avatarUrl
        });

        const admins = community.admins.map(admin =>
            createUser({
                UUID: admin.uuid,
                title: admin.name,
                username: admin.username,
                description: admin.description,
                worksCount: admin.worksCount,
                subscribersCount: admin.subscribersCount,
                subscribesCount: admin.subscribesCount,
                albumList: [],
                createdAt: admin.createdAt,
                trustStatus: admin.trustStatus,
                isAuthenticated: false,
                isBlocked: false,
                onlineStatus: admin.onlineStatus,
                role: "USER",
                avatarUrl: admin.avatarUrl
            })
        );
        setOriginalAdmins(admins);
        setCreateNewCommunity(false);
    }, [loadedCommunity.data]);

    useEffect(() => {
        if (!loadedCommunity.error) return;

        if (axios.isAxiosError<AppError>(loadedCommunity.error)) {
            if (!loadedCommunity.error.response) {
                dispatch(showToast({ message: "api.networkError", type: "error" }));
                return;
            }
            if (loadedCommunity.error.response.status === 404) {
                dispatch(showToast({ message: "api.communityNotFound", type: "error" }));
                return;
            }
            dispatch(showToast({ message: "api.serverError", type: "error" }));
        } else {
            console.error(loadedCommunity.error);
        }
    }, [loadedCommunity.error, dispatch]);

    return (
        <Layout isSmallTitle={true}>
            <title>{t("titles.communityCreate")}</title>
            <meta name="description" content={t("description.communityCreate")} />
            <meta property="og:title" content={t("titles.communityCreate")} />
            <meta property="og:description" content={t("description.communityCreate")} />
            <CreateCommunityWidget
                communityInfo={communityInfo}
                setCommunityInfo={setCommunityInfo}
                userInfo={user}
                isCreateNewCommunity={createNewCommunity}
                communityUUID={communityInfo.UUID || ""}
                originalTitle={loadedCommunity.data?.data.name ?? ""}
                originalDescription={loadedCommunity.data?.data.description ?? ""}
                originalUsername={loadedCommunity.data?.data.username ?? ""}
                originalTags={originalTags}
                originalAdmins={originalAdmins}
            />
        </Layout>
    );
};
