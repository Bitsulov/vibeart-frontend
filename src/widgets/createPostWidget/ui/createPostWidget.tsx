import c from "./createPostWidget.module.scss";
import { useTranslation } from "react-i18next";
import { SettingsItem } from "features/settingsItem";
import { useForm, useWatch } from "react-hook-form";
import type { ICreatePostForm } from "../lib/types";
import {
    type ComponentPropsWithoutRef,
    type Dispatch,
    type SetStateAction,
    useEffect,
    useState
} from "react";
import { submitValidHandler } from "../model/submitValidHandler";
import { submitInvalidHandler } from "../model/submitInvalidHandler";
import { useNavigate } from "react-router-dom";
import { AddTags } from "widgets/addTags";
import { StylizedButton } from "features/stylizedButton";
import { useWindowWidth } from "shared/hooks/useWindowWidth";
import { addPost, type PostType, updatePostByUUID } from "entities/post";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { postRequestSuccessHandler } from "../model/postRequestSuccessHandler";
import { postRequestErrorHandler } from "../model/postRequestErrorHandler";
import type { AxiosError } from "axios";
import type { AppError } from "shared/lib/types";

/** Свойства компонента {@link CreatePostWidget}. */
interface CreatePostWidgetProps extends ComponentPropsWithoutRef<"form"> {
    /** Количество кнопок страниц, отображаемых по обе стороны от текущей в {@link AddTags}. */
    pagesDelta: number;
    /** Функция обновления `pagesDelta`. */
    setPagesDelta: Dispatch<SetStateAction<number>>;
    /** Функция обновления частичного состояния публикации — используется для обновления предпросмотра. */
    setPostInfo: Dispatch<SetStateAction<Partial<PostType>>>;
    /** Функция обновления загруженного файла изображения публикации. */
    setLoadedFile: Dispatch<SetStateAction<File | undefined>>;
    /** Загруженный файл изображения публикации. */
    loadedFile?: File;
    /** Текущее состояние публикации для предпросмотра и отправки формы. */
    postInfo: Partial<PostType>;
    /** Теги редактируемой публикации, отмечаемые как выбранные при загрузке формы. */
    postTags: string[];
    /** Признак режима создания публикации; при `false` форма работает в режиме редактирования. */
    isCreateNewPost: boolean;
    /** Исходный заголовок редактируемой публикации — используется для проверки, изменились ли данные. */
    postName: string;
    /** Исходное описание редактируемой публикации — используется для проверки, изменились ли данные. */
    postDescription: string;
    /** UUID сообщества-автора публикации, если публикация создаётся от его имени; иначе `null`. */
    communityId: string | null;
    /** UUID текущего пользователя. */
    UUID: string;
    /** Функция, вызываемая после успешной отправки формы. По умолчанию — пустая функция. */
    onSubmit?: () => void;
    /** Дополнительный CSS-класс для корневого элемента формы. */
    className?: string;
}

/**
 * Форма создания или редактирования публикации с полями загрузки изображения, названия,
 * описания и выбором тегов.
 *
 * Режим определяется пропом `isCreateNewPost`: в режиме редактирования поля формы
 * предзаполняются данными `postInfo`/`postTags`. Публикация может создаваться как от имени
 * текущего пользователя, так и от имени сообщества, если передан `communityId`.
 *
 * Использует react-hook-form для валидации: название обязательно (не более 15 символов),
 * описание — не более 200 символов. Теги выбираются через {@link AddTags}.
 * Подписи полей и текст кнопки адаптируются под ширину экрана и под режим.
 * При успешной отправке вызывается {@link submitValidHandler}, при ошибке — {@link submitInvalidHandler}.
 */
