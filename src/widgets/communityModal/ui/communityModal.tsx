import c from "./communityModal.module.scss";
import {closeButtonClickHandler} from "../model/closeButtonClickHandler";
import clsx from "clsx";
import {modalClickHandler} from "../model/modalClickHandler";
import {StylizedButton} from "features/stylizedButton";
import React, {type ComponentPropsWithoutRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {defaultTransitionTime} from "shared/const/const";
import type {UserType} from "entities/user";
import {CommunityModalUserItem} from "features/communityModalUserItem";
import {getLocalTimeString} from "shared/lib/getLocalTimeString";
import {useSelector} from "react-redux";
import {selectCurrentLanguage} from "entities/appConfig";

interface CommunityModalProps extends ComponentPropsWithoutRef<"dialog"> {
    isShow: boolean;
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
    description: string;
    createdAt: string;
    owner: UserType;
    admins: UserType[];
}

/** Модальное окно с информацией о сообществе: описание, владелец, администраторы и дата создания.
 *
 * @param isShow - Признак видимости модального окна.
 * @param setIsShow - Сеттер состояния видимости.
 * @param description - Описание сообщества.
 * @param createdAt - Дата создания сообщества (ISO-строка).
 * @param owner - Объект владельца сообщества.
 * @param admins - Список администраторов сообщества.
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
    const transitionTime = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--transition-time"))
        || defaultTransitionTime;

    const resultDate = getLocalTimeString(language, createdAt);

	return (
        <>
            {isShow && (
                <div
                    onClick={() => closeButtonClickHandler(setIsDisappearring, transitionTime, setIsShow)}
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
                                <CommunityModalUserItem
                                    ULID={owner.ULID}
                                    imageUrl={owner.avatarUrl}
                                    name={owner.name}
                                    className={c.owner}
                                />
                            </div>
                            <div className={c.text}>
                                <h3 className={c.text_title}>{t("community.admins")}</h3>
                                <div className={c.admins}>
                                    {admins.map(admin => (
                                        <CommunityModalUserItem
                                            key={`user ${admin.ULID}`}
                                            imageUrl={admin.avatarUrl}
                                            name={admin.name}
                                            ULID={admin.ULID}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className={c.date_wrapper}>
                                <h3 className={c.date_sign}>{t("profile.createdAt")}</h3>
                                <p className={c.date}>{resultDate}</p>
                            </div>
                        </div>
                        <div className={c.bottom}>
                            <StylizedButton
                                ariaLabel={t("ariaLabel.closeLanguageModal")}
                                onClick={() => closeButtonClickHandler(setIsDisappearring, transitionTime, setIsShow)}
                                className={c.close}
                            >
                                {t("Close")}
                            </StylizedButton>
                        </div>
                        <button
                            onClick={() => closeButtonClickHandler(setIsDisappearring, transitionTime, setIsShow)}
                            className={c.close_button}
                        ></button>
                    </dialog>
                </div>
            )}
        </>
	)
}
