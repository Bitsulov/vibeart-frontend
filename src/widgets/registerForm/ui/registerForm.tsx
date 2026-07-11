import c from "./registerForm.module.scss";
import { Trans, useTranslation } from "react-i18next";
import { useForm, useWatch } from "react-hook-form";
import { AuthBackLink } from "features/authBackLink";
import { InputForm } from "features/inputForm";
import { InputError } from "features/inputError";
import { TransparentLink } from "features/transparentLink";
import { StylizedButton } from "features/stylizedButton";
import type { IRegisterForm } from "../lib/types";
import { submitValidHandler } from "../model/submitValidHandler";
import { submitInvalidHandler } from "../model/submitInvalidHandler";
import { Checkbox } from "features/checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register as registerApi } from "entities/user";
import { useDispatch } from "react-redux";
import type { AxiosError } from "axios";
import type { AppError } from "shared/lib/types";
import { registerSuccessHandler } from "../model/registerSuccessHandler";
import { registerErrorHandler } from "../model/registerErrorHandler";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { CodeInputs } from "features/codeInputs";
import type { ICodeForm } from "../lib/types";
import { returnToRegisterHandler } from "../model/returnToRegisterHandler";
import { codeSubmitValidHandler } from "../model/codeSubmitValidHandler";
import { verify } from "entities/user";
import { verifySuccessHandler } from "../model/verifySuccessHandler";
import { useNavigate } from "react-router-dom";
import { verifyErrorHandler } from "../model/verifyErrorHandler";
import { sendCode } from "entities/user";
import { sendCodeSuccessHandler } from "../model/sendCodeSuccessHandler";
import { sendCodeErrorHandler } from "../model/sendCodeErrorHandler";
import { sentCodeButtonHandler } from "../model/sentCodeButtonHandler";
import clsx from "clsx";

/**
 * Форма регистрации в два шага.
 *
 * <p><b>Шаг 1.</b> Адрес электронной почты, пароль, подтверждение пароля
 * и чекбоксы согласий.</p>
 *
 * <p>Отправку формы обрабатывают {@link submitValidHandler}
 * и {@link submitInvalidHandler}.</p>
 *
 * <p>Результат запроса регистрации обрабатывают
 * {@link registerSuccessHandler} и {@link registerErrorHandler}.</p>
 *
 * <p><b>Шаг 2.</b> После регистрации форма переключается на ввод
 * 6-значного кода из письма.</p>
 *
 * <p>Отправку кода на верификацию обрабатывает {@link codeSubmitValidHandler},
 * а результат верификации — {@link verifySuccessHandler} и {@link verifyErrorHandler}.</p>
 *
 * <p>Повторную отправку кода с блокировкой на 120 секунд обрабатывают
 * {@link sentCodeButtonHandler}, {@link sendCodeSuccessHandler}
 * и {@link sendCodeErrorHandler}.</p>
 *
 * <p>Форма имеет возможность вернуться к первому шагу.</p>
 */