export const CreatePostWidget = ({
    pagesDelta,
    setPagesDelta,
    setPostInfo,
    setLoadedFile,
    loadedFile,
    postInfo,
    postTags,
    postName,
    postDescription,
    isCreateNewPost,
    communityId,
    UUID,
    onSubmit = () => {},
    className = "",
    ...props
}: CreatePostWidgetProps) => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { isSubmitted, errors }
    } = useForm<ICreatePostForm>({
        shouldFocusError: false
    });

    const windowWidth = useWindowWidth();

    const titleValue = useWatch<ICreatePostForm>({ control, name: "title" });
    const descriptionValue = useWatch<ICreatePostForm>({ control, name: "description" });

    const isDesktop = windowWidth >= 1200;

    const submitText = isCreateNewPost
        ? isDesktop
            ? "createPost.submitTextDesktop"
            : "createPost.submitTextMobile"
        : isDesktop
          ? "createPost.submitTextEditDesktop"
          : "createPost.submitTextEditMobile";
    const submitAriaLabel = isCreateNewPost
        ? "ariaLabel.createPost"
        : "ariaLabel.editPost";
    const descriptionText = isDesktop
        ? "createPost.textDescriptionDesktop"
        : "createPost.textDescriptionMobile";
    const titlePlaceholder =
        isDesktop && windowWidth < 1750
            ? "createPost.nameTitle"
            : "createPost.namePlaceholder";
    const descriptionPlaceholder =
        isDesktop && windowWidth < 1750
            ? "createPost.textTitle"
            : "createPost.textPlaceholder";

    const title = isCreateNewPost ? "createPost.titleCreate" : "createPost.titleEdit";

    const [chosenTags, setChosenTags] = useState<string[]>([]);
    const postUUID = postInfo.UUID || "";

    const isCommunity = !!communityId;

    useEffect(() => {
        setValue("title", postInfo?.name ?? "");
        setValue("description", postInfo?.description ?? "");
        setChosenTags(postTags);
    }, [postInfo, setValue, postTags]);

    const createPostMutation = useMutation({
        mutationFn: addPost,
        onSuccess: data =>
            postRequestSuccessHandler(data, navigate, dispatch, isCreateNewPost),
        onError: (error: AxiosError<AppError>) => postRequestErrorHandler(error, dispatch)
    });

    const updatePostMutation = useMutation({
        mutationFn: updatePostByUUID,
        onSuccess: data =>
            postRequestSuccessHandler(data, navigate, dispatch, isCreateNewPost),
        onError: (error: AxiosError<AppError>) => postRequestErrorHandler(error, dispatch)
    });

    return (
        <form
            onSubmit={handleSubmit(
                data =>
                    submitValidHandler(
                        data,
                        createPostMutation.mutateAsync,
                        updatePostMutation.mutateAsync,
                        isCreateNewPost,
                        chosenTags,
                        UUID,
                        postUUID,
                        dispatch,
                        loadedFile,
                        postInfo.imageUrl,
                        postName,
                        postDescription,
                        postTags,
                        isCommunity,
                        communityId || "",
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
                    title={t("createPost.imgTitle")}
                    description={t("createPost.imgDescription")}
                    type="buttons"
                    isError={!!errors.img}
                    isSubmitted={isSubmitted}
                    registerProps={register("img")}
                    id="image"
                    setEntityInfo={setPostInfo}
                    setLoadedFile={setLoadedFile}
                />
                <SettingsItem
                    title={t("createPost.nameTitle")}
                    description={t("createPost.nameDescription")}
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
                            setPostInfo(post => ({ ...post, name: e.target.value }))
                    })}
                    id="name"
                    setEntityInfo={setPostInfo}
                />
                <SettingsItem
                    title={t("createPost.textTitle")}
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
                    setEntityInfo={setPostInfo}
                />
            </div>
            <AddTags
                pagesDelta={pagesDelta}
                setPagesDelta={setPagesDelta}
                chosenTags={chosenTags}
                setChosenTags={setChosenTags}
            />
            <StylizedButton
                aria-label={t(submitAriaLabel)}
                className={c.submit}
                type="submit"
            >
                {t(submitText)}
            </StylizedButton>
        </form>
    );
};
