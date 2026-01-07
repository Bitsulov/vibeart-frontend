import type { RootState } from "app/store";
import { setEmailSignError, setPasswordSignError, setErrorText } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const useValidationAuth = () => {
	const { t } = useTranslation();

    const emailValueSign = useSelector((state: RootState) => state.auth.emailValueSign);
    const passwordValueSign = useSelector((state: RootState) => state.auth.passwordValueSign);

    const dispatch = useDispatch();

    const validateAuthForm = () => {
        let email = emailValueSign.trim();
        let password = passwordValueSign.trim();
        if (email === "" && password === "") {
            dispatch(setEmailSignError(true));
            dispatch(setPasswordSignError(true));
            dispatch(setErrorText(t("FillEmptyFields")));
            return false;
        } else if (email === "") {
            dispatch(setEmailSignError(true));
            dispatch(setPasswordSignError(false));
            dispatch(setErrorText(t("FillEmail")));
            return false;
        } else if (password === "") {
            dispatch(setPasswordSignError(true));
            dispatch(setEmailSignError(false));
            dispatch(setErrorText(t("FillPassword")));
            return false;
        } else if (email.indexOf("--") !== -1 || password.indexOf("--") !== -1) {
            dispatch(setErrorText(t("ErrorOccured")));
            return false;
        } else {
            dispatch(setEmailSignError(false));
            dispatch(setPasswordSignError(false));
            dispatch(setErrorText(""));
            return true;
        }
    };

    return { validateAuthForm };
};

export default useValidationAuth;
