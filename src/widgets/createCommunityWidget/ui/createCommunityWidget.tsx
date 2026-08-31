import c from "./createCommunityWidget.module.scss";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { ICreateCommunityForm } from "../lib/types";
import { submitValidHandler } from "../model/submitValidHandler";
import { submitInvalidHandler } from "../model/submitInvalidHandler";
import { communityRequestSuccessHandler } from "../model/communityRequestSuccessHandler";
import { communityRequestErrorHandler } from "../model/communityRequestErrorHandler";
import { onAvatarDeleteHandler } from "../model/onAvatarDeleteHandler";
import type { UserType } from "entities/user";
import {
    type ComponentPropsWithoutRef,
    type Dispatch,
    type SetStateAction,
    useEffect,
    useState
} from "react";
import { useWindowWidth } from "shared/hooks/useWindowWidth";
import { SettingsItem } from "features/settingsItem";
import { addCommunity, type CommunityType, updateCommunity } from "entities/community";
import { StylizedButton } from "features/stylizedButton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { AppError } from "shared/lib/types";
import { AddTags } from "widgets/addTags";
import { AddAdmins } from "widgets/addAdmins";
import { BackLink } from "features/backLink";

/** Свойства компонента {@link CreateCommunityWidget}. */
interface CreateCommunityWidgetProps extends ComponentPropsWithoutRef<"form"> {
    /** Данные текущего пользователя — отображается как автор и недоступный для снятия администратор. */
    userInfo: UserType;
    /** Текущее частичное состояние создаваемого сообщества для предпросмотра. */
    communityInfo: Partial<CommunityType>;
    /** Сеттер состояния создаваемого сообщества. */
    setCommunityInfo: Dispatch<SetStateAction<Partial<CommunityType>>>;
    /** Признак режима создания сообщества; при `false` форма работает в режиме редактирования. */
    isCreateNewCommunity: boolean;
    /** UUID редактируемого сообщества. */
    communityUUID: string;
    /** Исходное название редактируемого сообщества — используется для проверки, изменились ли данные. */
    originalTitle: string;
    /** Исходное описание редактируемого сообщества — используется для проверки, изменились ли данные. */
    originalDescription: string;
    /** Исходный username редактируемого сообщества — используется для проверки, изменились ли данные. */
    originalUsername: string;
    /** Исходные теги редактируемого сообщества, отмечаемые как выбранные при загрузке формы. */
    originalTags: string[];
    /** Исходные администраторы редактируемого сообщества, отмечаемые как выбранные при загрузке формы. */
    originalAdmins: UserType[];
}

/**
 * Форма создания или редактирования сообщества.
 *
 * Совмещает поля аватара, названия, описания и короткого идентификатора,
 * выбор тегов и выбор администраторов. В режиме редактирования поля формы,
 * теги и администраторы предзаполняются данными сообщества. Валидация
 * выполняется через react-hook-form, при ошибке показывается уведомление.
 */
