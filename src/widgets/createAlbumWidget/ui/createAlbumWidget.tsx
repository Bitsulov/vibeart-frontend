import c from "./createAlbumWidget.module.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm, useWatch } from "react-hook-form";
import { useWindowWidth } from "shared/hooks/useWindowWidth";
import {
    type ComponentPropsWithoutRef,
    type Dispatch,
    type SetStateAction,
    useEffect
} from "react";
import { submitValidHandler } from "../model/submitValidHandler";
import { submitInvalidHandler } from "../model/submitInvalidHandler";
import { albumRequestSuccessHandler } from "../model/albumRequestSuccessHandler";
import { albumRequestErrorHandler } from "../model/albumRequestErrorHandler";
import { SettingsItem } from "features/settingsItem";
import { StylizedButton } from "features/stylizedButton";
import type { ICreateAlbumForm } from "../lib/types";
import { addAlbum, type AlbumType, updateAlbum } from "entities/album";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { AppError } from "shared/lib/types";

/** Свойства компонента {@link CreateAlbumWidget}. */
interface CreateAlbumWidgetProps extends Omit<
    ComponentPropsWithoutRef<"form">,
    "onSubmit"
> {
    /** Дополнительный CSS-класс для корневого элемента формы. */
    className?: string;
    /** Текущее состояние альбома для предпросмотра и отправки формы. */
    albumInfo: Partial<AlbumType>;
    /** Функция обновления частичного состояния альбома — используется для обновления предпросмотра. */
    setAlbumInfo: Dispatch<SetStateAction<Partial<AlbumType>>>;
    /** Загруженный файл обложки альбома. */
    loadedFile: File | undefined;
    /** Функция обновления загруженного файла обложки. */
    setLoadedFile: Dispatch<SetStateAction<File | undefined>>;
    /** Признак режима создания альбома; при `false` форма работает в режиме редактирования. */
    isCreateNewAlbum: boolean;
    /** Исходное название редактируемого альбома — используется для проверки, изменились ли данные. */
    albumName: string;
    /** Исходное описание редактируемого альбома — используется для проверки, изменились ли данные. */
    albumDescription: string;
    /** UUID текущего пользователя как автора альбома. */
    UUID: string;
    /** Функция, вызываемая после попытки отправки формы. По умолчанию — пустая функция. */
    onSubmit?: () => void;
}

/**
 * Форма создания или редактирования альбома с полями загрузки обложки, названия и описания.
 *
 * Режим определяется пропом `isCreateNewAlbum`: в режиме редактирования поля формы
 * предзаполняются данными `albumInfo`. Использует react-hook-form для валидации:
 * название обязательно (не более 15 символов), описание — не более 200 символов.
 * Подписи полей и кнопка отправки адаптируются под ширину экрана.
 * При успешной отправке вызывается {@link submitValidHandler},
 * при ошибке валидации — {@link submitInvalidHandler}.
 */
export const CreateAlbumWidget = ({
    className = "",
    albumInfo,
    setAlbumInfo,
    loadedFile,
    setLoadedFile,
    isCreateNewAlbum,
    albumName,
    albumDescription,
    UUID,
    onSubmit = () => {},
    ...props
}: CreateAlbumWidgetProps) => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { isSubmitted, errors }
    } = useForm<ICreateAlbumForm>({
        shouldFocusError: false
    });

    const windowWidth = useWindowWidth();

    const titleValue = useWatch<ICreateAlbumForm>({ control, name: "title" });
    const descriptionValue = useWatch<ICreateAlbumForm>({ control, name: "description" });

    const isDesktop = windowWidth >= 1200;

    const submitText = isDesktop
        ? "createAlbum.submitTextDesktop"
        : "createAlbum.submitTextMobile";
    const descriptionText = isDesktop
        ? "createAlbum.textDescriptionDesktop"
        : "createAlbum.textDescriptionMobile";
    const titlePlaceholder =
        isDesktop && windowWidth < 1750
            ? "createAlbum.nameTitle"
            : "createAlbum.namePlaceholder";
    const descriptionPlaceholder =
        isDesktop && windowWidth < 1750
            ? "createAlbum.textTitle"
            : "createAlbum.textPlaceholder";

    const title = isCreateNewAlbum ? "createAlbum.titleCreate" : "createAlbum.titleEdit";

    const albumUUID = albumInfo.UUID || "";

    useEffect(() => {
        setValue("title", albumInfo?.name ?? "");
        setValue("description", albumInfo?.description ?? "");
    }, [albumInfo, setValue]);

    const createAlbumMutation = useMutation({
        mutationFn: addAlbum,
        onSuccess: data =>
            albumRequestSuccessHandler(data, navigate, dispatch, isCreateNewAlbum),
        onError: (error: AxiosError<AppError>) =>
            albumRequestErrorHandler(error, dispatch)
    });

    const updateAlbumMutation = useMutation({
        mutationFn: updateAlbum,
        onSuccess: data =>
            albumRequestSuccessHandler(data, navigate, dispatch, isCreateNewAlbum),
        onError: (error: AxiosError<AppError>) =>
            albumRequestErrorHandler(error, dispatch)
    });

    return (
        <form
            onSubmit={handleSubmit(
                data =>
                    submitValidHandler(
                        data,
                        createAlbumMutation.mutateAsync,
                        updateAlbumMutation.mutateAsync,
                        isCreateNewAlbum,
                        UUID,
                        albumUUID,
                        dispatch,
                        loadedFile,
                        albumInfo.imageUrl,
                        albumName,
                        albumDescription,
                        onSubmit
                    ),
                errors => submitInvalidHandler(errors, dispatch)
            )}
            className={`${c.settings} ${className}`}
            {...props}
        >
            <h1 className={c.title}>{t(title)}</h1>
            <div className={c.fields}>
                <SettingsItem
                    title={t("createAlbum.imgTitle")}
                    description={t("createAlbum.imgDescription")}
                    type="buttons"
                    isError={!!errors.img}
                    isSubmitted={isSubmitted}
                    registerProps={register("img")}
                    id="image"
                    setEntityInfo={setAlbumInfo}
                    setLoadedFile={setLoadedFile}
                />
                <SettingsItem
                    title={t("createAlbum.nameTitle")}
                    description={t("createAlbum.nameDescription")}
                    placeholder={t(titlePlaceholder)}
                    type="input"
                    value={titleValue}
                    isError={!!errors.title}
                    isSubmitted={isSubmitted}
                    maxLength={15}
                    registerProps={register("title", {
                        required: "toast.emptyTitle",
                        maxLength: { value: 15, message: "toast.longTitle" },
                        onChange: e =>
                            setAlbumInfo(album => ({ ...album, name: e.target.value }))
                    })}
                    id="name"
                    setEntityInfo={setAlbumInfo}
                />
                <SettingsItem
                    title={t("createAlbum.textTitle")}
                    description={t(descriptionText)}
                    placeholder={t(descriptionPlaceholder)}
                    type="textarea"
                    value={descriptionValue}
                    isError={!!errors.description}
                    isSubmitted={isSubmitted}
                    maxLength={200}
                    registerProps={register("description", {
                        maxLength: { value: 200, message: "toast.longDescription" }
                    })}
                    id="description"
                    setEntityInfo={setAlbumInfo}
                />
            </div>
            <StylizedButton
                aria-label={t("ariaLabel.createAlbum")}
                className={c.submit}
                type="submit"
            >
                {t(submitText)}
            </StylizedButton>
        </form>
    );
};
