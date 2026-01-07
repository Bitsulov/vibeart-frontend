import { useEffect } from "react";
import { ModalWindow } from "features/modalWindow";
import {
    setEmailSignError,
    setPasswordSignError,
    setErrorText as setAuthErrorText
} from "features/authForm";
import {
    setEmailRegError,
    setPasswordRegError,
    setPasswordAgainRegError,
    setErrorText as setRegErrorText
} from "features/regForm";
import { setVisibility } from "features/modalWindow";
import { types } from "../config/authModalTypes";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "app/store";

const AuthModal = ({ ...props }) => {
    const type = useSelector((state: RootState) => state.modal.type);
    const showModal = useSelector((state: RootState) => state.modal.show);
    const ModalInner = types[type];

    const dispatch = useDispatch();

    useEffect(() => {
        if (showModal === false) {
            const timeout = setTimeout(() => {
                dispatch(setEmailSignError(false));
                dispatch(setPasswordSignError(false));
                dispatch(setEmailRegError(false));
                dispatch(setPasswordRegError(false));
                dispatch(setPasswordAgainRegError(false));
                dispatch(setAuthErrorText(""));
                dispatch(setRegErrorText(""));
                dispatch(setVisibility({ type: "sign", show: false }));
            }, 350);
            return () => clearTimeout(timeout);
        }
    }, [showModal]);

    return (
        <ModalWindow {...props}>
            <ModalInner />
        </ModalWindow>
    );
};

export { AuthModal };
