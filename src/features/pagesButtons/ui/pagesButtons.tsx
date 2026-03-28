import c from "./pagesButtons.module.scss";
import React, {useEffect} from "react";
import clsx from "clsx";
import {changePageHandler} from "../model/changePageHandler";
import {useTranslation} from "react-i18next";
import {getRangeNumbers} from "shared/lib/getRangeNumbers";
import {useWindowWidth} from "shared/hooks/useWindowWidth";

interface PagesButtonsProps {
    pagesCount: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    pagesDelta: number;
    setPagesDelta: React.Dispatch<React.SetStateAction<number>>;
}

export const PagesButtons = ({ currentPage, setCurrentPage, pagesCount, pagesDelta, setPagesDelta, ...props }: PagesButtonsProps) => {
    const { t } = useTranslation();

    const {start, end} = getRangeNumbers(currentPage, pagesCount, pagesDelta);
    const windowWidth = useWindowWidth();

    useEffect(() => {
        if(windowWidth >= 1620) {
            setPagesDelta(4);
        } else if(windowWidth >= 1500) {
            setPagesDelta(3);
        } else if(windowWidth >= 1350) {
            setPagesDelta(4);
        } else if(windowWidth >= 1200) {
            setPagesDelta(3);
        } else if(windowWidth >= 520) {
            setPagesDelta(4);
        } else if(windowWidth >= 450) {
            setPagesDelta(3);
        } else {
            setPagesDelta(2);
        }
    }, [windowWidth]);

	return (
		<div className={c.pages} {...props}>
            {Array.from({length: end - start + 1}, (_, i) => {
                const number = start + i;

                return (
                    <button
                        onClick={() => changePageHandler(setCurrentPage, number)}
                        aria-label={t("ariaLabel.changePage", {number})}
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
