import c from "./passwordChangeForm.module.scss";
import { InputForm } from "features/inputForm";
import { StylizedButton } from "features/stylizedButton";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import type { IPasswordChangeForm } from "../lib/types";
import { submitValidHandler } from "../model/submitValidHandler";
import { submitInvalidHandler } from "../model/submitInvalidHandler";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useWindowWidth } from "shared/hooks/useWindowWidth";
import { type ComponentPropsWithoutRef, useEffect, useState } from "react";
import { codeSubmitValidHandler } from "../model/codeSubmitValidHandler";
import { returnToEmailHandler } from "../model/returnToEmailHandler";
import { CodeInputs } from "features/codeInputs";
import type { ICodeForm } from "../lib/types";
import { useMutation } from "@tanstack/react-query";
import { changePassword, confirmPassword, sendCodePassword } from "entities/user";
import type { AxiosError } from "axios";
import type { AppError } from "shared/lib/types";
import { changePasswordSuccessHandler } from "../model/changePasswordSuccessHandler";
import { changePasswordErrorHandler } from "../model/changePasswordErrorHandler";
import { sentCodeButtonHandler } from "../model/sentCodeButtonHandler";
import clsx from "clsx";
import { sendCodeSuccessHandler } from "../model/sendCodeSuccessHandler";
import { sendCodeErrorHandler } from "../model/sendCodeErrorHandler";
import { confirmPasswordSuccessHandler } from "../model/confirmPasswordSuccessHandler";
import { confirmPasswordErrorHandler } from "../model/confirmPasswordErrorHandler";

/** Свойства компонента {@link PasswordChangeForm}. */
interface PasswordChangeFormProps extends ComponentPropsWithoutRef<"form"> {
    /** E-mail пользователя, отображаемый в подсказке на шаге ввода кода подтверждения. */
    email: string;
    UUID: string;
}

/**
 * Двухшаговая форма изменения пароля.
 *
 * Шаг 1: ввод старого пароля, нового пароля и его подтверждения. Новый пароль должен отличаться
 * от старого и иметь длину 6–64 символа; подтверждение должно совпадать с новым паролем.
 * Шаг 2: ввод шестизначного кода подтверждения, отправленного на e-mail пользователя, через {@link CodeInputs}.
 * Кнопка «Назад» возвращает на первый шаг без сброса введённых данных.
 */
