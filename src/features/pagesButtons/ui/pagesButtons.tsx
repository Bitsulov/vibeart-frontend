import c from "./pagesButtons.module.scss";
import React from "react";
import clsx from "clsx";
import {changePageHandler} from "../model/changePageHandler";
import {useTranslation} from "react-i18next";
import {getRangeNumbers} from "shared/lib/getRangeNumbers";

interface PagesButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
    pagesCount: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    pagesDelta: number;
}

/**
 * Пагинация: кнопки с номерами страниц.
 *
 * @param className - Дополнительный CSS-класс для корневого элемента.
 * @param pagesCount - Общее количество страниц.
 * @param currentPage - Текущая активная страница.
 * @param setCurrentPage - Сеттер текущей страницы.
 * @param pagesDelta - Количество страниц слева и справа от текущей. Управляется родительским компонентом.
 * @param props - Остальные HTML-атрибуты div.
 */
export const PagesButtons = ({
    className = "",
    currentPage,
    setCurrentPage,
    pagesCount,
    pagesDelta,
    ...props
}: PagesButtonsProps) => {
    const { t } = useTranslation();

    const {start, end} = getRangeNumbers(currentPage, pagesCount, pagesDelta);

	return (
		<div className={`${c.pages} ${className}`} {...props}>
            {Array.from({length: end - start + 1}, (_, i) => {
                const number = start + i;

                return (
                    <button
                        onClick={() => changePageHandler(setCurrentPage, number)}
                        aria-label={t("ariaLabel.changePage", {number})}
                        type="button"
                        key={`page ${number}`}
                        className={clsx(c.page, currentPage === number && c.active)}
                    >
                        {number}
                    </button>
                )
            })}
		</div>
	)
}
