import { useEffect, useState } from "react";
import type React from "react";
import classes from "./modalWindow.module.scss";
import { closeModalHandler } from "../model/closeModalHandler";
import { modalClickHandler } from "../model/modalClickHandler";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "app/store";

interface ModalWindowType {
    children: React.ReactNode;
}

const ModalWindow = ({ children, ...props }: ModalWindowType) => {
    const [modalClasses, setModalClasses] = useState(classes.modal__overlay);
    const [loaded, setLoaded] = useState(false);

    const showModal = useSelector((state: RootState) => state.modal.show);

    const dispatch = useDispatch();

    useEffect(() => {
        if (loaded)
            if (showModal) {
                setModalClasses(`${classes.modal__overlay} ${classes.show}`);
            } else {
                setModalClasses(`${classes.modal__overlay} ${classes.hide}`);
                setTimeout(() => {
                    setModalClasses(classes.modal__overlay);
                }, 300);
            }
        else {
            setLoaded(true);
        }
    }, [showModal]);

    return (
        <div className={modalClasses} onClick={e => closeModalHandler(e, dispatch)}>
            <div className={classes.modal} onClick={modalClickHandler} {...props}>
                {children}
            </div>
            <div className={classes.modal__close} onClick={e => closeModalHandler(e, dispatch)}>
                ×
            </div>
        </div>
    );
};

export { ModalWindow };