export const PasswordChangeForm = ({
    email,
    UUID,
    ...props
}: PasswordChangeFormProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const windowWidth = useWindowWidth();
    const isDesktop = windowWidth >= 1200;

    const [isPasswordSent, setIsPasswordSent] = useState<boolean>(false);

    const {
        register,
        setValue,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitted } /*setError*/
    } = useForm<IPasswordChangeForm>({ shouldFocusError: false });

    const oldPasswordValue = useWatch({ control, name: "oldPassword" });
    const newPasswordValue = useWatch({ control, name: "newPassword" });
    const confirmNewPasswordValue = useWatch({ control, name: "confirmNewPassword" });

    const [_newPasswordResult, setNewPasswordResult] = useState<string>("");

    const codeForm = useForm<ICodeForm>({ shouldFocusError: false });

    const [codeError, setCodeError] = useState<boolean>(false);

    const changePasswordMutation = useMutation({
        mutationFn: changePassword,
        onSuccess: () =>
            changePasswordSuccessHandler(setValue, setIsPasswordSent, email, dispatch),
        onError: (error: AxiosError<AppError>) =>
            changePasswordErrorHandler(error, dispatch)
    });

    const sendCodeMutation = useMutation({
        mutationFn: sendCodePassword,
        onSuccess: (response, request) =>
            sendCodeSuccessHandler(
                response,
                request,
                setIsPasswordSent,
                reset,
                setCodeError,
                dispatch
            ),
        onError: (error: AxiosError<AppError>) => sendCodeErrorHandler(error, dispatch)
    });

    const confirmMutation = useMutation({
        mutationFn: confirmPassword,
        onSuccess: () =>
            confirmPasswordSuccessHandler(
                setIsPasswordSent,
                reset,
                setCodeError,
                dispatch
            ),
        onError: (error: AxiosError<AppError>) =>
            confirmPasswordErrorHandler(error, dispatch)
    });

    const [timer, setTimer] = useState<number>(120);
    const [isAllowSentCode, setIsAllowSentCode] = useState<boolean>(false);
    const sendButtonText = isAllowSentCode
        ? "register.sendCodeButton"
        : "register.sendCodeButtonTimer";

    useEffect(() => {
        if (isPasswordSent) {
            setTimer(120);
            setIsAllowSentCode(false);
        }
    }, [isPasswordSent]);

    useEffect(() => {
        if (!isPasswordSent) {
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
    }, [timer, isPasswordSent]);

    return (
        <>
            {!isPasswordSent ? (
                <form
                    key="password"
                    onSubmit={handleSubmit(
                        data =>
                            submitValidHandler(
                                data,
                                setNewPasswordResult,
                                newPasswordValue,
                                UUID,
                                changePasswordMutation.mutateAsync
                            ),
                        errors => submitInvalidHandler(errors, dispatch)
                    )}
                    className={c.form}
                    {...props}
                >
                    <h1 className={c.title}>{t("passwordChange.title")}</h1>
                    <div className={c.inputs}>
                        <InputForm
                            {...register("oldPassword", {
                                required: "toast.requiredPassword"
                            })}
                            value={oldPasswordValue}
                            type="password"
                            placeholder={t("passwordChange.oldPasswordPlaceholder")}
                            className={c.input}
                            isError={!!errors.oldPassword}
                            isSubmitted={isSubmitted}
                        />
                        <InputForm
                            {...register("newPassword", {
                                required: "toast.requiredPassword",
                                minLength: {
                                    value: 6,
                                    message: "errors.shortPassword"
                                },
                                maxLength: {
                                    value: 64,
                                    message: "errors.longPassword"
                                },
                                validate: {
                                    value: (newPassword, { oldPassword }) =>
                                        oldPassword !== newPassword ||
                                        "toast.samePasswords"
                                }
                            })}
                            value={newPasswordValue}
                            type="password"
                            placeholder={t("passwordChange.newPasswordPlaceholder")}
                            className={c.input}
                            isError={!!errors.newPassword}
                            isSubmitted={isSubmitted}
                        />
                        <InputForm
                            {...register("confirmNewPassword", {
                                required: "toast.requiredPassword",
                                minLength: {
                                    value: 6,
                                    message: "errors.shortPassword"
                                },
                                maxLength: {
                                    value: 64,
                                    message: "errors.longPassword"
                                },
                                validate: {
                                    value: (confirmNewPassword, { newPassword }) =>
                                        confirmNewPassword === newPassword ||
                                        "toast.notSamePasswords"
                                }
                            })}
                            value={confirmNewPasswordValue}
                            type="password"
                            placeholder={t(
                                "passwordChange.confirmNewPasswordPlaceholder"
                            )}
                            className={c.input}
                            isError={!!errors.confirmNewPassword}
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
                            email,
                            confirmMutation.mutateAsync
                        )
                    )}
                    className={c.form}
                    {...props}
                >
                    <h2 className={c.title}>{t("passwordChange.title")}</h2>
                    <StylizedButton
                        type="button"
                        onClick={() =>
                            returnToEmailHandler(setIsPasswordSent, reset, codeForm.reset)
                        }
                        aria-label={t("ariaLabel.backToChangePassword")}
                        className={c.back}
                    >
                        <ArrowLeft className={c.icon} width="15" height="15" />
                    </StylizedButton>
                    <p className={c.text}>
                        {t("passwordChange.sentCodeText", { address: email })}
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
                        aria-label={t("ariaLabel.changePassword")}
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
