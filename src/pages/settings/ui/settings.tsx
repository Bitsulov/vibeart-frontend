import { Layout } from "widgets/layout";
import c from "./settings.module.scss";
import { Navigation } from "widgets/navigation";
import {
    deleteUserByUUID,
    getUserByUUID,
    selectUserInfo,
    type UserResponse,
    type UserType
} from "entities/user";
import { useTranslation } from "react-i18next";
import { useWindowWidth } from "shared/hooks/useWindowWidth";
import { SettingsForm } from "widgets/settingsForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { EmailChangeForm } from "widgets/emailChangeForm";
import { PasswordChangeForm } from "widgets/passwordChangeForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";
import type { AppError } from "shared/lib/types";
import { showToast } from "features/toast";
import { ConfirmModal } from "widgets/confirmModal";
import { StylizedButton } from "features/stylizedButton";
import { deleteUserButtonClickHandler } from "../model/deleteUserButtonClickHandler";
import { confirmDeleteUserHandler } from "../model/confirmDeleteUserHandler";
import { useNavigate } from "react-router-dom";
import { deleteUserSuccessHandler } from "../model/deleteUserSuccessHandler";
import { deleteUserErrorHandler } from "../model/deleteUserErrorHandler";

/**
 * Страница настроек профиля пользователя.
 *
 * Хранит локальное состояние `userState` — копию данных из Redux,
 * которую компонент {@link SettingsForm} обновляет при каждом изменении
 * поля формы для живого предпросмотра аватара, имени и описания.
 * Для первого заполнения полей производится запрос к серверу.
 *
 * На ширине экрана ≥ 1200 px отображается боковая {@link Navigation}.
 *
 * Включает три независимые формы:
 * - {@link SettingsForm} — редактирование аватара, имени, имени пользователя
 *   и описания профиля.
 * - {@link EmailChangeForm} — двухшаговая смена e-mail адреса: ввод нового
 *   адреса → ввод кода подтверждения из письма.
 * - {@link PasswordChangeForm} — двухшаговая смена пароля: ввод старого и
 *   нового паролей → ввод кода подтверждения из письма.
 */
export const Settings = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const windowWidth = useWindowWidth();
    const userInfo = useSelector(selectUserInfo);

    const { data, error } = useQuery({
        queryKey: [`user ${userInfo.UUID}`],
        queryFn: () => getUserByUUID(userInfo.UUID),
        enabled: !!userInfo.UUID
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

    const [userState, setUserState] = useState<Partial<UserType>>(data?.data || {});
    const currentUserInfo: UserResponse = useMemo(
        () =>
            data?.data || {
                uuid: "",
                name: "",
                description: "",
                username: "",
                worksCount: 0,
                subscribesCount: 0,
                subscribersCount: 0,
                createdAt: "",
                avatarUrl: "",
                enabled: true,
                trustStatus: "TRUST",
                onlineStatus: "ONLINE",
                subscribed: false
            },
        [data]
    );

    const [isShowModal, setIsShowModal] = useState<boolean>(false);

    const deleteUserMutation = useMutation({
        mutationFn: deleteUserByUUID,
        onSuccess: () => deleteUserSuccessHandler(navigate, dispatch, setIsShowModal),
        onError: (error: AxiosError<AppError>) => deleteUserErrorHandler(error, dispatch)
    });

    return (
        <Layout>
            <title>{t("titles.settings")}</title>
            <meta name="description" content={t("description.settings")} />
            <meta property="og:title" content={t("titles.settings")} />
            <meta property="og:description" content={t("description.settings")} />
            <div className="container">
                <div className={c.main}>
                    <ConfirmModal
                        confirmFn={() =>
                            confirmDeleteUserHandler(
                                userInfo.UUID,
                                deleteUserMutation.mutateAsync
                            )
                        }
                        text={t("settings.confirmDeleteUser")}
                        ariaLabelConfirm={t("ariaLabel.confirmDeleteUser")}
                        isShowModal={isShowModal}
                        setIsShowModal={setIsShowModal}
                    />
                    {windowWidth >= 1200 && (
                        <Navigation role={userInfo.role} UUID={userInfo.UUID} />
                    )}
                    <div className={c.content}>
                        <SettingsForm
                            UUID={userInfo.UUID}
                            currentUserInfo={currentUserInfo}
                            userInfo={userState}
                            setUserInfo={setUserState}
                        />
                        <EmailChangeForm email={userInfo.email} UUID={userInfo.UUID} />
                        <PasswordChangeForm UUID={userInfo.UUID} email={userInfo.email} />
                        <div className={c.button_wrapper}>
                            <StylizedButton
                                onClick={() =>
                                    deleteUserButtonClickHandler(setIsShowModal)
                                }
                                aria-label={t("ariaLabel.deleteUser")}
                                className={c.delete_account}
                            >
                                {t("settings.deleteUser")}
                            </StylizedButton>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
