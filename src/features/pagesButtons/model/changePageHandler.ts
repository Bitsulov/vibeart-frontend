import React from "react";

/**
 * Устанавливает текущую страницу пагинации.
 *
 * @param setCurrentPage - Сеттер текущей страницы.
 * @param page - Номер страницы для перехода.
 */
export function changePageHandler(setCurrentPage: React.Dispatch<React.SetStateAction<number>>, page: number) {
    setCurrentPage(page);
}