export const CreateCommunityWidget = ({
    communityInfo,
    setCommunityInfo,
    userInfo,
    isCreateNewCommunity,
    communityUUID,
    originalTitle,
    originalDescription,
    originalUsername,
    originalTags,
    originalAdmins,
    ...props
}: CreateCommunityWidgetProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const windowWidth = useWindowWidth();
    const isDesktop = windowWidth >= 1200;

    const {
        register,
        setValue,
        handleSubmit,
        control,
        formState: { isSubmitted, errors }
    } = useForm<ICreateCommunityForm>({
        shouldFocusError: false
    });

    const titleValue = useWatch<ICreateCommunityForm>({ control, name: "title" });
    const descriptionValue = useWatch<ICreateCommunityForm>({
        control,
        name: "description"
    });
    const idValue = useWatch<ICreateCommunityForm>({ control, name: "id" });

    const description = isDesktop
        ? "createCommunity.textDescriptionDesktop"
        : "createCommunity.textDescriptionMobile";

    const title = isCreateNewCommunity
        ? "createCommunity.title"
        : "createCommunity.titleEdit";

    const submitText = isCreateNewCommunity
        ? isDesktop
            ? "createCommunity.editDesktop"
            : "createCommunity.editMobile"
        : isDesktop
          ? "createCommunity.saveDesktop"
          : "createCommunity.saveMobile";

    const [loadedFile, setLoadedFile] = useState<File | undefined>(undefined);
    const [isDeleteAvatar, setIsDeleteAvatar] = useState<boolean>(false);

    const [tags, setTags] = useState<string[]>([]);

    const [pagesDelta, setPagesDelta] = useState<number>(2);

    const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);

    useEffect(() => {
        setValue("title", communityInfo?.title ?? "");
        setValue("description", communityInfo?.description ?? "");
        setValue("id", communityInfo?.username ?? "");
        setTags(originalTags);
        setSelectedUsers(originalAdmins);
    }, [communityInfo, originalTags, originalAdmins, setValue]);

    const createCommunityMutation = useMutation({
        mutationFn: addCommunity,
        onSuccess: data =>
            communityRequestSuccessHandler(
                data,
                navigate,
                dispatch,
                isCreateNewCommunity
            ),
        onError: (error: AxiosError<AppError>) =>
            communityRequestErrorHandler(error, dispatch)
    });

    const updateCommunityMutation = useMutation({
        mutationFn: updateCommunity,
        onSuccess: data =>
            communityRequestSuccessHandler(
                data,
                navigate,
                dispatch,
                isCreateNewCommunity
            ),
        onError: (error: AxiosError<AppError>) =>
            communityRequestErrorHandler(error, dispatch)
    });

    return (
        <form
            onSubmit={handleSubmit(
                data =>
                    submitValidHandler(
                        data,
                        createCommunityMutation.mutateAsync,
                        updateCommunityMutation.mutateAsync,
                        isCreateNewCommunity,
                        tags,
                        selectedUsers.map(user => user.UUID),
                        userInfo.UUID,
                        communityUUID,
                        isDeleteAvatar,
                        dispatch,
                        loadedFile,
                        {
                            title: originalTitle,
                            description: originalDescription,
                            username: originalUsername,
                            tags: originalTags,
                            adminsUuids: originalAdmins.map(admin => admin.UUID)
                        },
                        () => {}
                    ),
                errors => submitInvalidHandler(errors, dispatch)
            )}
            className={c.form}
            {...props}
        >
            <div className="container">
                <div className={c.form_inner}>
                    <BackLink className={c.back} />
                    {isDesktop && <h1 className={c.title}>{t(title)}</h1>}
                    <div className={c.settings}>
                        <SettingsItem
                            title={t("createCommunity.avatarTitle")}
                            description={t("createCommunity.avatarDescription")}
                            type="avatar"
                            avatarUrl={communityInfo.imageUrl}
                            avatarFieldName="imageUrl"
                            setLoadedFile={setLoadedFile}
                            isError={!!errors.avatar}
                            isSubmitted={isSubmitted}
                            registerProps={register("avatar")}
                            setEntityInfo={setCommunityInfo}
                            id="avatar"
                            avatarAlt={communityInfo.title || t("avatar")}
                            onAvatarDelete={() =>
                                onAvatarDeleteHandler(setIsDeleteAvatar)
                            }
                        />
                        <SettingsItem
                            title={t("createCommunity.nameTitle")}
                            description={t("createCommunity.nameDescription")}
                            type="input"
                            value={titleValue}
                            maxLength={15}
                            minLength={3}
                            placeholder={t("createCommunity.namePlaceholder")}
                            isError={!!errors.title}
                            isSubmitted={isSubmitted}
                            registerProps={register("title", {
                                required: "toast.emptyName",
                                minLength: {
                                    value: 3,
                                    message: "toast.shortName"
                                },
                                maxLength: {
                                    value: 15,
                                    message: "toast.longName"
                                }
                            })}
                            setEntityInfo={setCommunityInfo}
                            required
                            id="title"
                        />
                        <SettingsItem
                            title={t("createCommunity.textTitle")}
                            description={t(description)}
                            type="textarea"
                            value={descriptionValue}
                            placeholder={t("createCommunity.textPlaceholder")}
                            maxLength={200}
                            isError={!!errors.description}
                            isSubmitted={isSubmitted}
                            registerProps={register("description", {
                                maxLength: {
                                    value: 200,
                                    message: "toast.longDescription"
                                }
                            })}
                            setEntityInfo={setCommunityInfo}
                            id="description"
                        />
                        <SettingsItem
                            title={t("createCommunity.idTitle")}
                            description={t("createCommunity.idDescription")}
                            type="id"
                            value={idValue}
                            placeholder={t("createCommunity.idPlaceholder")}
                            maxLength={10}
                            minLength={2}
                            isError={!!errors.id}
                            isSubmitted={isSubmitted}
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
                            setEntityInfo={setCommunityInfo}
                            id="id"
                        />
                    </div>
                    <AddTags
                        pagesDelta={pagesDelta}
                        setPagesDelta={setPagesDelta}
                        chosenTags={tags}
                        setChosenTags={setTags}
                    />
                    <AddAdmins
                        className={c.admins}
                        selectedAdmins={selectedUsers}
                        setSelectedAdmins={setSelectedUsers}
                        author={userInfo}
                    />
                    <StylizedButton
                        type="submit"
                        aria-label={t("ariaLabel.saveCommunity")}
                        className={c.submit}
                    >
                        {t(submitText)}
                    </StylizedButton>
                </div>
            </div>
        </form>
    );
};