export const RegisterForm = ({ ...props }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        register,
        reset,
        setValue,
        handleSubmit,
        control,
        formState: { errors, isSubmitted },
        setError
    } = useForm<IRegisterForm>({
        shouldFocusError: false,
        defaultValues: {
            agreed: false,
            agreed2: false
        }
    });

    const emailValue = useWatch({ control, name: "email" });
    const passwordValue = useWatch({ control, name: "password" });
    const confirmPasswordValue = useWatch({ control, name: "confirmPassword" });

    const showingError =
        errors.email ||
        errors.password ||
        errors.confirmPassword ||
        errors.agreed ||
        errors.agreed2;

    const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
    const [sentEmail, setSentEmail] = useState<string>("");

    const [codeError, setCodeError] = useState<boolean>(false);
    const codeForm = useForm<ICodeForm>({ shouldFocusError: false });

    const registerMutation = useMutation({
        mutationFn: registerApi,
        onSuccess: (response, request) =>
            registerSuccessHandler(
                response,
                request,
                dispatch,
                setIsEmailSent,
                setValue,
                setSentEmail
            ),
        onError: (error: AxiosError<AppError>) => registerErrorHandler(error, setError)
    });

    const verifyMutation = useMutation({
        mutationFn: verify,
        onSuccess: (response, request) =>
            verifySuccessHandler(response, request, dispatch, queryClient, navigate),
        onError: (error: AxiosError<AppError>) => verifyErrorHandler(error, dispatch)
    });

    useEffect(() => {
        if (!isEmailSent) {
            setSentEmail("");
        }
    }, [isEmailSent]);

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

    const sendCodeMutation = useMutation({
        mutationFn: sendCode,
        onSuccess: (response, request) =>
            sendCodeSuccessHandler(response, request, dispatch),
        onError: (error: AxiosError<AppError>) => sendCodeErrorHandler(error, dispatch)
    });

    return (
        <section className={c.authWidget} {...props}>
            <div className="container">
                {!isEmailSent ? (
                    <form
                        onSubmit={handleSubmit(
                            data =>
                                submitValidHandler(data, registerMutation.mutateAsync),
                            error => submitInvalidHandler(error)
                        )}
                        key="form 1"
                        className={c.authForm}
                    >
                        <AuthBackLink />
                        <h1 className={c.title}>{t("register.registerAccount")}</h1>
                        <div className={c.inputs}>
                            <InputForm
                                type="email"
                                id="email"
                                isError={!!errors.email}
                                value={emailValue}
                                isSubmitted={isSubmitted}
                                placeholder={t("register.emailPlaceholder")}
                                className={c.input}
                                {...register("email", {
                                    required: "errors.requiredEmail",
                                    pattern: {
                                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        message: "errors.invalidEmail"
                                    }
                                })}
                            />
                            <InputForm
                                type="password"
                                id="password"
                                isError={!!errors.password}
                                value={passwordValue}
                                isSubmitted={isSubmitted}
                                placeholder={t("register.passwordPlaceholder")}
                                className={c.input}
                                {...register("password", {
                                    required: "errors.requiredPassword",
                                    minLength: {
                                        value: 6,
                                        message: "errors.shortPassword"
                                    },
                                    maxLength: {
                                        value: 64,
                                        message: "errors.longPassword"
                                    }
                                })}
                            />
                            <InputForm
                                type="password"
                                id="confirmPassword"
                                isError={!!errors.confirmPassword}
                                value={confirmPasswordValue}
                                isSubmitted={isSubmitted}
                                placeholder={t("register.confirmPasswordPlaceholder")}
                                className={c.input}
                                {...register("confirmPassword", {
                                    required: "errors.requiredPassword",
                                    minLength: {
                                        value: 6,
                                        message: "errors.shortPassword"
                                    },
                                    maxLength: {
                                        value: 64,
                                        message: "errors.longPassword"
                                    },
                                    validate: value =>
                                        value === passwordValue || "errors.dontMatch"
                                })}
                            />
                        </div>
                        <Checkbox
                            className={c.checkbox}
                            id="checkbox"
                            isError={!!errors.agreed}
                            describedId={errors.agreed ? "errorText" : undefined}
                            ariaLabel={t("ariaLabel.agreeAgreement")}
                            {...register("agreed", {
                                required: t("errors.acceptAgreement")
                            })}
                        >
                            <Trans
                                components={{
                                    agreement: (
                                        <a
                                            className={c.link}
                                            aria-label={t("ariaLabel.goToUserAgreement")}
                                            rel="noopener nofollow"
                                            target="_blank"
                                            href="/agreement"
                                        />
                                    )
                                }}
                                i18nKey="register.agreeAgreement"
                            />
                        </Checkbox>
                        <Checkbox
                            className={c.checkbox}
                            id="checkbox2"
                            isError={!!errors.agreed2}
                            describedId={
                                !errors.agreed && errors.agreed2 ? "errorText" : undefined
                            }
                            ariaLabel={t("ariaLabel.agreePolicy")}
                            {...register("agreed2", {
                                required: t("errors.acceptPolicy")
                            })}
                        >
                            <Trans
                                components={{
                                    policy: (
                                        <a
                                            className={c.link}
                                            aria-label={t("ariaLabel.goToPolicy")}
                                            rel="noopener nofollow"
                                            target="_blank"
                                            href="/policy"
                                        />
                                    )
                                }}
                                i18nKey="register.agreePolicy"
                            />
                        </Checkbox>
                        <InputError
                            error_id="errorText"
                            text={showingError?.message}
                            className={c.error}
                        />
                        <div className={c.buttons}>
                            <TransparentLink
                                ariaLabel={t("ariaLabel.goToAuth")}
                                className={c.register_button}
                                href="/auth"
                            >
                                {t("Enter")}
                            </TransparentLink>
                            <StylizedButton
                                ariaLabel={t("ariaLabel.register")}
                                className={c.auth_button}
                                type="submit"
                            >
                                {t("Registration")}
                            </StylizedButton>
                        </div>
                    </form>
                ) : (
                    <form
                        onSubmit={codeForm.handleSubmit(data =>
                            codeSubmitValidHandler(
                                data,
                                dispatch,
                                setCodeError,
                                setIsEmailSent,
                                reset,
                                sentEmail,
                                verifyMutation.mutateAsync
                            )
                        )}
                        key="form 2"
                        className={c.codeForm}
                    >
                        <h1 className={c.title}>{t("register.codeFormTitle")}</h1>
                        <StylizedButton
                            type="button"
                            onClick={() =>
                                returnToRegisterHandler(setIsEmailSent, codeForm.reset)
                            }
                            aria-label={t("ariaLabel.backToRegister")}
                            className={c.back}
                        >
                            <ArrowLeft className={c.icon} width="15" height="15" />
                        </StylizedButton>
                        <p className={c.text}>
                            {t("register.sentCodeText", { address: sentEmail })}
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
                                    sentEmail,
                                    sendCodeMutation.mutateAsync
                                )
                            }
                            className={clsx(c.send_code, !isAllowSentCode && c.disabled)}
                        >
                            {t(sendButtonText, { timer: timer })}
                        </button>
                        <StylizedButton
                            aria-label={t("ariaLabel.confirmRegister")}
                            type="submit"
                            className={c.submit_code}
                        >
                            {t("Send")}
                        </StylizedButton>
                    </form>
                )}
            </div>
        </section>
    );
};
