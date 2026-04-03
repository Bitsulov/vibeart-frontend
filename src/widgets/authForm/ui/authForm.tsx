import c from "./authForm.module.scss";
import {useForm, useWatch} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {AuthBackLink} from "features/authBackLink";
import {Link} from "react-router-dom";
import {StylizedButton} from "features/stylizedButton";
import {TransparentLink} from "features/transparentLink";
import {InputForm} from "features/inputForm";
import {InputError} from "features/inputError";
import {submitValidHandler} from "../model/submitValidHandler";
import {submitInvalidHandler} from "../model/submitInvalidHandler";
import type {IAuthForm} from "../lib/types";

export const AuthForm = ({ ...props }) => {
    const { t } = useTranslation();

    const {register, setValue, handleSubmit, control, formState: {errors, isSubmitted}, /*setError*/} = useForm<IAuthForm>({shouldFocusError: false});

    const emailValue = useWatch({ control, name: "email" });
    const passwordValue = useWatch({ control, name: "password" });

    const showingError = errors.email || errors.password;

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
                    <h1 className={c.title}>{t("auth.loginAccount")}</h1>
                    <div className={c.inputs}>
                        <InputForm
                            type="email"
                            id="email"
                            isError={!!errors.email}
                            value={emailValue}
                            isSubmitted={isSubmitted}
                            placeholder={t("auth.emailPlaceholder")}
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
                            placeholder={t("auth.passwordPlaceholder")}
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
                    </div>
                    <Link
                        aria-label={t("ariaLabel.rememberPassword")}
                        className={c.forgot_password}
                        to="/forgotPassword"
                    >
                        {t("auth.forgotPassword")}
                    </Link>
                    <InputError text={showingError?.message} className={c.error} />
                    <div className={c.buttons}>
                        <TransparentLink
                            ariaLabel={t("ariaLabel.goToRegister")}
                            className={c.register_button}
                            href="/register"
                        >
                            {t("Registration")}
                        </TransparentLink>
                        <StylizedButton
                            ariaLabel={t("ariaLabel.auth")}
                            className={c.auth_button}
                            type="submit"
                        >
                            {t("Enter")}
                        </StylizedButton>
                    </div>
                </form>
            </div>
		</section>
	)
}
