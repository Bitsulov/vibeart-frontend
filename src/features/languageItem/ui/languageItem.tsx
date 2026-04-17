import c from "./languageItem.module.scss";
import {useTranslation} from "react-i18next";
import {changeLanguageClickHandler} from "../model/changeLanguageClickHandler";
import {useDispatch} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import React from "react";

interface LanguageItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    imageUrl: string;
    title: string;
    ariaLabel: string;
    alt: string;
    value: string;
}

/**
 * Пункт выбора языка в модальном окне.
 *
 * @param ariaLabel - Ключ локализации для `aria-label` кнопки.
 * @param imageUrl - Ссылка на изображение флага языка.
 * @param title - Название языка.
 * @param alt - Ключ локализации для `alt` изображения.
 * @param value - Код языка (например, `"ru"`, `"en"`).
 */
export const LanguageItem = ({ imageUrl, title, ariaLabel, alt, value, ...props }: LanguageItemProps) => {
    const { i18n, t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

	return (
		<button
            onClick={() => changeLanguageClickHandler(value, i18n, dispatch, navigate, location)}
            aria-label={t(ariaLabel)}
            className={c.button}
            {...props}
        >
            <img decoding="async" width="20" height="20" src={imageUrl} alt={t(alt)} className={c.image} />
            <p className={c.title}>{title}</p>
		</button>
	)
}
