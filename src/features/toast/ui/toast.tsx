import c from "./toast.module.scss";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentToast} from "../model/selectors";
import {hideToast} from "../model/toastSlice";
import {toastIconsConfig} from "../config/toasticonsConfig";
import {showingTimeConst} from "../const/showingTimeConst";
import {defaultTransitionTime} from "shared/const/const";
import {t} from "i18next";

const transitionTime = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--transition-time"))
    || defaultTransitionTime;

/** Всплывающее уведомление, очередь сохраняется в redux. Показывается поочерёдно по одному, скрывается автоматически. */
export const Toast = () => {
    const dispatch = useDispatch();
    const currentToast = useSelector(selectCurrentToast);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!currentToast) return;

        setVisible(true);

        const hideTimer = setTimeout(() => setVisible(false), showingTimeConst);
        const removeTimer = setTimeout(() => dispatch(hideToast()), showingTimeConst + transitionTime);

        return () => {
            clearTimeout(hideTimer);
            clearTimeout(removeTimer);
        };
    }, [currentToast, dispatch]);

    if (!currentToast) return null;

    const Icon = toastIconsConfig[currentToast.type];

    return (
        <div className={`${c.toast} ${c[currentToast.type]} ${visible ? c.visible : ""}`}>
            {Icon && <Icon className={`${c.icon} ${c[currentToast.type]}`} width="30" height="30" />}
            <span className={c.text}>{t(currentToast.message)}</span>
        </div>
    );
};
