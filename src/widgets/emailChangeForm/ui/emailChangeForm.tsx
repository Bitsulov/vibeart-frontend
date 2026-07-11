import c from "./emailChangeForm.module.scss";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { ICodeForm, IEmailChangeForm } from "../lib/types";
import { InputForm } from "features/inputForm";
import { submitValidHandler } from "../model/submitValidHandler";
import { submitInvalidHandler } from "../model/submitInvalidHandler";
import { useDispatch } from "react-redux";
import { type ComponentPropsWithoutRef, useEffect, useState } from "react";
import { StylizedButton } from "features/stylizedButton";
import { useWindowWidth } from "shared/hooks/useWindowWidth";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { returnToEmailHandler } from "../model/returnToEmailHandler";
import { CodeInputs } from "features/codeInputs";
import { codeSubmitValidHandler } from "../model/codeSubmitValidHandler";
import { useMutation } from "@tanstack/react-query";
import { changeEmail, confirmEmail, sendCodeEmail } from "entities/user";
import type { AxiosError, AxiosResponse } from "axios";
import type { AppError } from "shared/lib/types";
import { changeEmailErrorHandler } from "../model/changeEmailErrorHandler";
import { changeEmailSuccessHandler } from "../model/changeEmailSuccessHandler";
import { sentCodeButtonHandler } from "../model/sentCodeButtonHandler";
import clsx from "clsx";
import { sendCodeSuccessHandler } from "../model/sendCodeSuccessHandler";
import type { SendCodeEmailRequest } from "entities/user";
import { sendCodeErrorHandler } from "../model/sendCodeErrorHandler";
import { confirmEmailSuccessHandler } from "../model/confirmEmailSuccessHandler";
import { confirmEmailErrorHandler } from "../model/confirmEmailErrorHandler";

interface EmailChangeFormProps extends ComponentPropsWithoutRef<"form"> {
    UUID: string;
    email: string;
}

/**
 * Двухшаговая форма изменения e-mail адреса.
 *
 * Шаг 1: ввод текущего и нового e-mail адреса. Новый адрес должен отличаться от текущего
 * и соответствовать формату e-mail. При успешной валидации форма переходит на второй шаг.
 * Шаг 2: ввод шестизначного кода подтверждения, отправленного на новый адрес через {@link CodeInputs}.
 * Кнопка «Назад» возвращает на первый шаг без сброса введённого e-mail.
 *
 * @param UUID UUID пользователя
 * @param email адрес электронной почты пользователя
 * @param props пропсы компонента формы
 */
