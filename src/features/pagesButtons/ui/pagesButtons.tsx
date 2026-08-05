import c from "./pagesButtons.module.scss";
import type { ComponentPropsWithoutRef, Dispatch, SetStateAction } from "react";
import clsx from "clsx";
import { changePageHandler } from "../model/changePageHandler";
import { useTranslation } from "react-i18next";
import { getRangeNumbers } from "shared/lib/getRangeNumbers";

/** Свойства компонента {@link PagesButtons}. */
interface PagesButtonsProps extends ComponentPropsWithoutRef<"div"> {
    /** Общее количество страниц. */
    pagesCount: number;
    /** Номер текущей активной страницы. */
    currentPage: number;
    /** Функция обновления текущей страницы. */
    setCurrentPage: Dispatch<SetStateAction<number>>;
    /**
     * Радиус окна отображаемых страниц вокруг текущей.
     * Например, при `pagesDelta = 2` и текущей странице 5 отображаются кнопки 3–7.
     */
    pagesDelta: number;
}

/**
 * Блок постраничной навигации.
 *
 * Ничего не рендерит при `pagesCount <= 1`. Иначе отображает кнопки
 * с номерами страниц в окне ±`pagesDelta` вокруг текущей.
 * Диапазон вычисляется через {@link getRangeNumbers} и не выходит за пределы `pagesCount`.
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

    if (pagesCount <= 1) return null;

    const { start, end } = getRangeNumbers(currentPage, pagesCount, pagesDelta);

    return (
        <div className={`${c.pages} ${className}`} {...props}>
            {Array.from({ length: end - start + 1 }, (_, i) => {
                const number = start + i;

                return (
                    <button
                        onClick={() => changePageHandler(setCurrentPage, number)}
                        aria-label={t("ariaLabel.changePage", { number })}
                        type="button"
                        key={`page ${number}`}
                        className={clsx(c.page, currentPage === number && c.active)}
                    >
                        {number}
                    </button>
                );
            })}
        </div>
    );
};
