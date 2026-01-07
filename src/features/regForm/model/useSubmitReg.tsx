import type React from "react";
import { useSelector, useDispatch } from "react-redux";
import useValidationReg from "./useValidationReg";
import type { RootState } from "app/store";
import { setPasswordRegError, setPasswordAgainRegError, setErrorText } from "./regSlice";

const useSubmitReg = () => {
    const { validateRegForm } = useValidationReg();

    const dispatch = useDispatch();
    const emailValueReg = useSelector((state: RootState) => state.reg.emailValueReg);
    const passwordValueReg = useSelector((state: RootState) => state.reg.passwordValueReg);
    const passwordAgainValueReg = useSelector((state: RootState) => state.reg.passwordAgainValueReg);

    const submitReg = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateRegForm()) return;
        let email = emailValueReg.trim();
        let password = passwordValueReg.trim();
        let passwordAgain = passwordAgainValueReg.trim();
        if (password !== passwordAgain) {
            dispatch(setPasswordRegError(true));
            dispatch(setPasswordAgainRegError(true));
            dispatch(setErrorText("Пароли не совпадают"));
        } else {
            console.log("Форма отправлена");
        }
    };

    return { submitReg };
};

export default useSubmitReg;
