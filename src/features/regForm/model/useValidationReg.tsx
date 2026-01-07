import type { RootState } from "app/store";
import { setEmailRegError, setPasswordRegError, setPasswordAgainRegError, setErrorText } from "./regSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const useValidationReg = () => {
	const { t } = useTranslation();

    const emailValueReg = useSelector((state: RootState) => state.reg.emailValueReg);
    const passwordValueReg = useSelector((state: RootState) => state.reg.passwordValueReg);
    const passwordAgainValueReg = useSelector((state: RootState) => state.reg.passwordAgainValueReg);

    const dispatch = useDispatch();

    const validateRegForm = () => {
        let email = emailValueReg.trim();
        let password = passwordValueReg.trim();
        let passwordAgain = passwordAgainValueReg.trim();
        let str = [];
        let isEmpty = false;
        if (email === "" && password === "" && passwordAgain === "") {
            dispatch(setEmailRegError(true));
            dispatch(setPasswordRegError(true));
            dispatch(setPasswordAgainRegError(true));
            dispatch(setErrorText(t("FillEmptyFields")));
            return false;
        }
        if (email === "") {
            dispatch(setEmailRegError(true));
            str.push(t("email"));
            isEmpty = true;
        } else {
            dispatch(setEmailRegError(false));
        }
        if (password === "") {
            dispatch(setPasswordRegError(true));
            str.push(t("password"));
            isEmpty = true;
        } else {
            dispatch(setPasswordRegError(false));
        }
        if (passwordAgain === "") {
            dispatch(setPasswordAgainRegError(true));
            str.push(t("passwordAgain"));
            isEmpty = true;
        } else {
            dispatch(setPasswordAgainRegError(false));
        }
        if (isEmpty) {
            dispatch(setErrorText(`${t("Fill")} ${str.join(` ${t("and")} `)}`));
            return false;
        } else if (email.indexOf("--") !== -1 || password.indexOf("--") !== -1 || passwordAgain.indexOf("--") !== -1) {
            dispatch(setErrorText(t("ErrorOccured")));
            return false;
        } else {
            dispatch(setEmailRegError(false));
            dispatch(setPasswordRegError(false));
            dispatch(setPasswordAgainRegError(false));
            dispatch(setErrorText(""));
            return true;
        }
    };

    return { validateRegForm };
};

export default useValidationReg;
