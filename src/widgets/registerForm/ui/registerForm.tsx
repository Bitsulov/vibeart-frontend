import c from "./registerForm.module.scss";
import {Trans, useTranslation} from "react-i18next";
import {useForm, useWatch} from "react-hook-form";
import {AuthBackLink} from "features/authBackLink";
import {InputForm} from "features/inputForm";
import {InputError} from "features/inputError";
import {TransparentLink} from "features/transparentLink";
import {StylizedButton} from "features/stylizedButton";
import type {IRegisterForm} from "../lib/types";
import {submitValidHandler} from "../model/submitValidHandler";
import {submitInvalidHandler} from "../model/submitInvalidHandler";
import {Checkbox} from "features/checkbox";

/** Форма регистрации с полями email, пароля, подтверждения и согласий. */
export const RegisterForm = ({ ...props }) => {
    const { t } = useTranslation();

    const {register, setValue, handleSubmit, control, formState: {errors, isSubmitted}, /*setError*/} = useForm<IRegisterForm>({
        shouldFocusError: false,
        defaultValues: {
            agreed: false,
            agreed2: false
        }
    });

    const emailValue = useWatch({ control, name: "email" });
    const passwordValue = useWatch({ control, name: "password" });
    const confirmPasswordValue = useWatch({ control, name: "confirmPassword" });

    const showingError = errors.email || errors.password || errors.confirmPassword || errors.agreed || errors.agreed2;

    return (
        <section className={c.authWidget} {...props}>
            <div className="container">
                <form
                    onSubmit={handleSubmit(
                        (data) => submitValidHandler(data, setValue),
                        (error) => submitInvalidHandler(error)
                    )}
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
                            {...register(
                                "email",
                                {
                                    required: "errors.requiredEmail",
                                    pattern: {
                                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        message: "errors.invalidEmail"
                                    }
                                }
                            )}
                        />
                        <InputForm
                            type="password"
                            id="password"
                            isError={!!errors.password}
                            value={passwordValue}
                            isSubmitted={isSubmitted}
                            placeholder={t("register.passwordPlaceholder")}
                            className={c.input}
                            {...register(
                                "password",
                                {
                                    required: "errors.requiredPassword",
                                    minLength: {
                                        value: 6,
                                        message: "errors.shortPassword"
                                    },
                                    maxLength: {
                                        value: 64,
                                        message: "errors.longPassword"
                                    }
                                }
                            )}
                        />
                        <InputForm
                            type="password"
                            id="confirmPassword"
                            isError={!!errors.confirmPassword}
                            value={confirmPasswordValue}
                            isSubmitted={isSubmitted}
                            placeholder={t("register.confirmPasswordPlaceholder")}
                            className={c.input}
                            {...register(
                                "confirmPassword",
                                {
                                    required: "errors.requiredPassword",
                                    minLength: {
                                        value: 6,
                                        message: "errors.shortPassword"
                                    },
                                    maxLength: {
                                        value: 64,
                                        message: "errors.longPassword"
                                    },
                                    validate: value => value === passwordValue || "errors.dontMatch"
                                }
                            )}
                        />
                    </div>
                    <Checkbox
                        className={c.checkbox}
                        id="checkbox"
                        isError={!!errors.agreed}
                        describedId={errors.agreed ? "errorText" : undefined}
                        ariaLabel={t("ariaLabel.agreeAgreement")}
                        {...register(
                            "agreed",
                            {
                                required: t("errors.acceptAgreement")
                            }
                        )}
                    >
                        <Trans
                            components={{
                                agreement:
                                    <a
                                        className={c.link}
                                        aria-label={t("ariaLabel.goToUserAgreement")}
                                        rel="noopener nofollow"
                                        target="_blank"
                                        href="/agreement"
                                    />,
                            }}
                            i18nKey="register.agreeAgreement"
                        />
                    </Checkbox>
                    <Checkbox
                        className={c.checkbox}
                        id="checkbox2"
                        isError={!!errors.agreed2}
                        describedId={!errors.agreed && errors.agreed2 ? "errorText" : undefined}
                        ariaLabel={t("ariaLabel.agreePolicy")}
                        {...register(
                            "agreed2",
                            {
                                required: t("errors.acceptPolicy")
                            }
                        )}
                    >
                        <Trans
                            components={{
                                policy:
                                    <a
                                        className={c.link}
                                        aria-label={t("ariaLabel.goToPolicy")}
                                        rel="noopener nofollow"
                                        target="_blank"
                                        href="/policy"
                                    />,
                            }}
                            i18nKey="register.agreePolicy"
                        />
                    </Checkbox>
                    <InputError error_id="errorText" text={showingError?.message} className={c.error} />
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
            </div>
        </section>
    )
}
