import { useState } from "react";
import classes from "./contactForm.module.scss";
import { InputForm } from "features/inputForm";
import { globalOnChangeHandler } from "shared/lib/globalOnChangeHandler";
import { contactFormSubmitHandler } from "../model/contactFormSubmitHandler";
import { AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const ContactForm = () => {
	const { t } = useTranslation();

    const [nameValue, setNameValue] = useState<string>("");
    const [emailValue, setEmailValue] = useState<string>("");
    const [textValue, setTextValue] = useState<string>("");

    const [nameErrorText, setNameErrorText] = useState<string>(t("RequiredField"));
    const [emailErrorText, setEmailErrorText] = useState<string>(t("RequiredField"));
    const [textErrorText, setTextErrorText] = useState<string>(t("RequiredField"));

    const [isNameError, setIsNameError] = useState<boolean>(false);
    const [isEmailError, setIsEmailError] = useState<boolean>(false);
    const [isTextError, setIsTextError] = useState<boolean>(false);

    return (
        <form
            onSubmit={e =>
                contactFormSubmitHandler(
                    e,
                    nameValue,
                    emailValue,
                    textValue,
                    setNameErrorText,
                    setEmailErrorText,
                    setTextErrorText,
                    setIsNameError,
                    setIsEmailError,
                    setIsTextError
                )
            }
            action=""
            className={classes.contactForm}
        >
            <div className={classes.inputWrapper}>
                <InputForm
                    id="name"
                    placeholder={t("Name")}
                    type="text"
                    value={nameValue}
                    className={
                        isNameError
                            ? `${classes.contactInputForm} ${classes.contactErrorInput}`
                            : classes.contactInputForm
                    }
                    placeholderClassName={isNameError ? `${classes.contactPlaceholderForm} ${classes.contactErrorInputPlaceholder}` : classes.contactPlaceholderForm}
                    onChange={e => globalOnChangeHandler(e, setNameValue)}
                />
                {isNameError && (
                    <>
                        <p className={classes.contactInputErrorText}>{nameErrorText}</p>
                        <AlertCircle className={classes.contactErrorInputIcon} />
                    </>
                )}
            </div>
            <div className={classes.inputWrapper}>
                <InputForm
                    id="email"
                    placeholder={t("Email")}
                    type="text"
                    value={emailValue}
                    className={
                        isEmailError
                            ? `${classes.contactInputForm} ${classes.contactErrorInput}`
                            : classes.contactInputForm
                    }
                    placeholderClassName={isEmailError ? `${classes.contactPlaceholderForm} ${classes.contactErrorInputPlaceholder}` : classes.contactPlaceholderForm}
                    onChange={e => globalOnChangeHandler(e, setEmailValue)}
                />
                {isEmailError && (
                    <>
                        <p className={classes.contactInputErrorText}>{emailErrorText}</p>
                        <AlertCircle className={classes.contactErrorInputIcon} />
                    </>
                )}
            </div>
            <div className={classes.inputWrapper}>
                <textarea
                    className={isTextError ? `${classes.formTextArea} ${classes.ErrorTextArea}` : classes.formTextArea}
                    id="text"
                    placeholder={t("Message")}
                    value={textValue}
                    onChange={e => globalOnChangeHandler(e, setTextValue)}
                ></textarea>
                {isTextError && (
                    <>
                        <p className={classes.contactInputErrorText}>{textErrorText}</p>
                        <AlertCircle className={classes.contactErrorInputIcon} />
                    </>
                )}
            </div>
            <input type="submit" value={t("Send")} className={classes.formSubmit} />
        </form>
    );
};

export { ContactForm };
