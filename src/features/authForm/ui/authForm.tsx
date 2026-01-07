import React from "react";
import classes from "./authForm.module.scss";
import { useSelector, useDispatch } from "react-redux";
import useSubmitSign from "../model/useSubmitSign";
import { emailChangeHandler } from "../model/emailChangeHandler";
import { passwordChangeHandler } from "../model/passwordChangeHandler";
import { InputForm } from "../../inputForm";
import type { RootState } from "app/store";
import { useTranslation } from "react-i18next";

const AuthForm = () => {
	const { t } = useTranslation();

    const emailValueSign = useSelector((state: RootState) => state.auth.emailValueSign);
    const passwordValueSign = useSelector((state: RootState) => state.auth.passwordValueSign);
    const emailSignError = useSelector((state: RootState) => state.auth.emailSignError);
    const passwordSignError = useSelector((state: RootState) => state.auth.passwordSignError);
    const errorText = useSelector((state: RootState) => state.auth.errorText);

    const dispatch = useDispatch();

    const { submitSign } = useSubmitSign();

    return (
        <section className={classes.authentication}>
            <h2 className={classes.authentication__title}>{t("Enter")}</h2>
            <form className={classes.authentication__form} onSubmit={submitSign}>
                <InputForm
                    id="emailAuthentication"
                    type="email"
                    placeholder={t("Email")}
                    placeholderClassName={emailSignError ? classes.errorPlaceholder : ""}
                    value={emailValueSign}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => emailChangeHandler(e, dispatch)}
                    className={emailSignError ? classes.errorInput : ""}
                />
                <InputForm
                    id="passwordAuthentication"
                    type="password"
                    placeholder={t("Password")}
                    placeholderClassName={passwordSignError ? classes.errorPlaceholder : ""}
                    minLength={6}
                    value={passwordValueSign}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => passwordChangeHandler(e, dispatch)}
                    className={passwordSignError ? classes.errorInputLeft : ""}
                />
                <p
                    className={
                        errorText ? `${classes.authentication__error} ${classes.show}` : classes.authentication__error
                    }
                >
                    {errorText}
                </p>
                <button className={classes.authentication__submit} type="submit">
                    {t("Send")}
                </button>
            </form>
        </section>
    );
};

export { AuthForm };
