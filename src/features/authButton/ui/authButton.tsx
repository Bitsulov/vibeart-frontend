import classes from "./authButton.module.scss";
import { authButtonHandler } from "../model/authButtonHandler";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const AuthButton = ({ ...props }) => {
	const { t } = useTranslation();

    const dispatch = useDispatch();

    return (
        <button className={classes.authButton} onClick={e => authButtonHandler(e, dispatch)} {...props}>
            {t("Enter")}
        </button>
    );
};

export { AuthButton };
