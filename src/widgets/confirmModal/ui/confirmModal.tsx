import c from "./confirmModal.module.scss";
import {closeButtonClickHandler} from "../model/closeButtonClickHandler";
import clsx from "clsx";
import {modalClickHandler} from "../model/modalClickButton";
import {StylizedButton} from "features/stylizedButton";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {defaultTransitionTime} from "shared/const/const";
import {TransparentButton} from "features/transparentButton";
import {agreeHandlerClick} from "../model/agreeHandlerClick";

interface ConfirmModalProps {
    isShowModal: boolean;
    setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    confirmFn?: () => void;
    text?: string;
    ariaLabelConfirm?: string
}

export const ConfirmModal = ({
    text = "",
    confirmFn = () => {},
    ariaLabelConfirm = "",
    isShowModal,
    setIsShowModal,
    ...props
}: ConfirmModalProps) => {
    const { t } = useTranslation();

    const [isDisappearring, setIsDisappearring] = useState(false);
    const transitionTime = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--transition-time"))
        || defaultTransitionTime;

	return (
        <>
            {isShowModal && (
                <div
                    onClick={() => closeButtonClickHandler(setIsDisappearring, transitionTime, setIsShowModal)}
                    className={clsx(c.background, isDisappearring && c.close)}
                >
                    <dialog open onClick={e => modalClickHandler(e)} aria-modal="true" className={c.modal} {...props}>
                        <div className={c.top}>
                            <h3 className={c.title}>{t("Confirm")}</h3>
                        </div>
                        <p className={c.text}>{text || t("questionAgreed")}</p>
                        <div className={c.bottom}>
                            <div className={c.buttons}>
                                <TransparentButton
                                    className={c.cancel_button}
                                    ariaLabel={t("ariaLabel.closeLanguageModal")}
                                    onClick={() => closeButtonClickHandler(setIsDisappearring, transitionTime, setIsShowModal)}
                                >
                                    {t("Cancel")}
                                </TransparentButton>
                                <StylizedButton
                                    ariaLabel={ariaLabelConfirm || t("ariaLabel.agreeModal")}
                                    onClick={() => agreeHandlerClick(confirmFn, setIsDisappearring, transitionTime, setIsShowModal)}
                                >
                                    {t("DoConfirm")}
                                </StylizedButton>
                            </div>
                        </div>
                    </dialog>
                </div>
            )}
        </>
	)
}
