import classes from "./postCommentsForm.module.scss";
import { globalOnChangeHandler } from "shared/lib/globalOnChangeHandler";
import type React from "react";
import type { SetStateAction } from "react";
import { useTranslation } from "react-i18next";

interface PostCommentsFormType {
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    value: string;
    setValue: React.Dispatch<SetStateAction<string>>;
}

const PostCommentsForm = ({ onSubmit, value, setValue, ...props }: PostCommentsFormType) => {
	const { t } = useTranslation();

    return (
        <form className={classes.comments__form} onSubmit={onSubmit} {...props}>
            <textarea
                className={classes.comments__textarea}
                placeholder={t("CommentsInputPlaceholder")}
                value={value}
                onChange={e => globalOnChangeHandler(e, setValue)}
            ></textarea>
            <button type="submit" className={classes.comments__submit}>
                {t("Send")}
            </button>
        </form>
    );
};

export { PostCommentsForm };
