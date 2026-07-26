import { Layout } from "widgets/layout";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { createUser, getUserByUUID, selectUserInfo } from "entities/user";
import { CreateCommunityWidget } from "widgets/createCommunityWidget";
import { useEffect, useState } from "react";
import { type CommunityType } from "entities/community";
import { communityTagsMock } from "entities/tag";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { AppError } from "shared/lib/types";
import { showToast } from "features/toast";

/**
 * Страница создания нового сообщества.
 *
 * Состояние формируемого сообщества хранится локально и обновляется при предпросмотре.
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

    return (
        <Layout isSmallTitle={true}>
            <title>{t("titles.communityCreate")}</title>
            <meta name="description" content={t("description.communityCreate")} />
            <meta property="og:title" content={t("titles.communityCreate")} />
            <meta property="og:description" content={t("description.communityCreate")} />
            <CreateCommunityWidget
                tagsList={communityTagsMock}
                communityInfo={communityInfo}
                setCommunityInfo={setCommunityInfo}
                userInfo={user}
            />
        </Layout>
    );
};
