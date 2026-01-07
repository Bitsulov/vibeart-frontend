import type React from "react";
import classes from "./chatForm.module.scss";
import { globalOnChangeHandler } from "shared/lib/globalOnChangeHandler";
import { useTranslation } from "react-i18next";

interface ChatFormProps {
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ChatForm = ({ inputValue, setInputValue, onSubmit, ...props }: ChatFormProps) => {
	const { t } = useTranslation();

    return (
        <form className={classes.chat__form} onSubmit={onSubmit} {...props}>
            <input
                className={classes.chat__formInput}
                value={inputValue}
                onChange={e => globalOnChangeHandler(e, setInputValue)}
                type="text"
                placeholder={t("messagesSendInputPlaceholder")}
            ></input>
            <input type="submit" value="" className={classes.chat__formSend}></input>
        </form>
    );
};

export { ChatForm };
