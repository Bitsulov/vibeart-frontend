import c from "./createCommunityWidget.module.scss";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { ICreateCommunityForm } from "../lib/types";
import { submitValidHandler } from "../model/submitValidHandler";
import { submitInvalidHandler } from "../model/submitInvalidHandler";
import type { UserType } from "entities/user";
import {
    type ComponentPropsWithoutRef,
    type Dispatch,
    type SetStateAction,
    useState
} from "react";
import { useWindowWidth } from "shared/hooks/useWindowWidth";
import { SettingsItem } from "features/settingsItem";
import type { CommunityType } from "entities/community";
import { StylizedButton } from "features/stylizedButton";
import { useDispatch } from "react-redux";
import { AddTags } from "widgets/addTags";
import type { TagType } from "entities/tag";
import { AddAdmins } from "widgets/addAdmins";
import { BackLink } from "features/backLink";

/** Свойства компонента {@link CreateCommunityWidget}. */
interface CreateCommunityWidgetProps extends ComponentPropsWithoutRef<"form"> {
    /** Данные текущего пользователя — отображается как автор и недоступный для снятия администратор. */
    userInfo: UserType;
    /** Полный список тегов для выбора в виджете {@link AddTags}. */
    tagsList: TagType[];
    /** Текущее частичное состояние создаваемого сообщества для предпросмотра. */
    communityInfo: Partial<CommunityType>;
    /** Сеттер состояния создаваемого сообщества. */
    setCommunityInfo: Dispatch<SetStateAction<Partial<CommunityType>>>;
}

/**
 * Форма создания нового сообщества.
 *
 * Объединяет поля аватара, названия, описания и короткого идентификатора
 * через {@link SettingsItem}, выбор тегов через {@link AddTags}
 * и выбор администраторов через {@link AddAdmins}.
 *
 * Валидация управляется react-hook-form. При ошибке первое невалидное сообщение
 * показывается через toast-уведомление ({@link submitInvalidHandler}).
 * При успехе поля формы сбрасываются ({@link submitValidHandler}).
 * Текст кнопки отправки адаптируется под ширину экрана (мобильный / десктоп).
 */
export const CreateCommunityWidget = ({
    communityInfo,
    setCommunityInfo,
    userInfo,
    tagsList,
    ...props
}: CreateCommunityWidgetProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
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

    const submitText = isDesktop
        ? "createCommunity.editDesktop"
        : "createCommunity.editMobile";

    const [_loadedFile, setLoadedFile] = useState<File | undefined>(undefined);

    const [tags, setTags] = useState<string[]>([]);

    const pagesTags = 15;
    const [currentPageTags, setCurrentPageTags] = useState<number>(1);
    const [pagesDelta, setPagesDelta] = useState<number>(2);

    const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);

    return (
        <form
            onSubmit={handleSubmit(
                () => submitValidHandler(setValue),
                errors => submitInvalidHandler(errors, dispatch)
            )}
            className={c.form}
            {...props}
        >
            <div className="container">
                <div className={c.form_inner}>
                    <BackLink className={c.back} />
                    {isDesktop && (
                        <h1 className={c.title}>{t("createCommunity.title")}</h1>
                    )}
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
                        tagsList={tagsList}
                        pages={pagesTags}
                        currentPage={currentPageTags}
                        setCurrentPage={setCurrentPageTags}
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
