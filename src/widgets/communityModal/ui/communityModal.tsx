import c from "./communityModal.module.scss";
import { closeButtonClickHandler } from "../model/closeButtonClickHandler";
import clsx from "clsx";
import { modalClickHandler } from "../model/modalClickHandler";
import { StylizedButton } from "features/stylizedButton";
import { useState } from "react";
import type { ComponentPropsWithoutRef, Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { defaultTransitionTime } from "shared/const/const";
import type { UserType } from "entities/user";
import { CommunityUserItem } from "features/communityUserItem";
import { getLocalTimeString } from "shared/lib/getLocalTimeString";
import { useSelector } from "react-redux";
import { selectCurrentLanguage } from "entities/appConfig";

/** Свойства компонента {@link CommunityModal}. */
interface CommunityModalProps extends ComponentPropsWithoutRef<"dialog"> {
    /** Признак того, что модальное окно в данный момент открыто. */
    isShow: boolean;
    /** Функция обновления признака видимости модального окна. */
    setIsShow: Dispatch<SetStateAction<boolean>>;
    /** Описание сообщества. */
    description: string;
    /** Дата создания сообщества в формате ISO 8601. */
    createdAt: string;
    /** Объект владельца сообщества. */
    owner: UserType;
    /** Список администраторов сообщества. */
    admins: UserType[];
}

/**
 * Модальное окно с подробной информацией о сообществе.
 *
 * Отображает описание, карточку владельца и список администраторов через {@link CommunityUserItem}
 * а также дату создания сообщества, отформатированную через {@link getLocalTimeString}.
 * Закрывается по клику на фон или кнопку «Закрыть» с анимацией исчезновения.
 */
export const CommunityModal = ({
    isShow,
    setIsShow,
    description,
    createdAt,
    owner,
    admins,
    ...props
}: CommunityModalProps) => {
    const { t } = useTranslation();
    const language = useSelector(selectCurrentLanguage);

    const [isDisappearring, setIsDisappearring] = useState(false);
    const transitionTime =
        parseInt(
            globalThis
                .getComputedStyle?.(globalThis.document?.documentElement)
                ?.getPropertyValue("--transition-time")
        ) || defaultTransitionTime;

    const resultDate = getLocalTimeString(language, createdAt);

    return (
        <>
            {isShow && (
                <div
                    onClick={() =>
                        closeButtonClickHandler(
                            setIsDisappearring,
                            transitionTime,
                            setIsShow
                        )
                    }
                    className={clsx(c.background, isDisappearring && c.close)}
                >
                    <dialog
                        open
                        onClick={e => modalClickHandler(e)}
                        aria-modal="true"
                        className={c.modal}
                        {...props}
                    >
                        <div className={c.top}>
                            <h3 className={c.title}>{t("information")}</h3>
                        </div>
                        <div className={c.info}>
                            <p className={c.description}>{description}</p>
                            <div className={c.text}>
                                <h3 className={c.text_title}>{t("community.owner")}</h3>
                                <CommunityUserItem
                                    UUID={owner.UUID}
                                    imageUrl={owner.avatarUrl}
                                    name={owner.title || owner.UUID}
                                    className={c.owner}
                                />
                            </div>
                            {admins.length > 0 && (
                                <div className={c.text}>
                                    <h3 className={c.text_title}>
                                        {t("community.admins")}
                                    </h3>
                                    <div className={c.admins}>
                                        {admins.map(admin => (
                                            <CommunityUserItem
                                                key={`user ${admin.UUID}`}
                                                imageUrl={admin.avatarUrl}
                                                name={admin.title || admin.UUID}
                                                UUID={admin.UUID}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className={c.date_wrapper}>
                                <h3 className={c.date_sign}>{t("profile.createdAt")}</h3>
                                <p className={c.date}>{resultDate}</p>
                            </div>
                        </div>
                        <div className={c.bottom}>
                            <StylizedButton
                                ariaLabel={t("ariaLabel.closeLanguageModal")}
                                onClick={() =>
                                    closeButtonClickHandler(
                                        setIsDisappearring,
                                        transitionTime,
                                        setIsShow
                                    )
                                }
                                className={c.close}
                            >
                                {t("Close")}
                            </StylizedButton>
                        </div>
                        <button
                            onClick={() =>
                                closeButtonClickHandler(
                                    setIsDisappearring,
                                    transitionTime,
                                    setIsShow
                                )
                            }
                            className={c.close_button}
                        ></button>
                    </dialog>
                </div>
            )}
        </>
    );
};
