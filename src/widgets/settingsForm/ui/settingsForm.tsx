import c from "./settingsForm.module.scss";
import type { UserResponse, UserType } from "entities/user";
import {
    type ComponentPropsWithoutRef,
    type Dispatch,
    type SetStateAction,
    useEffect,
    useState
} from "react";
import { useTranslation } from "react-i18next";
import { useForm, useWatch } from "react-hook-form";
import type { ISettingsForm } from "../lib/types";
import { SettingsItem } from "features/settingsItem";
import { submitValidHandler } from "../model/submitValidHandler";
import { submitInvalidHandler } from "../model/submitInvalidHandler";
import { useWindowWidth } from "shared/hooks/useWindowWidth";
import { StylizedButton } from "features/stylizedButton";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserByUUID } from "entities/user";
import { onDeleteAvatarHandler } from "../model/onDeleteAvatarHandler";
import { updateUserSuccessHandler } from "../model/updateUserSuccessHandler";
import { updateUserErrorHandler } from "../model/updateUserErrorHandler";
import type { AxiosError } from "axios";
import type { AppError } from "shared/lib/types";

/** Свойства компонента {@link SettingsForm}. */
interface SettingsFormProps extends ComponentPropsWithoutRef<"form"> {
    /** Данные пользователя, используемые для предпросмотра аватара и имени в полях. */
    userInfo: Partial<UserType>;
    /** Текущая информация о пользователе с сервера */
    currentUserInfo: UserResponse;
    /** Функция обновления данных пользователя для обновления предпросмотра при изменении полей. */
    setUserInfo: Dispatch<SetStateAction<Partial<UserType>>>;
    /** UUID текущего пользователя */
    UUID: string;
}

/**
 * Форма редактирования профиля пользователя: аватар, имя, имя пользователя и описание.
 *
 * Использует react-hook-form для валидации: имя — обязательно (3–20 символов),
 * имя пользователя — 2–10 символов, описание — не более 200 символов.
 * Текст кнопки отправки адаптируется под ширину экрана.
 */
export const SettingsForm = ({
    userInfo,
    setUserInfo,
    currentUserInfo,
    UUID,
    ...props
}: SettingsFormProps) => {
    const { t } = useTranslation();
    const windowWidth = useWindowWidth();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const {
        register,
        setValue,
        handleSubmit,
        control,
        formState: { errors, isSubmitted } /*setError*/
    } = useForm<ISettingsForm>({ shouldFocusError: false });

    const isDesktop = windowWidth >= 1200;
    const descriptionText = isDesktop
        ? "settings.descriptionDesktop"
        : "settings.descriptionMobile";

    const submitText = isDesktop ? "settings.editDesktop" : "settings.editMobile";

    const nameValue = useWatch({ control, name: "title" });
    const idValue = useWatch({ control, name: "id" });
    const descriptionValue = useWatch({ control, name: "description" });

    const [loadedFile, setLoadedFile] = useState<File | undefined>(undefined);
    const [isDeleteAvatar, setIsDeleteAvatar] = useState<boolean>(false);

    const updateUserMutation = useMutation({
        mutationFn: updateUserByUUID,
        onSuccess: response =>
            updateUserSuccessHandler(response, setValue, dispatch, queryClient, UUID),
        onError: (error: AxiosError<AppError>) => updateUserErrorHandler(error, dispatch)
    });

    useEffect(() => {
        setValue("id", currentUserInfo?.username || "");
        setValue("title", currentUserInfo?.name || "");
        setValue("description", currentUserInfo?.description || "");
        setUserInfo(state => ({ ...state, avatarUrl: currentUserInfo?.avatarUrl || "" }));
    }, [currentUserInfo, setValue, setUserInfo]);

    return (
        <form
            onSubmit={handleSubmit(
                data =>
                    submitValidHandler(
                        data,
                        isDeleteAvatar,
                        updateUserMutation.mutateAsync,
                        dispatch,
                        UUID,
                        loadedFile
                    ),
                errors => submitInvalidHandler(errors, dispatch)
            )}
            className={c.form}
            {...props}
        >
            <h1 className={c.title}>{t("settings.title")}</h1>
            <div className={c.settings}>
                <SettingsItem
                    title={t("settings.avatarTitle")}
                    description={t("settings.avatarDescription")}
                    type="avatar"
                    isError={!!errors.avatar}
                    registerProps={register("avatar")}
                    isSubmitted={isSubmitted}
                    setEntityInfo={setUserInfo}
                    setLoadedFile={setLoadedFile}
                    id="avatar"
                    avatarUrl={userInfo.avatarUrl}
                    avatarAlt={userInfo.title || t("avatar")}
                    onAvatarDelete={() => onDeleteAvatarHandler(setIsDeleteAvatar)}
                />
                <SettingsItem
                    title={t("settings.nameTitle")}
                    description={t("settings.nameDescription")}
                    type="input"
                    isError={!!errors.title}
                    value={nameValue}
                    minLength={3}
                    maxLength={20}
                    placeholder={t("settings.namePlaceholder")}
                    placeholderClassName={c.small_placeholder}
                    registerProps={register("title", {
                        required: "toast.emptyName",
                        minLength: {
                            value: 3,
                            message: "toast.shortName"
                        },
                        maxLength: {
                            value: 20,
                            message: "toast.longName"
                        }
                    })}
                    isSubmitted={isSubmitted}
                    setEntityInfo={setUserInfo}
                    required
                    id="avatar"
                />
                <SettingsItem
                    title={t("settings.idTitle")}
                    description={t("settings.idDescription")}
                    type="id"
                    isError={!!errors.id}
                    value={idValue}
                    minLength={2}
                    maxLength={10}
                    placeholder={t("settings.idPlaceholder")}
                    placeholderClassName={c.small_placeholder}
                    registerProps={register("id", {
                        minLength: {
                            value: 2,
                            message: "toast.shortId"
                        },
                        maxLength: {
                            value: 10,
                            message: "toast.longId"
                        }
                    })}
                    isSubmitted={isSubmitted}
                    setEntityInfo={setUserInfo}
                    id="id"
                />
                <SettingsItem
                    title={t("settings.descriptionTitle")}
                    description={t(descriptionText)}
                    type="textarea"
                    isError={!!errors.description}
                    value={descriptionValue}
                    maxLength={200}
                    placeholder={t("settings.descriptionPlaceholder")}
                    registerProps={register("description", {
                        maxLength: {
                            value: 200,
                            message: "toast.longDescription"
                        }
                    })}
                    isSubmitted={isSubmitted}
                    setEntityInfo={setUserInfo}
                    id="description"
                />
            </div>
            <StylizedButton
                type="submit"
                aria-label={t("ariaLabel.saveUser")}
                className={c.submit}
            >
                {t(submitText)}
            </StylizedButton>
        </form>
    );
};