export const EmailChangeForm = ({ UUID, email, ...props }: EmailChangeFormProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const windowWidth = useWindowWidth();
    const isDesktop = windowWidth >= 1200;

    const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

    const {
        register,
        setValue,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitted } /*setError*/
    } = useForm<IEmailChangeForm>({ shouldFocusError: false });

    const oldEmailValue = useWatch({ control, name: "oldEmail" });
    const newEmailValue = useWatch({ control, name: "newEmail" });

    const [newEmailResult, setNewEmailResult] = useState<string>("");

    const codeForm = useForm<ICodeForm>({ shouldFocusError: false });

    const [codeError, setCodeError] = useState<boolean>(false);

    const changeEmailMutation = useMutation({
        mutationFn: changeEmail,
        onSuccess: () =>
            changeEmailSuccessHandler(
                dispatch,
                setValue,
                setIsEmailSent,
                setNewEmailResult,
                newEmailValue
            ),
        onError: (error: AxiosError<AppError>) => changeEmailErrorHandler(error, dispatch)
    });

    const sendCodeMutation = useMutation({
        mutationFn: sendCodeEmail,
        onSuccess: (response: AxiosResponse<string>, request: SendCodeEmailRequest) =>
            sendCodeSuccessHandler(response, request, dispatch),
        onError: (error: AxiosError<AppError>) => sendCodeErrorHandler(error, dispatch)
    });

    const confirmEmailMutation = useMutation({
        mutationFn: confirmEmail,
        onSuccess: () =>
            confirmEmailSuccessHandler(setIsEmailSent, reset, setCodeError, dispatch),
        onError: (error: AxiosError<AppError>) =>
            confirmEmailErrorHandler(error, dispatch)
    });

    const [timer, setTimer] = useState<number>(120);
    const [isAllowSentCode, setIsAllowSentCode] = useState<boolean>(false);
    const sendButtonText = isAllowSentCode
        ? "register.sendCodeButton"
        : "register.sendCodeButtonTimer";

    useEffect(() => {
        if (isEmailSent) {
            setTimer(120);
            setIsAllowSentCode(false);
        }
    }, [isEmailSent]);

    useEffect(() => {
        if (!isEmailSent) {
            return;
        }

        if (timer === 0) {
            setIsAllowSentCode(true);
        } else {
            const timeout = setTimeout(() => {
                setTimer(timer => timer - 1);
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [timer, isEmailSent]);

    return (
        <>
            {!isEmailSent ? (
                <form
                    key="email"
                    onSubmit={handleSubmit(
                        () =>
                            submitValidHandler(
                                newEmailValue,
                                UUID,
                                changeEmailMutation.mutateAsync
                            ),
                        errors => submitInvalidHandler(errors, dispatch)
                    )}
                    className={c.form}
                    {...props}
                >
                    <h2 className={c.title}>{t("emailChange.title")}</h2>
                    <div className={c.inputs}>
                        <InputForm
                            {...register("oldEmail", {
                                required: "toast.requiredEmail",
                                pattern: {
                                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message: "toast.wrongEmail"
                                }
                            })}
                            value={oldEmailValue}
                            placeholder={t("emailChange.oldEmailPlaceholder")}
                            className={c.input}
                            isError={!!errors.oldEmail}
                            isSubmitted={isSubmitted}
                        />
                        <InputForm
                            {...register("newEmail", {
                                required: "toast.requiredEmail",
                                pattern: {
                                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message: "toast.wrongEmail"
                                },
                                validate: {
                                    value: (newEmail, { oldEmail }) =>
                                        oldEmail !== newEmail || "toast.sameEmails"
                                }
                            })}
                            value={newEmailValue}
                            placeholder={t("emailChange.newEmailPlaceholder")}
                            className={c.input}
                            isError={!!errors.newEmail}
                            isSubmitted={isSubmitted}
                        />
                    </div>
                    <StylizedButton
                        aria-label={t("ariaLabel.continue")}
                        type="submit"
                        className={c.submit}
                    >
                        {isDesktop ? (
                            <ArrowRight className={c.icon} width="24" height="24" />
                        ) : (
                            t("Continue")
                        )}
                    </StylizedButton>
                </form>
            ) : (
                <form
                    key="code"
                    onSubmit={codeForm.handleSubmit(data =>
                        codeSubmitValidHandler(
                            data,
                            dispatch,
                            setCodeError,
                            newEmailResult,
                            confirmEmailMutation.mutateAsync
                        )
                    )}
                    className={c.form}
                    {...props}
                >
                    <h2 className={c.title}>{t("emailChange.title")}</h2>
                    <StylizedButton
                        type="button"
                        onClick={() =>
                            returnToEmailHandler(setIsEmailSent, reset, codeForm.reset)
                        }
                        aria-label={t("ariaLabel.backToChangeEmail")}
                        className={c.back}
                    >
                        <ArrowLeft className={c.icon} width="15" height="15" />
                    </StylizedButton>
                    <p className={c.text}>
                        {t("emailChange.sentCodeText", { address: newEmailResult })}
                    </p>
                    <CodeInputs
                        isError={codeError}
                        setCode={value => codeForm.setValue("code", value)}
                        className={c.code}
                    />
                    <button
                        type="button"
                        disabled={!isAllowSentCode}
                        aria-label={t("ariaLabel.sendCodeAgain")}
                        onClick={() =>
                            sentCodeButtonHandler(
                                setIsAllowSentCode,
                                setTimer,
                                email,
                                sendCodeMutation.mutateAsync
                            )
                        }
                        className={clsx(c.send_code, !isAllowSentCode && c.disabled)}
                    >
                        {t(sendButtonText, { timer: timer })}
                    </button>
                    <StylizedButton
                        aria-label={t("ariaLabel.changeEmail")}
                        type="submit"
                        className={c.submit_email}
                    >
                        {t("Send")}
                    </StylizedButton>
                </form>
            )}
        </>
    );
};
